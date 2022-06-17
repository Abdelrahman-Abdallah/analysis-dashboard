import { useRef } from "react";
import { getElementAtEvent, Line } from "react-chartjs-2";
import { MONTHS } from "src/constants";
import { useDispatch, useSelector } from "src/store";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import SelectedSchools from "../SelectedSchools";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./styles.module.css";
import { handleGenerateChartData } from "src/utils/helpers";
import { setHiddenSchools } from "src/slices/Data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const { selectedCamp, selectedCountry, selectedSchool, data, hiddenSchools } = useSelector((state) => state.data);

  const { baseSchoolData, chartData: info } = handleGenerateChartData(selectedCountry, selectedCamp, selectedSchool, data);

  const title = baseSchoolData[0].campName;
  const numberOfLessons = baseSchoolData.reduce((acc, data) => acc + data.totalLessons, 0);
  const fileredChartInfo = info.filter((item) => !hiddenSchools.includes(item.id));
  const filterdBasicSchoolData = baseSchoolData.filter((item) => !hiddenSchools.includes(item.schoolName));

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
    const updatedSchools = hiddenSchools.includes(schoolId) ? hiddenSchools.filter((id) => id !== schoolId) : [...hiddenSchools, schoolId];
    dispatch(setHiddenSchools(updatedSchools));
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
    },
  };

  return (
    <div className={classes.root} data-testid="chart-data">
      <Container fluid>
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
            <SelectedSchools info={info} hiddenSchools={hiddenSchools} onCheckSchool={handleCheckSchool} numberOfLessons={numberOfLessons} campName={title} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChartView;
