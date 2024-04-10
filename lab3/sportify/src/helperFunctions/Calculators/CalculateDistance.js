import APICaller from "../APICaller";
import React, { useState, useEffect } from "react";

async function CalculateDistance(displayData, ori, mode) {
  const apiCaller = new APICaller();
  const distances = {}
  let minDistance = Infinity;
  for (const value of displayData) {
    const result = await apiCaller.fetchDistance(
      ori,
      {
        lat: parseFloat(value.Y),
        lng: parseFloat(value.X),
      },
      mode
    );
    distances[value.index] = result
    if(result< minDistance) minDistance = result;
  }
  return [distances,minDistance];
}

export default CalculateDistance;
