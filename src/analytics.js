// pages/analytics.js
import React from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  RadialLinearScale,
  BarElement, 
  LineElement, 
  PointElement, 
  RadarController, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import useSWR from 'swr';
import './CardStyles.css';

// Register the necessary components, including RadialLinearScale
ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, RadarController, Title, Tooltip, Legend);

const fetcher = (url) => fetch(url).then((res) => res.json());

const Analytics = () => {
  const { data, error } = useSWR('/api/proxy', fetcher);

  if (!data && !error) return <p></p>;
  if (error) return <p>Error loading data.</p>;

  const engagementData = data?.dashboard?.engagementMetrics?.daily?.chartData;
  const blockchainData = data?.dashboard?.blockchainMetrics?.daily?.chartData;
  const blockchainData2 = data?.dashboard?.blockchainMetrics?.daily;

  if (!engagementData || !Array.isArray(engagementData)) return <p>No engagement data available.</p>;
  if (!blockchainData || !Array.isArray(blockchainData)) return <p>No blockchain data available.</p>;
  if (!blockchainData2) return <p>No blockchain data available for radar chart.</p>;

  const engagementChartData = {
    labels: engagementData.map((entry) => entry.timestamp),
    datasets: [
      {
        label: 'Views',
        data: engagementData.map((entry) => entry.count),
        backgroundColor: 'rgba(255, 99, 132, 0.7)', // Bright pink
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const blockchainChartData = {
    labels: blockchainData.map((entry) => entry.timestamp),
    datasets: [
      {
        label: 'Token Transactions',
        data: blockchainData.map((entry) => entry.count),
        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Bright blue
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
      },
    ],
  };

  const blockchainRadarData = {
    labels: ['Total Tokens', 'Wallet on Solana', 'Wallet on Polygon', 'Wallet on Ethereum'],
    datasets: [
      {
        label: 'Blockchain Metrics',
        data: [
          blockchainData2.totalTokens,
          blockchainData2.totalWalletOnSolana,
          blockchainData2.totalWalletOnPolygon,
          blockchainData2.totalWalletOnEthereum,
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Bright orange
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 30,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold text-center">Analytics</h1>

      {/* Engagement Metrics Bar Chart */}
      <div className="chartContainer">
        <h2 className="chartTitle">Engagement Metrics: Daily</h2>
        <Bar data={engagementChartData} options={chartOptions} /> {/* Corrected data binding */}
      </div>
      
      {/* Blockchain Metrics Line Chart */}
      <div className="chartContainer">
        <h2 className="chartTitle">Blockchain Metrics: Daily</h2>
        <Line data={blockchainChartData} options={chartOptions} /> {/* Corrected data binding */}
      </div>

      {/* Blockchain Metrics Radar Chart */}
      <div className="chartContainer">
        <h2 className="chartTitle">Blockchain Metrics Overview</h2>
        <Radar data={blockchainRadarData} options={radarOptions} /> {/* Corrected data binding */}
      </div>
    </div>
  );
};

export default Analytics;
