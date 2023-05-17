/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { productChart } from '../../api/api';

function PostGraph() {
  const [userCount, setUserCount] = useState([]);
  useEffect(() => {
    productChart()
      .then((res) => {
        const counts = {};
        res?.data.data?.forEach((user) => {
          const date = new Date(user.createdAt).toLocaleDateString();
          counts[date] = counts[date] ? counts[date] + 1 : 1;
        });
        setUserCount(counts);
      })
      .catch((err) => console.log(err));
  }, []);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  const chartData = {
    labels: Object.keys(userCount),
    datasets: [
      {
        label: 'Post By days',
        data: Object.values(userCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Post',
      },
    },
  };
  return (
    <div>
      <h2>Post Count by Date</h2>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default PostGraph;
