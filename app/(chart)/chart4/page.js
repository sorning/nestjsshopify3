'use client'
import Script from "next/script"
import { useEffect, useRef } from "react"

export default function ChartRadar() {
    const chartRef = useRef()
    const datasetsData1 = [65, 59, 90, 81, 56, 55, 40]
    const datasetsData2 = [28, 48, 40, 19, 96, 27, 100]
    const configData = {
        labels: [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Cycling',
            'Running'
        ],
        datasets: [{
            label: 'My First Dataset',
            // data: [65, 59, 90, 81, 56, 55, 40],
            data: datasetsData1,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132,0.2)',
            pointBackgroundColor: 'rgba(255, 99, 132,0.2)',
            pointBorderColor: 'rgba(255, 99, 132,0.2)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: 'My Second Dataset',
            // data: [28, 48, 40, 19, 96, 27, 100],
            data: datasetsData2,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235,0.2)',
            pointBackgroundColor: 'rgba(54, 162, 235,0.2)',
            pointBorderColor: 'rgba(54, 162, 235,0.2)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };


    const handleOnLoad = async () => {
        try {
            await new Chart(chartRef.current, config)
        } catch { }

    }
    const config = {
        type: 'radar',
        data: configData,
        options: {
            elements: {
                line: {
                    borderWidth: 3,
                }
            },
            scales: {
                //r代表半径，也可以x，y
                r: {
                    angleLines: {
                        color: 'rgba(54, 162, 235, 0.1)',
                    },
                    grid: {
                        color: 'rgba(54, 162, 235, 0.1)',
                    },
                    ticks: {
                        color:'rgba(54, 162, 235, 0.3)',
                        backdropColor:'rgba(54, 162, 235, 0.05)',
                        display:true,
                        fontColor:'purple',
                        fontSize:10,

                    }
                }

            }
        }
    }

    return (
        <>
            <canvas ref={chartRef} />
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                onLoad={handleOnLoad}
            />
        </>
    )
}