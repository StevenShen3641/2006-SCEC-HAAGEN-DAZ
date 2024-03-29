import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import API from "./pages/Home/API";
import SearchResults from "./pages/SearchResults/SearchResults";

function App() {

  return (
    <div className="App">
      {/*set up routing to navigate between the different pages*/}
      <Router>
        <Routes>
          {/* for home page */}
          <Route path="/" element={<Home />} />
          {/* for results page */}
          <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;