import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const PieChart = ({ cardData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!cardData || cardData.length === 0) {
      return;
    }

    const chartDataValues = cardData.map(item => {
      const value = typeof item.value === 'string' 
        ? parseInt(item.value.replace('N/A', '0')) 
        : item.value;
      return value;
    });

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels: cardData.map(item => item.label),
        datasets: [{
          label: 'Metrics',
          data: chartDataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',    // Bright pink
            'rgba(54, 162, 235, 0.8)',    // Bright blue
            'rgba(255, 206, 86, 0.8)',    // Bright yellow
            'rgba(75, 192, 192, 0.8)',    // Bright turquoise
            'rgba(153, 102, 255, 0.8)',   // Bright purple
            'rgba(255, 159, 64, 0.8)',    // Bright orange
            'rgba(220, 53, 69, 0.8)'      // Bright red
          ],
          borderColor: [
            'rgb(220, 20, 60)',          // Crimson
            'rgb(0, 91, 187)',           // Deep blue
            'rgb(255, 174, 0)',          // Golden
            'rgb(32, 178, 170)',         // Deep turquoise
            'rgb(106, 90, 205)',         // Slate blue
            'rgb(255, 140, 0)',          // Dark orange
            'rgb(178, 34, 34)'           // Firebrick red
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        radius: '100%',         // Slightly smaller for a compact look
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 10    // Smaller font for a compact display
              },
              padding: 15   // Reduced padding between legend items
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [cardData]);

  return (
   
    <canvas ref={chartRef} />
    
  );
};

export default PieChart;
