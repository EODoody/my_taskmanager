import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    overflow: "auto", 
  },
  backgroundImage: {
    position: "fixed",
    top: 0,
    backgroundImage: theme.palette.background.default,
    zIndex: -1,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}))


const AnalyticsPage = () => {
  const classes = useStyles();
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:80/my-taskmanager/papi/APget_data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error('Unable to fetch data');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the existing chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create a new chart instance
      const ctx = chartRef.current.getContext('2d');
      const LineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((item) => item.project_ID),
          datasets: [
            {
              label: 'Task Count',
              data: data.map((item) => item.id),
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

      // Save the new chart instance
      return() => {
        LineChart.destroy();};
      }
      },[]);





  return (
    <div className={classes.backgroundImage}>
      <div className={classes.root}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default AnalyticsPage;