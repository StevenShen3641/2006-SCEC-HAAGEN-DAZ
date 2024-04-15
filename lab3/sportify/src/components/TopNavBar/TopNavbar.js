import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import PopupComponent from "../Popup/PopupComponent";
const TopNavBar = ({buttonPopup, setButtonPopup})=> {
    return(
        <>
        <div className="logo-container">
          <img align="left" className="logo" src={logo} alt="logo" />
        </div>
        <div className="menu-container">
          {/* Home will lead us to homepage */}
          <Link to="/" className="menu">
            {" "}
            Home{" "}
          </Link>
          <button className="help" onClick={() => setButtonPopup(1)}>
            Help
          </button>
          <button className="contact-us" onClick={() => setButtonPopup(2)}>
            Contact Us
          </button>
          <PopupComponent
            buttonPopup={buttonPopup}
            setButtonPopup={setButtonPopup}
          />
        </div>
        </>
    );
}
export default TopNavBar;