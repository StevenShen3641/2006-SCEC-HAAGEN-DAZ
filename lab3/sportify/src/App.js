import Contact from "./Contact";
import Home from "./Home";
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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;