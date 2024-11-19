import "./barchart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Average Grade",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};
const BarCharts = ({ averagedata }) => {
  const [datasets, setDatasets] = useState({});
  useEffect(() => {
    if (
      averagedata &&
      averagedata["monthly_average"] &&
      Object.keys(averagedata["monthly_average"]).length > 0
    ) {
      const labels = Object.keys(averagedata["monthly_average"]);
      let datareal = [];
      labels.forEach((item) => {
        if (averagedata["monthly_average"][item].toLocaleLowerCase() === "a") {
          datareal.push(100);
        } else if (
          averagedata["monthly_average"][item].toLocaleLowerCase() === "b"
        ) {
          datareal.push((100 * 5) / 6);
        } else if (
          averagedata["monthly_average"][item].toLocaleLowerCase() === "c"
        ) {
          datareal.push((100 * 4) / 6);
        } else if (
          averagedata["monthly_average"][item].toLocaleLowerCase() === "d"
        ) {
          datareal.push((100 * 3) / 6);
        } else if (
          averagedata["monthly_average"][item].toLocaleLowerCase() === "e"
        ) {
          datareal.push((100 * 2) / 6);
        } else if (
          averagedata["monthly_average"][item].toLocaleLowerCase() === "f"
        ) {
          datareal.push((100 * 1) / 6);
        }
      });
      // Define specific colors for each bar
      const backgroundColors = ["green", "yellow", "red"];

      const data = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: datareal,
            // backgroundColor: backgroundColors,
          },
        ],
      };
      setDatasets(data);
    }
  }, [averagedata]);

  return (
    <div
      className="bar_chart_container border rounded-2 p-4 me-lg-3 me-md-3"
      style={{ width: "500px" }}
    >
      <div className="chart-titles">
        <h1 className="medium_font font_size_16">Average Grade</h1>
        <h2 className="medium_font font_size_32">
          {averagedata["overall_average"]}
        </h2>
        {/* <p className="font_size_16 text_muted">Jan - Mar</p> */}
      </div>
      {datasets["labels"]?.length > 0 && (
        <Bar options={options} data={datasets} />
      )}
    </div>
  );
};

export default BarCharts;
