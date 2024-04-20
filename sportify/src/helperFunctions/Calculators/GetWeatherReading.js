import calculateDistance from "../calculateMapDistance";
function getWeatherReading(location, weatherData) {
  if (!location) throw new Error("Invalid location data!");
  try {
    const weatherValue = weatherData && weatherData.reading;
    const weatherCoordinates = weatherData.coordinates;
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!weatherCoordinates || Array.isArray(weatherCoordinates)) {
      console.log("WeatherCoordinates not ready.");
    }
    for (let i = 0; i < 2; i++) {
      const coordinates = weatherCoordinates[i];
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
    const weatherResult = weatherValue[closestIndex];
    return weatherResult;
  } catch (error) {
    console.error("Error calculating Weather score:", error);
  }
}

export default getWeatherReading;
