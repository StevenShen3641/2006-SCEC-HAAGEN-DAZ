import React from "react";
import styles from "../../assets/Popup.module.css";
function Popup(props) {
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={props.trigger === 1 ? styles.popupInner1 : styles.popupInner2}>
        <button className={styles.button} style={{marginLeft: "auto", marginRight: "5px"}} onClick={() => props.setTrigger(false)}>
          Exit
        </button>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
