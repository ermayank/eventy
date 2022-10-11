import React from "react";
import { Link } from "react-router-dom";
/* eslint-disable */
const Header = () => {
  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <span className="ml-3 text-xl">
              <Link to="/">Concordia Events</Link>
            </span>
          </span>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-white" to="/events">
              All Events
            </Link>
            <Link className="mr-5 hover:text-white" to="/events">
              Upcoming Events
            </Link>
            <Link className="mr-5 hover:text-white" to="/contact">
              Contact Us
            </Link>
          </nav>
          <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            Login/Register
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
