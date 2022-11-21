import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  // Password toggle handler
  const togglePassword = () => setPasswordShown(!passwordShown);

  const submitHandler = (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      identifier: email,
      password: password,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/auth/local`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setErrorMessage("");
        setEmail("");
        setPassword("");
        localStorage.setItem("authenticated", true);
        localStorage.setItem("jwt", response.data.jwt);
        if (response.data.user.email == "admin@example.com") {
          localStorage.setItem("isAdmin", true);
        } else {
          localStorage.setItem("isAdmin", false);
        }
        navigate("/events");
      })
      .catch(function (error) {
        setErrorMessage("Invalid Login Details");
      });
  };

  return (
    <>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12"></div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Enter into Eventy</p>

            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={submitHandler}
            >
              <p className="text-red-500">{errorMessage}</p>

              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <div className="relative w-full">
                  <div className="inset-y-0 right-0 flex items-center px-2">
                    <input
                      id="password"
                      placeholder="Password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                      type={passwordShown ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                      htmlFor="toggle"
                      onClick={togglePassword}
                    >
                      show
                    </label>
                  </div>
                </div>
              </div>

              <input
                type="submit"
                value="Login"
                className="bg-red-700 text-white font-bold text-lg hover:bg-red-600 p-2 mt-8"
              />
            </form>
            <div className="text-center   pt-12 pb-12">
              <p>
                Do not have an account?{" "}
                <Link to="/register">
                  <span className="underline font-semibold text-red-700">
                    Register here.
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="Background"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
