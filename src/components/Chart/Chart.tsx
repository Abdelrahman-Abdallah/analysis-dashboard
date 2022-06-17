import { useRef } from "react";
import { getElementAtEvent, Line } from "react-chartjs-2";
import { MONTHS } from "src/constants";
import { useSelector } from "src/store";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const chartRef = useRef(null);

  const { baseSchoolData, chartInfo: info } = useSelector((state) => state.data);

  const handleChartClick = (event) => {
    const value = getElementAtEvent(chartRef.current, event)[0];
    if (!value) return;
    const { index, datasetIndex } = value;
    const [id] = baseSchoolData[datasetIndex].months[index].split("/");

    if (id === "404") alert("No data availble");
  };

  const options: ChartOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333",
          boxWidth: 10,
          boxHeight: 10,
          padding: 50,
        },
      },
    },
  };

  return <div>{info.length > 0 && <Line ref={chartRef} data={{ labels: MONTHS, datasets: info }} onClick={handleChartClick} options={options} />}</div>;
};

export default Chart;
