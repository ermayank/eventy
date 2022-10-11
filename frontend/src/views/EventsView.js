import React, { useEffect, useState } from "react";
import axios from "axios";

const EventsView = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:1337/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const formatDate = (dateTime) => {
    return new Date(dateTime);
  };

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
        <div className="flex flex-wrap -m-4">
          {events &&
            events.map((event) => {
              return (
                <div className="xl:w-1/4 md:w-1/2 p-4" key={event._id}>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={event.banner_image}
                      alt="content"
                    />
                    <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">
                      {event.event_type}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {event.title}
                    </h2>
                    <div className="border-1 flex justify-between">
                      <span className="inline-flex items-center text-white bg-red-500 border-0 py-1 px-4 focus:outline-none rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                        {Date(event.dateTime)}
                      </span>
                    </div>
                    <p className="bg-gray-300 inline-flex my-3 py-3 px-5 rounded-lg w-full items-center hover:bg-gray-400 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>

                      <span className="ml-4 flex items-start flex-col leading-none">
                        <span className="text-xs text-gray-600 mb-1">
                          Location
                        </span>
                        <span className="title-font font-medium">
                          {event.venue}
                        </span>
                      </span>
                    </p>
                    <p className="leading-relaxed text-base">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default EventsView;
