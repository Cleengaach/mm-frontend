import React from "react";

const GetTime = (totalTime, time) => {

    let finalTime;
    if (totalTime === "0" || totalTime === "false") {
        const checkNull = time.slice(0, 1);
        if (checkNull === "0") {
            finalTime = time.slice(1, 5);
        } else {
            finalTime = time.slice(0, 5);
        }

    } else {
        finalTime = totalTime
    }

    return finalTime;
};

export default GetTime;