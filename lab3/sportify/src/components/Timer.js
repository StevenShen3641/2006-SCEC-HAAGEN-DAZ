import React from 'react';
import { useState, useEffect } from 'react';


function Timer ({timerDone}) {

    const [timerRunning, setTimerRunning] = useState(false);

        useEffect(()=>{
            let timeLeft = 7200; // 2 hours in seconds

            let timerInterval;

            startTimer();

            if (timerRunning){
                timerInterval = setInterval(() => {
                    timeLeft -= 1;
                    if (timeLeft === 0){
                        clearInterval(timerInterval);
                        setTimerRunning(false);
                        timerDone(0);
                    }
                }, 1000);
            } else {
                clearInterval(timerInterval);
            }

            return () => clearInterval(timerInterval);
        }, [timerDone]);

        const startTimer = () => {
            setTimerRunning(true);
        };

        return null;

}

export default Timer;
