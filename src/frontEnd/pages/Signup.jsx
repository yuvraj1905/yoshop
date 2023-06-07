import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../styles/loginPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();
  const {
    state: { from },
  } = useLocation();
  const { signupBtnHandler } = useAuthContext();

  const signupHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      signupBtnHandler(name, email, password);
      navigate(from);
      toast.success(`SignUp successful! Login to Continue!`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Passwords dont match", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="loginPage">
        <form action="" className="loginForm" onSubmit={signupHandler}>
          <section className="enterDetail">
            <label htmlFor="Name">
              <h3>Enter Name</h3>
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </section>
          <section className="enterDetail">
            <label htmlFor="email">
              <h3>Enter Email</h3>
            </label>
            <input
              type="email"
              required
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>

          <section className="enterDetail">
            <label htmlFor="password">
              <h3>Enter Password</h3>
            </label>
            <input
              type={passVisible ? "text" : "password"}
              autoComplete="off"
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="seePass seePassSignup"
              onClick={() => setPassVisible(!passVisible)}
            >
              {passVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>

            <label htmlFor="confirmPassword">
              <h3>Confirm Password</h3>
            </label>
            <input
              type={passVisible ? "text" : "password"}
              autoComplete="off"
              required
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </section>

          <button type="submit" className="loginBtn loginSignUpButtons">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
