import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../styles/loginPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  const { loginBtnHandler } = useAuthContext();
  const location = useLocation();

  const loginHandler = async (e) => {
    e.preventDefault();
    const ifFailedLogin = await loginBtnHandler(email, password);
    if (ifFailedLogin === "wrong credentials") {
      toast.error("Incorrect login credentials", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      if (location?.state?.from) {
        const {
          state: { from },
        } = location;
        navigate(from);
      } else navigate("/profile/myprofile");
      toast.success("Login Successful ! Hola !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const guestLogin = async () => {
    setEmail("yuvraj1905@gmail.com");
    setPassword("yuvraj1905");
    const ifFailedLogin = await loginBtnHandler(
      "yuvraj1905@gmail.com",
      "yuvraj1905"
    );
    if (ifFailedLogin) console.log(ifFailedLogin);
    else {
      if (location?.state?.from) {
        const {
          state: { from },
        } = location;
        navigate(from);
      } else navigate("/profile/myprofile");
    }
  };

  useEffect(() => {
    if (location?.state?.from) {
      toast.info("Please login to continue!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  return (
    <>
      <div className="loginPage">
        <form action="" className="loginForm" onSubmit={loginHandler}>
          <section className="enterDetail">
            <label htmlFor="email">
              <h3>Enter Email</h3>
            </label>
            <input
              type="email"
              autoComplete="off"
              id="email"
              required
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
              className="seePass "
              onClick={() => setPassVisible(!passVisible)}
            >
              {passVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </section>

          <button className="loginBtn loginSignUpButtons" type="submit">
            Login
          </button>
          <button onClick={guestLogin} className="signupBtn loginSignUpButtons">
            Login as Guest
          </button>
          <p>
            New to YoShop?{" "}
            <span
              onClick={() =>
                navigate("/signup", { state: { from: location.pathname } })
              }
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: 700,
                padding: "0 2px",
              }}
            >
              SignUp
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
