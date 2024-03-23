import React from "react";
import "./Popup.css";
function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Exit
        </button>
        <div className="content">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default Popup;
