import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Typography } from "@mui/material";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
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
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  
}));

const AnalyticsPage = () => {
  const classes = useStyles();
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const ganttChartRef = useRef(null);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:80/my-taskmanager/papi/APget_data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error("Unable to fetch data");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (barChartRef.current) {
      // Group tasks by user ID and count the number of tasks for each user
      const taskCountsByUser = {};
      data.forEach((task) => {
        if (task.user_id !== null) {
          if (taskCountsByUser.hasOwnProperty(task.user_id)) {
            taskCountsByUser[task.user_id]++;
          } else {
            taskCountsByUser[task.user_id] = 1;
          }
        }
      });
  
      // Extract user IDs and task counts as separate arrays
      const userIds = Object.keys(taskCountsByUser);
      const taskCounts = Object.values(taskCountsByUser);
  
      const ctx = barChartRef.current.getContext("2d");
      const barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: userIds,
          datasets: [
            {
              label: "User Task Payload",
              data: taskCounts,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0, // Ensure that the y-axis labels are displayed as whole numbers
              },
            },
          },
          plugins: {
            datalabels: {
              anchor: "end",
              align: "end",
              formatter: (value) => value, // Display the value as the label
            },
          },
        },
        plugins: [ChartDataLabels], // Enable the datalabels plugin
      });
  
      return () => {
        barChart.destroy();
      };
    }
  }, [data]);

  useEffect(() => {
    if (pieChartRef.current) {
      const assignedIncompleteTasks = data.filter(
        (task) => task.user_id !== null && task.is_completed === 0
      );
      const unassignedIncompleteTasks = data.filter(
        (task) => task.user_id === null && task.is_completed === 0
      );
      const completedTasks = data.filter((task) => task.is_completed === 1);
  
      // Calculate the total count of tasks
      const totalCount = data.length;
  
      // Calculate the percentage of total for each category
      const assignedIncompletePercentage = (assignedIncompleteTasks.length / totalCount) * 100;
      const unassignedIncompletePercentage = (unassignedIncompleteTasks.length / totalCount) * 100;
      const completedPercentage = (completedTasks.length / totalCount) * 100;
  
      // Update the pieData array with category, value, and percentage
      const pieData = [
        {
          label: "Assigned and Incomplete",
          value: assignedIncompleteTasks.length,
          percentage: assignedIncompletePercentage,
        },
        {
          label: "Unassigned and Incomplete",
          value: unassignedIncompleteTasks.length,
          percentage: unassignedIncompletePercentage,
        },
        { label: "Completed", value: completedTasks.length, percentage: completedPercentage },
      ];
  
      const ctx = pieChartRef.current.getContext("2d");
      const pieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: pieData.map((item) => item.label),
          datasets: [
            {
              data: pieData.map((item) => item.value),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const value = dataset.data[tooltipItem.index];
                const percentage = pieData[tooltipItem.index].percentage;
                return `${dataset.label}: ${value} (${percentage.toFixed(2)}%)`;
              },
            },
          },
        },
      });
  
      return () => {
        pieChart.destroy();
      };
    }
  }, [data]);
  

  useEffect(() => {
    if (ganttChartRef.current) {
      const projects = [...new Set(data.map((task) => task.project_ID))];
      const tasksByProject = projects.map((project) => {
        const tasks = data.filter((task) => task.project_ID === project);
    
        const toDoTasks = tasks.filter((task) => !task.is_completed);
        const inProgressTasks = tasks.filter(
          (task) => task.is_completed === 0 && task.user_id !== null
        );
        const completedTasks = tasks.filter((task) => task.is_completed === 1);
    
        const overdueTasks = tasks.filter(
          (task) => !task.is_completed && new Date(task.due_date) < new Date()
        );
        const upcomingTasks = tasks.filter(
          (task) => !task.is_completed && new Date(task.due_date) > new Date()
        );

        return {
          project_ID: project,
          toDoTasks: toDoTasks.length,
          inProgressTasks: inProgressTasks.length,
          completedTasks: completedTasks.length,
          overdueTasks: overdueTasks.length,
          upcomingTasks: upcomingTasks.length,
        };
      });

      const chartData = {
        labels: projects,
        datasets: [
          {
            label: "To Do",
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            data: tasksByProject.map((project) => project.toDoTasks),
          },
          {
            label: "In Progress",
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            data: tasksByProject.map((project) => project.inProgressTasks),
          },
          {
            label: "Completed",
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            data: tasksByProject.map((project) => project.completedTasks),
          },
          {
            label: "Overdue",
            backgroundColor: "rgba(255, 206, 86, 0.6)",
            data: tasksByProject.map((project) => project.overdueTasks),
          },
          {
            label: "Upcoming",
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            data: tasksByProject.map((project) => project.upcomingTasks),
          },
        ],
      };

      const GantChart = new Chart(ganttChartRef.current, {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          indexAxis: "y", // Display the chart horizontally
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
      return () => {
        GantChart.destroy();
      };
    }
  }, [data]);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2, // Adjust the aspect ratio as needed
    onResize: (chart, newSize) => {
      // Handle resize event if necessary
    },
    resizeDelay: 0, // Adjust the delay as needed
  };

  return (
    <div className={classes.backgroundImage}>
      <div className={classes.root}>
        <div
          className={classes.chartContainer}
          style={{
            position: "relative",
            height: "30vh",
            width: "80vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
    <canvas ref={pieChartRef} options={options}></canvas>
<canvas ref={barChartRef} options={options}></canvas>
          
        </div>
        <div
          className={classes.chartContainer}
          style={{ height: "50vh", width: "85vw" , display: "flex",
          justifyContent: "space-between",}}
        > 
          <canvas ref={ganttChartRef} options={options}></canvas>
          <Typography variant="h2"><strong> ANALYTICS </strong></Typography>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
