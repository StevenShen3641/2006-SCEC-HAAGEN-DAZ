import calculateDistance from "../../pages/Home/distanceCalculator";
import APICaller from "../../pages/Home/APICaller";
const apiCaller = new APICaller();
const fetchRainfallValues = async () => {
  try {
    const rainfallData = await apiCaller.fetchRainfallReadings();
    return rainfallData;
  } catch (error) {
    console.error("Error fetching PSI values:", error);
  }
  fetchRainfallValues();
};
function calculateRainfallScore(location) {
  const rainfallData = apiCaller.fetchRainfallReadings();
  const rainfallvalue = rainfallData.value;
  const rainfallcoordinates = rainfallData.coordinates;
  let shortestDistance = Infinity;
  let closestIndex = -1;
  if (rainfallcoordinates && Array.isArray(rainfallcoordinates)) {
    for (let i = 0; i < rainfallcoordinates.length; i++) {
      const coordinates = rainfallcoordinates[i];
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
      return rainfallvalue[i];
    }
  }
}
export default calculateRainfallScore;
