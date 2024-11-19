import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
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
const AreaChart = ({ attendancedata }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const [datasets, setDatasets] = useState({});
  const labels = ["January", "February", "March"];
  useEffect(() => {
    if (
      attendancedata &&
      attendancedata["monthly_percentages"] &&
      Object.keys(attendancedata["monthly_percentages"]).length > 0
    ) {
      const labels = Object.keys(attendancedata["monthly_percentages"]);
      let datareal = [];
      labels.forEach((item) => {
        datareal.push(attendancedata["monthly_percentages"][item]);
      });

      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: datareal,
            borderColor: "rgba(255, 0, 0, 1)", // Dark red line color
            backgroundColor: "rgba(255, 0, 0, 0.2)", // Light red background color
            tension: 0.4, // Adjust tension for wavy effect
          },
        ],
      };
      setDatasets(data);
    }
  }, [attendancedata]);

  return (
    <div>
      <div
        className="line_chart_container border rounded-2 p-4 ms-xxl-5 my-3 my-xxl-0 my-xl-0 my-lg-0 my-md-0"
        style={{ width: "600px" }}
      >
        <div className="chart-titles">
          <h1 className="medium_font font_size_16">Attendance</h1>
          <h2 className="medium_font font_size_32">
            {attendancedata?.["overall_average_percentage"]}%
          </h2>
          {/* <p className='font_size_16 text_muted'>Jan - Mar</p> */}
        </div>
        {datasets["labels"]?.length > 0 && (
          <Line options={options} data={datasets} />
        )}
      </div>
    </div>
  );
};

export default AreaChart;
