import calculateMapDistance from "../calculateMapDistance";
function calculatePSI(location, psiData) {
  if (!location) throw new Error("Invalid location data!");
  try {
    const PSIvalue = psiData.value;
    const PSIcoordinates = psiData.coordinates;
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!PSIcoordinates || Array.isArray(PSIcoordinates)) {
      console.log("PSIcoordinates not ready.");
    }
    for (let i = 0; i < Object.keys(PSIcoordinates).length; i++) {
      const coordinates = PSIcoordinates[i];
      const distance = calculateMapDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.Y,
        location.X
      );
      //console.log(distance);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    const valuesArray = Object.values(PSIvalue);
    return valuesArray[closestIndex];
  } catch (error) {
    console.error("Error calculating PSI score:", error);
  }
}
export default calculatePSI;
