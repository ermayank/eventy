import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaypalButton from "../components/PaypalButton";
import Modal from "../components/Modal";
const EventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [buttonText, setButtonText] = useState("Register");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState(
    "https://dummyimage.com/400x400"
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/events/${id}`
      );
      const newData = await response.json();
      setEvent((current) => newData);

      const datenew = newData.datetime;
      const formattedDate = new Date(datenew).toLocaleDateString();
      const formattedTime = new Date(datenew).toLocaleTimeString();
      setEventDate(formattedDate);
      setEventTime(formattedTime);

      const banner =
        process.env.REACT_APP_SERVER_URL + newData.banner_image.url;
      setBannerImage(banner);
    };

    fetchData();
    getUserData();
  }, []);

  const surveyButtonCriteria = () => {
    let nowDate = new Date();
    nowDate = nowDate.toISOString();

    if (localStorage.getItem("authenticated") && event.datetime < nowDate) {
      return true;
    } else return false;
  };

  const fillSurveyHandler = () => {
    const eventId = id;
    navigate(`/survey/${eventId}`);
  };

  const getUserData = async () => {
    const jwtToken = localStorage.getItem("jwt");
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    axios(config)
      .then(function (response) {
        setUser(JSON.stringify(response.data));
      })
      .catch(function (error) {
        return error;
      });
  };

  const registerHandler = async () => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
    } else {
      const userDetails = JSON.parse(user);
      const currentUser = {
        confirmed: userDetails.confirmed,
        blocked: userDetails.blocked,
        _id: userDetails._id,
        email: userDetails.email,
        username: userDetails.username,
        name: "testing vala",
        provider: "local",
        createdAt: userDetails.createdAt,
        updatedAt: userDetails.updatedAt,
        __v: userDetails.__v,
        role: userDetails.role._id,
        id: userDetails.id,
      };
      const participants = event.participants;
      const newParticipants = [...participants, currentUser];
      //Send Request to Register User
      var data = JSON.stringify({
        participants: newParticipants,
      });
      var config = {
        method: "put",
        url: `${process.env.REACT_APP_SERVER_URL}/events/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          setButtonText("Already Registered");
          alert("You are Registered for the event");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const getRegisterDetails = async () => {
    const userData = await JSON.parse(user);
    event.participants.forEach((par) => {
      if (par.email == userData.email) {
        return "User is Already Registered";
      } else {
        return "OK";
      }
    });
  };
  const product = {
    description: event.title,
    price: event.cost,
    eventid: id,
  };
  const getDataFromPaypal = (data) => {
    console.log(data);
  };
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {event.event_type}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {event.title}
              </h1>
              {surveyButtonCriteria() ? (
                <button
                  onClick={fillSurveyHandler}
                  className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                >
                  Fill Survey
                </button>
              ) : (
                <p></p>
              )}

              <div className="flex mb-4">
                <a className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <p className="leading-relaxed mb-4">{event.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Venue</span>
                <span className="ml-auto text-gray-900">{event.venue}</span>
              </div>

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Date</span>
                <span className="ml-auto text-gray-900">{eventDate}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Time</span>
                <span className="ml-auto text-gray-900">{eventTime}</span>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  By - {event.event_host}
                </span>

                {buttonText == "Already Registered" ? (
                  <button className="flex ml-auto disabled text-white bg-gray-500 border-0 py-2 px-6  rounded">
                    {buttonText}
                  </button>
                ) : (
                  <button
                    onClick={registerHandler}
                    className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </div>

            <img
              alt="event "
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={bannerImage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default EventView;
