import APICaller from "../APICaller";
import React, { useState, useEffect } from "react";

async function CalculateDistance(displayData, ori, modes) {
  const apiCaller = new APICaller();
  const distances = {}
  for (const value of displayData) {
    const result = await apiCaller.fetchDistance(
      ori,
      {
        lat: parseFloat(value.Y),
        lng: parseFloat(value.X),
      },
      modes
    );
    console.log(result);

    
    distances[value.index] = result
  }

  console.log(distances);
  return distances;
}

export default CalculateDistance;
