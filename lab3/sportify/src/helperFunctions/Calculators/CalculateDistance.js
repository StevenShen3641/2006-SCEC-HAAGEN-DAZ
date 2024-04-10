import APICaller from "../APICaller";
import React, { useState, useEffect } from "react";

const CalculateDistance = (displayData, ori,modes) => {
    const apiCaller = new APICaller();
    // const [distances, setDistances] = useState({});
    let distances;
        displayData.forEach((value) => {
            apiCaller
                .fetchDistance(
                    ori,
                    {
                        lat: parseFloat(value.Y),
                        lng: parseFloat(value.X),
                    },
                    modes
                )
                .then((result) => {
                    console.log(result);

                    ((prevDistance) => ({ ...prevDistance, [value.index]: result }))();
                });
        });
    console.log(distances);
    return distances;
    // please ignore, testing
    // const apiCaller = new APICaller();
    // const read = apiCaller.fetchUVIReadings();
    // console.log(read);
}

export default CalculateDistance;