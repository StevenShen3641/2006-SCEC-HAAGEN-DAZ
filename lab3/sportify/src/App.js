import logo from "./images/logo.png";
import "./App.css";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import SearchIcon from './search.svg'
import FilterIcon from './filter-.svg'

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

const google = window.google

// set map style
const mapContainerStyle = {
  width: "50vw",
  height: "300px",
};

// set map center
const center = {
  lat: 1.348610224209925,
  lng: 103.68319907301334,
};

// let map;

// async function initMap() {
//   const position = { lat: -25.344, lng: 131.031 };
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Uluru
//   map = new Map(document.getElementById("map"), {
//     zoom: 4,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//   });

//   // marker, positioned at Uluru
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
// }

// initMap();

function App() {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  } else if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  let address;
  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <img align="left" className="logo" src={logo} alt="logo" />
        </div>
        <div className="menu-container">
          <button onClick="" className="menu">
            Home
          </button>
          <button onClick="" className="menu">
            Help
          </button>
        </div>
        <div className = 'search'>
                <input value = {address} placeholder = "Search for address"></input>
                <img src ={FilterIcon} alt = "filter"></img>
                <img src={SearchIcon} alt="search"></img>
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
        <div className="map">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
          >
            <MarkerF position={center} label={'Nanyang Technological University'}/>
          </GoogleMap>
        </div>
      </body>
    </div>
  );
}

export default App;