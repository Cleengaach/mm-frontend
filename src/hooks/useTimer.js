import { useEffect, useState, useRef, useCallback } from 'react';

const useTimer = ({ data }) => {
    const maxPoints = data.strapiRoute.Route_path.length - 1;
    const [order, setOrder] = useState(0);
    const nextPoint = order + 1;
    const time = data.strapiRoute.Route_path[order].time.split(":");
    const hours = parseInt(time[0]) * 60 * 60;
    const minutes = parseInt(time[1]) * 60;
    const secondsData = hours + minutes;

    const [seconds, setSeconds] = useState(secondsData);
    const [total, setTotal] = useState(0);
    const [start, setStart] = useState(false);
    const [expired, setExpired] = useState(false);
    const [extratime, setExtratime] = useState(0);

    const intervalRef = useRef();
    const intervalTotalRef = useRef();
    const intervalExtraRef = useRef();

    const pointHistory = new Array;
    const [allPoints, setAllPoints] = useState(pointHistory);

    console.log({ order })

    //countdown
    useEffect(() => {
        if (start) {
            const tick = () => setSeconds(t => t - 1);
            intervalRef.current = setInterval(tick, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [start]);

    //extratime
    useEffect(() => {
        if (start) {
            const tick = () => setExtratime(t => t + 1);
            intervalExtraRef.current = setInterval(tick, 1000);
        } else {
            clearInterval(intervalExtraRef.current);
        }
    }, [expired]);

    //total time
    useEffect(() => {
        if (start) {
            const tickTotal = () => setTotal(t => t + 1);
            intervalTotalRef.current = setInterval(tickTotal, 1000);
        } else {
            clearInterval(intervalTotalRef.current);
        }
        return () => clearInterval(intervalTotalRef.current);
    }, [start]);

    useEffect(() => {
        if (seconds === 0) {
            clearInterval(intervalRef.current);
            setExpired(true);
            //setStart(false);
            //alert("Expired");
        }
    }, [seconds]);

    useEffect(() => {
        const time = data.strapiRoute.Route_path[order].time.split(":");
        const hours = parseInt(time[0]) * 60 * 60;
        const minutes = parseInt(time[1]) * 60;
        const secondsData = hours + minutes;
        setSeconds(secondsData);
    }, [order]);

     //change point
    const createHistory = () => {
        const time = data.strapiRoute.Route_path[order].time.split(":");
        const hours = parseInt(time[0]) * 60 * 60;
        const minutes = parseInt(time[1]) * 60;
        const secondsData = hours + minutes;

        const pointTime = secondsData - seconds + extratime;

        const pointObject = {
            title: data.strapiRoute.Route_path[order].point.title,
            altitude: data.strapiRoute.Route_path[order].point.altitude,
            time: data.strapiRoute.Route_path[order].time,
            color: data.strapiRoute.Route_path[order].farba,
            yourtime: pointTime,
        }
        setAllPoints([...allPoints, pointObject]);
        setSeconds(secondsData);
    };


    const reset = () => {
        let newOrder = order + 1;
        if (newOrder > maxPoints) {
            newOrder = maxPoints;
        }
        setStart(false)
        createHistory();
        setOrder(newOrder);
    };

    function getTime2(seconds) {
        const hoursShow = Math.floor(seconds / 3600);
        let sc = seconds % 3600
        const minutesShow = Math.floor(sc / 60);
        const secondsShow = sc % 60;

        const hourF = twodigits(hoursShow);
        const minuteF = twodigits(minutesShow);
        const secondF = twodigits(secondsShow);

        return ({ hourF, minuteF, secondF })
    }

    function twodigits(number) {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }
    return [
        maxPoints,
        nextPoint,
        seconds,
        allPoints,
        total,
        order,
        expired,
        extratime,
        start,
        setStart,
        setOrder,
        reset
    ];
};
export { useTimer };