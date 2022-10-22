import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventsView = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/events`).then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Get to know Events Near you
            </h1>
            <div className="h-1 w-20 bg-red-500 rounded"></div>
          </div>
        </div>
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap -m-4">
            {events &&
              events.map((event) => {
                return (
                  <div className="p-4 lg:w-1/3" key={event._id}>
                    <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {event.event_type}
                      </h2>
                      <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                        {event.title}
                      </h1>
                      <p className="leading-relaxed mb-3">
                        Venue - {event.venue}
                      </p>
                      <p className="leading-relaxed mb-3">
                        Date Time - {event.datetime}
                      </p>
                      <Link to={`/events/${event._id}`}>
                        <span className="text-red-500 inline-flex items-center">
                          Know More
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </Link>
                      <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                        <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          {event.event_host}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsView;
