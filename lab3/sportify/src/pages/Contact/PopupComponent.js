import React from 'react';
import Popup from './Popup'; // Import the Popup component if it's defined in a separate file

const PopupComponent = ({ buttonPopup, setButtonPopup }) => {
  return (
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <h1>Having Trouble?</h1>
      <h2>Contact us through GitHub:</h2>
      <h3>@randallctc<br></br>         
        @GeneralR3d
        @potatopotati
        @StevenShen3641
        @nk714-sd
      </h3>
    </Popup>
  );
};

export default PopupComponent;