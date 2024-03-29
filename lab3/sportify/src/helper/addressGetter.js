import axios from 'axios'; //for making HTTP request in JS

async function addressGetter(lat, long){

    const URL_HEADER = 'https://maps.googleapis.com/maps/api/geocode/json'
    const API_KEY = "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg";
    const RESULT_TYPES = ["park","establishment","point_of_interest","premise"]

    try {
        const response = await axios.get(URL_HEADER,{
            params:{
                key:API_KEY,
                latlng: `${lat},${long}`},
                result_type: RESULT_TYPES});
        return response.data.results.at(0).formatted_address;
      } catch (error) {
        console.error('Error fetching API address ', error);
        throw error;
      }
}

export default addressGetter