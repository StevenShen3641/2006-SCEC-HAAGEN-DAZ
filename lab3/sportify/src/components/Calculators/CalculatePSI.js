import calculateDistance from "../../pages/Home/distanceCalculator";
import APICaller from "../../pages/Home/APICaller";
const apiCaller = new APICaller();
const fetchPSIValues = async () => {
  try {
    const psiData = await apiCaller.fetchPSIReadings();
    {
      /*console.log(psiData);*/
    }
    return psiData;
  } catch (error) {
    console.error("Error fetching PSI values:", error);
  }
  fetchPSIValues();
};
async function calculatePSIScore(location) {
  console.log(location);
  try {
    const psiData = await fetchPSIValues();
    {
      /*console.log(psiData);*/
    }
    const PSIvalue = psiData.value;
    {
      //console.log(PSIvalue);
    }
    const PSIcoordinates = psiData.coordinates;
    {
      //console.log(PSIcoordinates);
    }
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!PSIcoordinates || Array.isArray(PSIcoordinates)) {
      console.log("PSIcoordinates not ready.");
    }
    for (let i = 0; i < 5; i++) {
      const coordinates = PSIcoordinates[i];
      //console.log(coordinates);
      //console.log(coordinates.latitude);
      //console.log(location.x);
      //console.log(location.y);
      const distance = calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.y,
        location.x
      );
      //console.log(distance);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    return PSIvalue[closestIndex];
  } catch (error) {
    console.error("Error calculating PSI score:", error);
  }
}
export default calculatePSIScore;
