import { useEffect, useState, useRef, useCallback } from 'react';

const useCountdown = ({ initialCounter, callback }) => {
    const _initialCounter = initialCounter,
        [resume, setResume] = useState(0),
        [counter, setCounter] = useState(_initialCounter),
        initial = useRef(_initialCounter),
        intervalRef = useRef(null),
        [isPause, setIsPause] = useState(false),
        isStopBtnDisabled = counter === 0,
        isPauseBtnDisabled = isPause || counter === 0,
        isResumeBtnDisabled = !isPause;

    const intervalRefTime = useRef(null);
    const [resumeTime, setResumeTime] = useState(0);
    const [timer, setTimer] = useState(0);
    const initialTimer = useRef(0);

    const stopCounter = useCallback(() => {
        clearInterval(intervalRef.current);
        setCounter(0);
        setIsPause(false);
    }, []);

    const startCounter = useCallback(
        (seconds = initial.current) => {
            intervalRef.current = setInterval(() => {
                const newCounter = seconds--;
                if (newCounter >= 0) {
                    setCounter(newCounter);
                    callback && callback(newCounter);
                } else {
                    stopCounter();
                }
            }, 1000);
        },
        [stopCounter]
    );
    const startTimer = useCallback(
        (seconds = initialTimer.current) => {
            intervalRefTime.current = setInterval(() => {
                const newTimer = seconds++;
                if (newTimer >= 0) {
                    setTimer(newTimer);
                    callback && callback(newTimer);
                } else {
                    stopCounter();
                }
            }, 1000);
        },
        [stopCounter]
    );

    const pauseCounter = () => {
        setResume(counter);
        setResumeTime(timer);
        setIsPause(true);
        clearInterval(intervalRefTime.current);
        clearInterval(intervalRef.current);
    };

    const resumeCounter = () => {
        startCounter(resume - 1);
        startTimer(resumeTime + 1);
        setResume(0);
        setResumeTime(0);
        setIsPause(false);
    };

    const resetCounter = useCallback(() => {
        if (intervalRef.current) {
            stopCounter();
        }
        setCounter(initial.current);
        startCounter(initial.current - 1);
        startTimer(initialTimer.current + 1);
    }, [startCounter, stopCounter]);

    useEffect(() => {
        resetCounter();
    }, [resetCounter]);

    useEffect(() => {
        return () => {
            stopCounter();
        };
    }, [stopCounter]);


    return [
        counter,
        timer,
        resetCounter,
        stopCounter,
        pauseCounter,
        resumeCounter,
        isStopBtnDisabled,
        isPauseBtnDisabled,
        isResumeBtnDisabled,
    ];
};


{/*}
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));

    return [days, hours, minutes, seconds];
    {*/}

export { useCountdown };
