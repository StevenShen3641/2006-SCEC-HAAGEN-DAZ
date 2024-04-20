import calculateDistance from "../calculateMapDistance";
function calculateRainfallAmount(location, rainfallData) {
  if (!location) throw new Error("Invalid location data!");
  try {
    const rainfallvalue = rainfallData.values;
    const rainfallcoordinates = rainfallData.coordinates;
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!rainfallcoordinates || Array.isArray(rainfallcoordinates)) {
      console.log("Rainfallcoordinates not ready.");
    }
    for (let i = 0; i < 60; i++) {
      const coordinates = rainfallcoordinates[i];
      const distance = calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.Y,
        location.X
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    const valuesArray = Object.values(rainfallvalue);
    return valuesArray[closestIndex];
  } catch (error) {
    console.error("Error calculating Rainfall score:", error);
  }
}
export default calculateRainfallAmount;
