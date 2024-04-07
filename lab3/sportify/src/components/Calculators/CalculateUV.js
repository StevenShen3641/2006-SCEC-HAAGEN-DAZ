/*import calculateDistance from "../../pages/Home/distanceCalculator";
import APICaller from "../../pages/Home/APICaller";
const apiCaller = new APICaller();
const fetchUVIValues = async () => {
  try {
    const UVIData = await apiCaller.fetchUVIReadings();
    return UVIData;
  } catch (error) {
    console.error("Error fetching UVI values:", error);
  }
  fetchUVIValues();
};
async function calculateUVIScore(location) {
  try {
    const UVIData = await fetchUVIValues();
    const UVIvalue = UVIData.values;
    const UVIcoordinates = UVIData.coordinates;
    //console.log(UVIData);
    //console.log(UVIcoordinates);
    //console.log(UVIvalue);
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!UVIcoordinates || Array.isArray(UVIcoordinates)) {
      console.log("UVIcoordinates not ready.");
    }
    for (let i = 0; i < 60; i++) {
      const coordinates = UVIcoordinates[i];
      const distance = calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.lat,
        location.lng
      );
      console.log(distance);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    const valuesArray = Object.values(UVIvalue);
    console.log(closestIndex);
    console.log(valuesArray[closestIndex]);
    return valuesArray[closestIndex];
  } catch (error) {
    console.error("Error calculating UVI score:", error);
  }
}
export default calculateUVIScore;*/
