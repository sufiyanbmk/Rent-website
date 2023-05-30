/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { pieChartProduct } from '../../api/api'

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart() {
  const [details,setDetails]=useState({})
  useEffect(() => {
    pieChartProduct()
      .then((res) => {
        console.log(res)
        setDetails(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  const data = {
    labels: Object.keys(details),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(details),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}