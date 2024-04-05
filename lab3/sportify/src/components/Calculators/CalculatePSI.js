{/*import calculateDistance from "../../pages/Home/distanceCalculator";
import APICaller from "../../pages/Home/APICaller";
async function calculatePSIScore(location) {
  const apiCaller = new APICaller();
  const psiData = apiCaller.fetchPSIReadings();
  const PSIvalue = psiData.value;
  const PSIcoordinates = psiData.coordinates;
  let shortestDistance = Infinity;
  let closestIndex = -1;
  for (let i = 0; i < PSIcoordinates.length; i++) {
    const coordinates = PSIcoordinates[i];
    const distance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      location.y,
      location.x
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestIndex = i;
    }
    return PSIvalue[i];
  }
}
export default calculatePSIScore;*/}
