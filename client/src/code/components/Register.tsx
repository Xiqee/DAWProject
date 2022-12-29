import axios from "axios";
import {useRef} from "react";
import "./register.css";
import {useNavigate} from "react-router-dom";
import React from "react";

const username = useRef<HTMLInputElement>();
const email = useRef<HTMLInputElement>();
const password = useRef<HTMLInputElement>();
const passwordAgain = useRef<HTMLInputElement>();
const navigate = useNavigate();

const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        try {
            await axios.post("/user", user);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }
};

const Register = () => (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Lamasocial</h3>
                <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input
                        placeholder="Username"
                        required
                        ref={username}
                        className="loginInput"
                    />
                    <input
                        placeholder="Email"
                        required
                        ref={email}
                        className="loginInput"
                        type="email"
                    />
                    <input
                        placeholder="Password"
                        required
                        ref={password}
                        className="loginInput"
                        type="password"
                    />
                    <input
                        placeholder="Password Again"
                        required
                        ref={passwordAgain}
                        className="loginInput"
                        type="password"
                    />
                    <button className="loginButton" type="submit">
                        Sign Up
                    </button>
                    <button className="loginRegisterButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
);


export default Register;