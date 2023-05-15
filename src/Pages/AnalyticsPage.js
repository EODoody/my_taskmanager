import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  backgroundImage: {
    position: "fixed",
    top: 0,
    backgroundImage: theme.palette.background.default,
    zIndex: -1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',

  },
}))


const AnalyticsPage = () => {

  const classes = useStyles()

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const ctx1 = chartRef1.current.getContext('2d');
    const ctx2 = chartRef2.current.getContext('2d');

    // Line Chart
    const lineChart = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Progress',
            data: [10, 20, 30, 25, 40, 35],
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Pie Chart
    const pieChart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Cleanup the chart instances on component unmount
    return () => {
      lineChart.destroy();
      pieChart.destroy();
    };
  }, []);

  return (
    
      <div className={classes.backgroundImage}>
      <canvas ref={chartRef1} style={{ width: '300px', height: '300px' }} />
      <canvas ref={chartRef2} style={{ width: '300px', height: '300px' }} />
      </div>
  );
};

export default AnalyticsPage;
