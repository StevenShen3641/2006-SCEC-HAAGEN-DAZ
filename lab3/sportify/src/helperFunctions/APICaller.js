import axios from "axios"; //for making HTTP request in JS

/* e.g. To call API from another file:
    const apiCaller = new APICaller();
    const read = apiCaller.fetchPSIReadings();
    console.log(read);
*/

//public class
class APICaller {
  constructor() {
    // Base URL for the API
    this.BASE_URL = "https://api.data.gov.sg/v1";

    // Endpoint path
    this.RAIN_ENDPOINT = "/environment/rainfall";
    this.WEATHER_ENDPOINT = "/environment/2-hour-weather-forecast";
    this.AIR_ENDPOINT = "/environment/air-temperature";
    this.UVI_ENDPOINT = "/environment/uv-index";
    this.PSI_ENDPOINT = "/environment/psi";

    //Date+Time in SGT
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 8);
    this.currentDateTimeFormatted = currentDate.toISOString().slice(0, 19);
    this.currentDateFormatted = currentDate.toISOString().slice(0, 10);
    // console.log("Current Date-Time:", currentDate);
    // console.log("Formatted Current Date-Time:", currentDateTimeFormatted);
    // console.log("Formatted Current Date:", currentDateFormatted);
  }

  async fetchDistance(ori, dest, modes) {
    const google = window.google;
    const directionService = new google.maps.DirectionsService();
    const distances = [];
    try {
      for (let i = 0; i < modes.length; i++) {
        let mode = modes[i];
        try {
          const results = await directionService.route({
            origin: ori,
            destination: dest,
            travelMode: mode,
          });
          const distance = parseInt(results.routes[0].legs[0].distance.value);
          distances.push(distance);
        } catch (error) { }
      }
      return Math.min(...distances);
      // return distances
    } catch (error) {
      console.error("Error fetching API readings from GoogleMaps: ", error);
      throw error;
    }
  }

  //asynchronous function for fetch API data
  async #fetchAPIReadings(url, endpoint, dateTime, date) {
    //exception handling
    try {
      // pause function until completion/failure in fetching data
      // ${url}${endpoint}: construct the URL
      const response = await axios.get(`${url}${endpoint}`, {
        //parameters
        params: {
          date_time: dateTime,
          date: date,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching API readings from ${endpoint}: ", error);
      throw error;
    }
  }

  //readings in mm
  async fetchRainfallReadings() {
    try {
      //to check if time is constantly updating
      // console.log("Time & Date:", this.currentDateTimeFormatted);
      this.data = await this.#fetchAPIReadings(
        this.BASE_URL,
        this.RAIN_ENDPOINT,
        this.currentDateTimeFormatted,
        this.currentDateFormatted
      );
      const coordinates = {};
      const values = {};
      let raindata = {};
      //metadata so we can access station values -> coordinates
      this.data.metadata.stations.forEach((station, index) => {
        coordinates[index] = station.location;
      });
      this.data.items[0].readings.forEach((reading, index) => {
        values[index] = reading.value;
      });
      raindata = {
        coordinates,
        values,
      };
      // console.log("Rainfall readings:", raindata);
      return raindata;
    } catch (error) {
      console.error("Error fetching rainfall readings:", error);
      throw error;
    }
  }

  async fetchWeatherReadings() {
    try {
      this.data = await this.#fetchAPIReadings(
        this.BASE_URL,
        this.WEATHER_ENDPOINT,
        this.currentDateTimeFormatted,
        this.currentDateFormatted
      );
      const coordinates = {};
      const reading = {};
      let weatherdata = {};
      this.data.area_metadata.forEach((area, index) => {
        coordinates[index] = area.label_location;
      });
      this.data.items[0].forecasts.forEach((forecast, index) => {
        reading[index] = forecast.forecast;
      });
      weatherdata = {
        coordinates,
        reading,
      };
      // console.log("Weather Readings: ", weatherdata)
      return weatherdata;
    } catch (error) {
      console.error("Error fetching weather readings:", error);
      throw error;
    }
  }

  //readings in degC
  async fetchAirReadings() {
    try {
      console.log(this.currentDateTimeFormatted);
      this.data = await this.#fetchAPIReadings(
        this.BASE_URL,
        this.AIR_ENDPOINT,
        this.currentDateTimeFormatted,
        this.currentDateFormatted
      );
      const coordinates = {};
      const value = {};
      let airdata = {};
      this.data.metadata.stations.forEach((station, index) => {
        coordinates[index] = station.location;
      });
      this.data.items[0].readings.forEach((reading, index) => {
        value[index] = reading.value;
      });
      airdata = {
        coordinates,
        value,
      };
      // console.log("Air Readings: ", this.data)
      return airdata;
    } catch (error) {
      console.error("Error fetching air readings:", error);
      throw error;
    }
  }

  async fetchUVIReadings() {
    try {
      this.data = await this.#fetchAPIReadings(
        this.BASE_URL,
        this.UVI_ENDPOINT,
        this.currentDateTimeFormatted,
        this.currentDateFormatted
      );
      //console.log(this.data);
      const UVI = this.data.items[0].index[0].value;
      //console.log(UVI);
      //console.log("UVI Readings: ", this.data);
      return UVI;
    } catch (error) {
      console.error("Error fetching air readings:", error);
      throw error;
    }
  }

  async fetchPSIReadings() {
    try {
      this.data = await this.#fetchAPIReadings(
        this.BASE_URL,
        this.PSI_ENDPOINT,
        this.currentDateTimeFormatted,
        this.currentDateFormatted
      );
      const coordinates = {};
      const value = {};
      let PSIdata = {};
      this.data.region_metadata.forEach((region, index) => {
        coordinates[index] = region.label_location;
      });
      const store = this.data.items[0].readings.psi_twenty_four_hourly;
      for (const region in store) {
        value[region] = store[region];
      }
      PSIdata = {
        coordinates,
        value,
      };
      // console.log(value)
      // console.log(value[Object.keys(value)[0]]);
      // console.log("PSI Readings: ", this.data)
      return PSIdata;
    } catch (error) {
      console.error("Error fetching air readings:", error);
      throw error;
    }
  }
}

export default APICaller;
