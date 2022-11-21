import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SurveyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [bannerImage, setBannerImage] = useState(
    "https://dummyimage.com/400x400"
  );

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/events/${id}`
        );
        const newData = await response.json();
        setEvent(newData);
        const datenew = newData.datetime;
        const formattedDate = new Date(datenew).toLocaleString();
        setEventDate(formattedDate);
        const banner =
          process.env.REACT_APP_SERVER_URL + newData.banner_image.url;
        setBannerImage(banner);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const processSurveyData = (n) => {
    if (isNaN(parseInt(n.slice(-1)))) {
      return 0;
    } else {
      return parseInt(n.slice(-1));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let surveyData = [
      processSurveyData(e.target.q_1.value),
      processSurveyData(e.target.q_2.value),
      processSurveyData(e.target.q_3.value),
      processSurveyData(e.target.q_4.value),
      processSurveyData(e.target.q_5.value),
      processSurveyData(e.target.q_6.value),
      processSurveyData(e.target.q_7.value),
      processSurveyData(e.target.q_8.value),
    ];

    pushData(surveyData);
  };
  const pushData = (surveyData) => {
    //Make Data
    let oldData = event.survey;
    if (oldData == null) {
      oldData = [[], [], [], [], [], [], [], []];
      let count = 0;
      oldData.forEach((e) => {
        e.push(surveyData[count]);
        count++;
      });
    } else {
      let count = 0;
      oldData.forEach((e) => {
        e.push(surveyData[count]);
        count++;
      });
    }

    const data = JSON.stringify({
      survey: oldData,
    });
    //Request Config
    var config = {
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}/events/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    //Send Request
    axios(config)
      .then(function (response) {
        setErrorMessage("");
        navigate("/events");
      })
      .catch(function (error) {
        setErrorMessage(
          "There was an error submitting the form, please try again later"
        );
      });
  };

  return (
    <>
      {/* Event Details */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 pt-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              You are filling the survey for {event.title} held on
              <br className="hidden lg:inline-block" /> {eventDate}
            </h2>
            <p className="mb-8 leading-relaxed">{event.description}</p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={bannerImage}
            />
          </div>
        </div>
      </section>

      {/* Survey Form */}
      <section className="text-gray-600 body-font">
        <form name="surveyForm" onSubmit={submitHandler}>
          {/* Q1 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                1
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    How satisfied were you with the event?
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    1 being the least and 10 being the most
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_1_1"
                        name="q_1"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        1
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_1_2"
                        name="q_1"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        2
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_1_3"
                        name="q_1"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        3
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_1_4"
                        name="q_1"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        4
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_1_5"
                        name="q_1"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        5
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q2 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                2
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    How well the the event meet your expectations?
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    1 being the least and 10 being the most
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_2_1"
                        name="q_2"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        1
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_2_2"
                        name="q_2"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        2
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_2_3"
                        name="q_2"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        3
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_2_4"
                        name="q_2"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        4
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_2_5"
                        name="q_2"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        5
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q3 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                3
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    How Was this event interactive ?
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    1 being the least and 10 being the most
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_3_1"
                        name="q_3"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        1
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_3_2"
                        name="q_3"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        2
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_3_3"
                        name="q_3"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        3
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_3_4"
                        name="q_3"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        4
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_3_5"
                        name="q_3"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        5
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q4 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                4
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    How likely you would recommend this event in the future to
                    someone?
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    1 being the least and 10 being the most
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_4_1"
                        name="q_4"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        1
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_4_2"
                        name="q_4"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        2
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_4_3"
                        name="q_4"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        3
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_4_4"
                        name="q_4"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        4
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_4_5"
                        name="q_4"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        5
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q5 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                5
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    What was your overall experience of the event
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    1 being the bad and 10 being the lovely
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_5_1"
                        name="q_5"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        1
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_5_2"
                        name="q_5"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        2
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_5_3"
                        name="q_5"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        3
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_5_4"
                        name="q_5"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        4
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_5_5"
                        name="q_5"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        5
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q6 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                6
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    How helpful was the staff at the event?
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    1 being the not at all helpfull and 10 being the lovely
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_6_1"
                        name="q_6"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        1
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_6_2"
                        name="q_6"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        2
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_6_3"
                        name="q_6"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        3
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_6_4"
                        name="q_6"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        4
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_6_5"
                        name="q_6"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        5
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q7 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                7
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    Where did you hear about this events
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    Select the most appropriate source
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_7_1"
                        name="q_7"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        Social media
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_7_2"
                        name="q_7"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        Word of mouth
                      </label>
                    </div>
                    {/* r3 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_7_3"
                        name="q_7"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        Newsletter
                      </label>
                    </div>
                    {/* r4 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_7_4"
                        name="q_7"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        Advertisement
                      </label>
                    </div>
                    {/* r5 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_7_5"
                        name="q_7"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Q8 */}
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>

              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">
                8
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                    Would you like to attend similar event again ?
                  </h2>
                  <label className="leading-7 text-sm text-gray-600">
                    Select the most appropriate answer
                  </label>
                  <div className="leading-relaxed relative flex justify-around w-full ">
                    {/* r1 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_8_1"
                        name="q_8"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        Yes
                      </label>
                    </div>
                    {/* r2 */}
                    <div className="flex justify-center items-center ">
                      <input
                        type="radio"
                        value="q_8_2"
                        name="q_8"
                        className="w-4 h-4"
                      />
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SurveyForm;
