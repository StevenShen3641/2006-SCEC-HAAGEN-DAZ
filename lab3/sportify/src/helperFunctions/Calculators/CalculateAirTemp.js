import calculateDistance from "../calculateMapDistance";
function calculateAirTemp(location, airData) {
  if (!location) throw new Error("Invalid location data!");
  try {
    const Airvalue = airData.value;
    const Aircoordinates = airData.coordinates;
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!Aircoordinates || Array.isArray(Aircoordinates)) {
      console.log("Aircoordinates not ready.");
    }
    for (let i = 0; i < 2; i++) {
      const coordinates = Aircoordinates[i];
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
    const valuesArray = Object.values(Airvalue);
    const airResult = valuesArray[closestIndex];
    return airResult;
  } catch (error) {
    console.error("Error calculating Air score:", error);
  }
}
export default calculateAirTemp;
