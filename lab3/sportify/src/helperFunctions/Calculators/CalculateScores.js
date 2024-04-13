import calculateAirTemp from "./CalculateAirTemp";
import calculatePSI from "./CalculatePSI";
import calculateRainfallAmount from "./CalculateRainfall";
import calculateUVI from "./CalculateUV";
import CalculateDistance from "./CalculateDistance";
import APICaller from "../APICaller";

const CalculateScores = async (displayData,ori)=>{
    const overallScores = {};

    const WEATHER_WEIGHTAGE = 0.4;
    const DISTANCE_WEIGHTAGE = 1 - WEATHER_WEIGHTAGE;
    const [distances, minDistance] = await CalculateDistance(displayData,ori);
    const distanceScores = CalCulateDistanceScore(distances,minDistance);
    const distanceScoresIndex = Object.keys(distanceScores);

    const apiCaller = new APICaller()
    const airData = await apiCaller.fetchAirReadings()
    const psiData = await apiCaller.fetchPSIReadings()
    const rainfallData = await apiCaller.fetchRainfallReadings()
    const UVIData = await apiCaller.fetchUVIReadings()
    for(let element of displayData) {
        const weatherScore = await CalculateWeatherScore(element, airData, psiData, rainfallData, UVIData);
        if (element && distanceScoresIndex.length !== 0 && distanceScoresIndex.includes(element.index)){
            overallScores[element.index] = (distanceScores[element.index] * DISTANCE_WEIGHTAGE) + (weatherScore* WEATHER_WEIGHTAGE)
        }
        else{
            console.log("cannot calculate overall scores!")
        }
    }

return overallScores;
}


const CalculateWeatherScore = async (element, airData, psiData, rainfallData, UVIData)=>{
    if(!element) throw new Error("Invalid location data!");
    const EACH_API_WEIGHTAGE = 0.25;

    const air_temp = calculateAirTemp(element,airData);
    const PSI = calculatePSI(element, psiData);
    const rainFall = calculateRainfallAmount(element, rainfallData);
    const UVI = calculateUVI(element, UVIData);
    const sports = element["Sports"].toLowerCase()
    if (sports.includes("(indoor)")) {
        // no UVI and Rainfall
        return (CalculateAirTempScore(air_temp) * 0.15 + CalculatePSIScore(PSI) * 0.15 + 100 * 0.35 + 90 * 0.35)
    } else {
        return (CalculateAirTempScore(air_temp) + CalculatePSIScore(PSI) + CalculateRainfallScore(rainFall) + CalculateUVScore(UVI)) * EACH_API_WEIGHTAGE;
    }
}



const CalCulateDistanceScore = (distances,minDistance)=>{
    const scores ={};
    for (let placeID in distances){
        scores[placeID] = Math.exp((minDistance - distances[placeID])/12000) * 100
    }
    return scores;
}

const between = (x, min, max) => {
    return x >= min && x <= max;
}

const CalculateAirTempScore = (air_temp)=>{
        // based on SAF work rest cycle
        if(air_temp < 24) return 100;
        if(between(air_temp,24.0,24.9)) return 90;
        if(between(air_temp,25.0,25.9)) return 80;
        if(between(air_temp,26.0,26.9)) return 70;
        if(between(air_temp,27.0,27.9)) return 60;
        if(between(air_temp,28.0,28.9)) return 50;
        if(between(air_temp,29.0,29.9)) return 40;
        if(between(air_temp,30.0,30.9)) return 30;
        if(between(air_temp,31.0,31.9)) return 20;
        if(between(air_temp,32.0,32.9)) return 10;
        if(air_temp > 33 ) return 0;
}

const CalculatePSIScore = (PSI)=>{
    //based on PSI scale in Singapore
    if (PSI < 50) return 100;
    if(between(PSI,50,75)) return 80;
    if(between(PSI,76,100)) return 60;
    if(between(PSI,101,150)) return 40;
    if(between(PSI,151,200)) return 20;
    if (PSI > 200) return 0;
}

const CalculateRainfallScore = (rainFall) =>{
    //rainfall in mm
    if(rainFall < 0.5) return 100;
    if(between(rainFall,0.6,1)) return 80;
    if(between(rainFall,1.1,2.0)) return 60;
    if(between(rainFall,2.1,3.0)) return 60;
    if(between(rainFall,3.1,4.0)) return 40;
    if(between(rainFall,4.1,5.0)) return 20;
    if(rainFall > 5.0) return 0;

}

const CalculateUVScore = (UVI) =>{
    //based on UV index SG
    if(between(UVI,0,2)) return 100;
    if(between(UVI,3,5)) return 80;
    if(between(UVI,6,7)) return 60;
    if(between(UVI,8,10)) return 40;
    if(UVI > 11) return 20;

}


export default CalculateScores;


