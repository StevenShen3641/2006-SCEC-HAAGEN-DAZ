import axios from 'axios'; //for making HTTP request in JS
import React, { useState, useEffect } from "react";
import TopNavBar from "../../components/TopNavBar/TopNavbar";

// Base URL for the API
const RAIN_URL = 'https://api.data.gov.sg/v1';
const WEATHER_URL = 'https://api.data.gov.sg/v1';

// Endpoint path
const RAIN_ENDPOINT = '/environment/rainfall';
const WEATHER_ENDPOINT = '/environment/2-hour-weather-forecast';

//asynchronous function for fetch API data
async function fetchAPIReadings(url, endpoint, dateTime, date) {
  //exception handling
  try {
    // pause function until completion/failure in fetching data
    // ${url}${endpoint}: construct the URL 
    const response = await axios.get(`${url}${endpoint}`, {
      //parameters
      params: {
        date_time: dateTime,
        date: date,
      }
    })
    return response.data;
  } catch (error) {
    console.error('Error fetching API readings from ${endpoint}: ', error);
    throw error;
  }
}

// Fetch rainfall readings
async function fetchRainfallReadings(dateTime, date) {
  return await fetchAPIReadings(RAIN_URL, RAIN_ENDPOINT, dateTime, date);
}

// Fetch 2 hour weather forecast readings
async function fetchWeatherReadings(dateTime, date) {
  return await fetchAPIReadings(WEATHER_URL, WEATHER_ENDPOINT, dateTime, date);
}

//Date+Time in SGT
const currentDate = new Date();

currentDate.setHours(currentDate.getHours() + 8);

//Will format time+date and extracts the first 19 characters
const currentDateTimeFormatted = currentDate.toISOString().slice(0, 19);

//format date and extracts the first 10 characters
const currentDateFormatted = currentDate.toISOString().slice(0, 10);

console.log('Current Date-Time:', currentDate);
console.log('Formatted Current Date-Time:', currentDateTimeFormatted);
console.log('Fromatted Current Date:', currentDateFormatted);


fetchRainfallReadings(currentDateTimeFormatted, currentDateFormatted)
  .then(rain => {
    console.log('Rainfall readings:', rain);
  })
  .catch(error => {
    console.error('Error:', error);
  });

fetchWeatherReadings(currentDateTimeFormatted, currentDateFormatted)
  .then(data => {
    console.log('Weather readings:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function API() {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="App">
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
    </div>
  );
}

export default API;
