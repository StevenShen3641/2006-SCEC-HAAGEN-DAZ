import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import API from "./pages/Home/API";
import SearchResults from "./pages/SearchResults/SearchResults";
import SportsLocation from "./pages/Location/SportsLocation";
import React, { useState, useEffect } from "react";
import CSVDataContextProvider from './context/CSVDataContext';

function App() {
  //for popup
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="App">
      {/*set up routing to navigate between the different pages*/}
      <Router>
        <Routes>
          {/* for home page */}
          <Route path="/" element={<Home buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />} />
          {/* for results page */}
          <Route path="/SearchResults" element={<SearchResults buttonPopup={buttonPopup} setButtonPopup={setButtonPopup}/>} />
          {/* for each location*/}
          <Route path="/SportsLocation/:id" element={<SportsLocation/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;