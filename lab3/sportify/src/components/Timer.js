import React, { useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';


const Timer = forwardRef(({timerDone}, ref ) => {

    const [timerRunning, setTimerRunning] = useState(false);

        useEffect(()=>{
            let timeLeft = 7200; // 2 hours in seconds

            let timerInterval;

            const startTimer = () => {
                setTimerRunning(true);
            };

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
        }, [timerDone, timerRunning]);

        useImperativeHandle(ref, () => ({

            startTimer: () => {
                setTimerRunning(true);
            }
        }));

        return null;

});

export default Timer;
