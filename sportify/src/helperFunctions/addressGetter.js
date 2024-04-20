import axios from 'axios'; //for making HTTP request in JS

async function addressGetter(lat, lng){

    const URL_HEADER = 'https://maps.googleapis.com/maps/api/geocode/json'
    const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const RESULT_TYPES = ["park","establishment","point_of_interest","premise"]

    try {
        const response = await axios.get(URL_HEADER,{
            params:{
                key:API_KEY,
                latlng: `${lat},${lng}`},
                result_type: RESULT_TYPES});
        const data = response.data;
        if (!data || data.status !== "OK") {
          return "Loading error";
        } else {
          const address = data.results[0]["formatted_address"];
          return address;
        }
      } catch (error) {
        // console.log('Error fetching API address ', error);
      }
}

export default addressGetter