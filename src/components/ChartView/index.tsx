import { useRef } from "react";
import { getElementAtEvent, Line } from "react-chartjs-2";
import { MONTHS } from "src/constants";
import { useDispatch, useSelector } from "src/store";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import SelectedSchools from "../SelectedSchools";
import { toggleHiddenSchool } from "src/slices/Data";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const { baseSchoolData, chartInfo: info, hiddenChartSchools } = useSelector((state) => state.data);
  const title = baseSchoolData[0].campName;
  const numberOfLessons = baseSchoolData.reduce((acc, data) => acc + data.totalLessons, 0);
  const fileredChartInfo = info.filter((item) => !hiddenChartSchools.includes(item.id));
  console.log("🚀 ~ file: index.tsx ~ line 22 ~ ChartView ~ fileredChartInfo", fileredChartInfo);
  const filterdBasicSchoolData = baseSchoolData.filter((item) => !hiddenChartSchools.includes(item.schoolName));

  const onClick = (event) => {
    const value = getElementAtEvent(chartRef.current, event)[0];
    if (!value) return;
    const { index, datasetIndex } = value;
    const [id] = filterdBasicSchoolData[datasetIndex].months[index].split("/");

    if (id === "404") {
      alert("No data availble");
      return;
    }
    navigate("/item/" + id);
  };

  function handleCheckSchool(schoolId: string): void {
    dispatch(toggleHiddenSchool(schoolId));
  }

  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
        position: "right",
        labels: {
          color: "#333",
          boxWidth: 10,
          boxHeight: 10,
          padding: 50,
        },
      },

      title: {
        display: false,
        text: `${title}, Number of lessons ${numberOfLessons}`,
        color: "#2fa1d9",
      },
    },
  };

  return (
    <div>
      {info.length > 0 && (
        <Container className="mt-8">
          <Row>
            <Col xs={10}>
              <Line
                ref={chartRef}
                data={{
                  labels: MONTHS,
                  datasets: fileredChartInfo,
                }}
                onClick={onClick}
                options={options}
              />
            </Col>
            <Col xs={2}>
              <SelectedSchools info={info} selectedSchools={hiddenChartSchools} onCheckSchool={handleCheckSchool} numberOfLessons={numberOfLessons} campName={title} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ChartView;
