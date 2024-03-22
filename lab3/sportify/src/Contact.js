import logo from "./images/logo.png";
import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
    return (
        <div className="App">
            <header>
                <div className="logo-container">
                    <img align="left" className="logo" src={logo} alt="logo" />
                </div>
                <div className="menu-container">
                    <Link to="/" className="menu"> Home </Link>
                    <Link to="/Contact" className="menu"> Contact Us </Link>
                </div>
            </header>
            <body>
                <h1>Contact us</h1>
                hello
            </body>
        </div>
    );
}

export default Contact;