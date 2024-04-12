import calculateDistance from "../calculateMapDistance";
function calculateAirTemp(location, airData) {
  if(!location) throw new Error("Invalid location data!");
  try {
    const Airvalue = airData.value;
    const Aircoordinates = airData.coordinates;
    //console.log(AirData);
    //console.log(Aircoordinates);
    //console.log(Airvalue);
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!Aircoordinates || Array.isArray(Aircoordinates)) {
      console.log("Aircoordinates not ready.");
    }
    for (let i = 0; i < 2; i++) {
      const coordinates = Aircoordinates[i];
      //console.log(coordinates.latitude);
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
    //console.log(valuesArray);
    //console.log(closestIndex);
    //console.log(valuesArray[closestIndex]);
    const airResult = valuesArray[closestIndex];
    return airResult;
  } catch (error) {
    console.error("Error calculating Air score:", error);
  }
}
export default calculateAirTemp;
