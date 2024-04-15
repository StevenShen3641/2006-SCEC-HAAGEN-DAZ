import React, { useState, useEffect } from "react";
import Popup from "./Popup"; // Import the Popup component if it's defined in a separate file
import { db } from "../../data/fireBase/FireBase";
import styles from "../../assets/Popup.module.css";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

const PopupComponent = ({ topNavState, buttonPopup, setButtonPopup }) => {
  const fb = doc(db, "feedback", "feedback");
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sentError, setSentError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClick = async () => {
    setSent(false);
    setSentError(false);
    setEmpty(false);
    if (!inputValue || !email) {
      setEmpty(true);
    } else {
      try {
        await updateDoc(fb, {
          fb: arrayUnion({ [email]: inputValue }),
        });
        setSent(true);
        setInputValue("");
        setEmail("");
      } catch (e) {
        setSentError(true);
        console.log(e);
      }
    }
  };
  return (
    <>
      {buttonPopup === 1 && (
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h2>Need Help?</h2>
          <h3>Leave Feedback Here!</h3>
          <input
            className={styles.emailBox}
            value={email}
            onClick={() => {
              setSent(false);
              setSentError(false);
              setEmpty(false);
            }}
            onChange={handleEmailChange}
            placeholder="Email@address.com"
          ></input>
          <textarea
            className={styles.input}
            value={inputValue}
            onClick={() => {
              setSent(false);
              setSentError(false);
              setEmpty(false);
            }}
            onChange={handleInputChange}
            placeholder="Enter your feedback"
            rows={4}
            cols={50}
            required
          />
          {}
          {empty && (
            <div style={{ color: "red" }}>
              Please enter your email and feedback!
            </div>
          )}
          {sent && <div style={{ color: "red" }}>Feedback sent!</div>}
          {sentError && (
            <div style={{ color: "red" }}>Error sending the message!</div>
          )}
          {!empty && !sent && !sentError && (
            <div style={{ userSelect: "none" }}>&nbsp;</div>
          )}
          <button
            className={styles.button}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              width: "150px",
            }}
            onClick={handleClick}
          >
            Send Feedback
          </button>
        </Popup>
      )}
      {buttonPopup === 2 && (
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h2>Have Trouble?</h2>
          <h3>Contact us through GitHub:</h3>
          <h3>
            @randallctc<br></br>
            @GeneralR3d<br></br> @potatopotati<br></br> @StevenShen3641<br></br>{" "}
            @nk714-sd
          </h3>
        </Popup>
      )}
    </>
  );
};

export default PopupComponent;
