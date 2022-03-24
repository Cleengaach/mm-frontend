import React from 'react';
import "./hight-chart.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Chart, Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
)

const DetailChartnew = ({ children, length }) => {

    //vybratie vyskovych stupnov
    var vyska = [];
    children.forEach((element, i) => {
        vyska = element.geometry.coordinates;
    });
    var vyskaItem = [];

    var factor = 2;
    if (vyska.length > 10000) {
        factor = 100;
    } else if (vyska.length > 5000) {
        factor = 70;
    } else if (vyska.length > 2000) {
        factor = 40;
    } else if (vyska.length > 1000) {
        factor = 20;
    } else if (vyska.length > 500) {
        factor = 10;
    } else if (vyska.length > 200) {
        factor = 5;
    }

    vyska.forEach((element, i) => {
        if (i % factor === 0) {
            vyskaItem.push(element[2])
        }
    });


    //labels
    const metres = [0, (length * 0.25).toFixed(2), (length * 0.5).toFixed(2), (length * 0.75).toFixed(2), length];

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
    };
    const data = {
        // x-axis label values
        id: 1,
        lineTension: 0.8,
        labels: vyskaItem,
        legend: {
            display: false
        },
        datasets: [
            {
                label: metres,
                // y-axis data plotting values
                data: vyskaItem,
                backgroundColor: 'rgba(255,255,255,0.07)',
                fill: true,
                borderWidth: 3,
                borderColor: 'rgba(255,255,255,0)',
                pointRadius: 0,
                responsive: true
            },
        ],
    };


    return (
        <div id="hight-chart">
            <Line options={options} data={data} />
            <ul className='chart-label'>
                {metres.map((metre, i) => {
                    return (
                        < li key={i} >
                            {metre} {i === 4 ? 'km' : null}
                        </li>
                    )
                })}
            </ul>
        </div >
    );
};

export default DetailChartnew;