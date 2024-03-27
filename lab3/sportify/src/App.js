import API from "./API";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      {/*set up routing to navigate between the different pages*/}
      <Router>
        <Routes>
          {/* for home page */}
          <Route path="/" element={<Home />} />
          {/* for contact us page */}
          <Route path="/API" element={<API />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;