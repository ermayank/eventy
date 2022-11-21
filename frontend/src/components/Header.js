import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
/* eslint-disable */
const Header = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      setButtonText("Sign In");
    } else {
      setButtonText("Logout");
    }
  }, [localStorage.getItem("authenticated")]);

  const logoutHandler = (e) => {
    if (localStorage.getItem("authenticated")) {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("jwt");
      localStorage.removeItem("isAdmin");
      setButtonText("Sign In");
    } else {
      navigate("/login");
    }
  };

  const isAdmin = () => {
    if (
      localStorage.getItem("isAdmin") == "true" &&
      localStorage.getItem("authenticated") == "true"
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <span className="ml-3 text-xl">
              <Link to="/">Eventy</Link>
            </span>
          </span>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-white" to="/events">
              All Events
            </Link>
            {isAdmin() ? (
              <Link className="mr-5 hover:text-white" to="/eventssurvey">
                Survey Details
              </Link>
            ) : (
              <span></span>
            )}

            <Link className="mr-5 hover:text-white" to="/contact">
              Contact Us
            </Link>
          </nav>
          <span
            className="inline-flex items-center cursor-pointer bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            onClick={logoutHandler}
          >
            {buttonText}
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
