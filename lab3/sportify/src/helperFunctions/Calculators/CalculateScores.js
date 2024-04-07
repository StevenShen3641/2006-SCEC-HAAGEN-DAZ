import calculateAirTemp from "./CalculateAirTemp";
import calculatePSI from "./CalculatePSI";
import calculateRainfallAmount from "./CalculateRainfall";
import calculateUVI from "./CalculateUV";
import CalculateDistance from "./CalculateDistance";

const CalculateScores = async (displayData,ori,modes)=>{
    const scores = [];
    displayData.array.forEach(element => {
        scores.push(calculateAirTemp(element) + calculatePSI)
    });
    
export default CalculateScores;