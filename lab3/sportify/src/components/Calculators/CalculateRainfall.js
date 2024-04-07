import calculateDistance from "../../pages/Home/distanceCalculator";
import APICaller from "../../pages/Home/APICaller";
const apiCaller = new APICaller();
const fetchRainfallValues = async () => {
  try {
    const RainfallData = await apiCaller.fetchRainfallReadings();
    return RainfallData;
  } catch (error) {
    console.error("Error fetching Rainfall values:", error);
  }
  fetchRainfallValues();
};
async function calculateRainfallScore(location) {
  try {
    const RainfallData = await fetchRainfallValues();
    const Rainfallvalue = RainfallData.values;
    const Rainfallcoordinates = RainfallData.coordinates;
    //console.log(RainfallData);
    //console.log(Rainfallcoordinates);
    //console.log(Rainfallvalue);
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!Rainfallcoordinates || Array.isArray(Rainfallcoordinates)) {
      console.log("Rainfallcoordinates not ready.");
    }
    for (let i = 0; i < 60; i++) {
      const coordinates = Rainfallcoordinates[i];
      const distance = calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.x,
        location.y
      );
      console.log(distance);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    const valuesArray = Object.values(Rainfallvalue);
    console.log(closestIndex);
    console.log(valuesArray[closestIndex]);
    return valuesArray[closestIndex];
  } catch (error) {
    console.error("Error calculating Rainfall score:", error);
  }
}
export default calculateRainfallScore;
