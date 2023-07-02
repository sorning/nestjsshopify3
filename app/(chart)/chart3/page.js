'use client'
import Script from "next/script"
import { useRef } from "react"

export default function ChartRadar() {
    const chartRef=useRef()
    const handleOnLoad=()=>{
        new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: ['red', 'blue', 'yellow'],
                datasets: [
                    {
                        label: 'vote',
                        data: [12, 11, 9],
                        // data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        // backgroundColor: backgroundColor,
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',

                        ],
                        // borderColor: borderColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {},
        } )
    }
    return (
        <>
        <canvas ref={chartRef}/>
        <Script 
        src="https://cdn.jsdelivr.net/npm/chart.js"
        onLoad={handleOnLoad}
        />
        </>
    )
}