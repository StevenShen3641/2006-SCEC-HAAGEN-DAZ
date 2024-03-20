import logo from './images/logo.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <img align="left" className="logo" src={logo} alt="logo" />
        </div>
        <div className="menu-container">
          <button onClick="" className="menu">Home</button>
          <button onClick="" className="menu">English</button>
          <button onClick="" className="menu">Help</button>
          <button onClick="" className="menu">Contact Us</button>
        </div>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>

      <body>
        {/* <img className="App-header" src={logo} alt="logo" /> */}
        {/* <p>Sportify</p> */}
      </body>

    </div>
  );
}

export default App;
