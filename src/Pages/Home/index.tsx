import { FC } from "react";
import { Container } from "react-bootstrap";
import ChartView from "src/components/ChartView";
import Loader from "src/components/Loader";
import Header from "../../components/Header/Header";
import SelectForm from "../../components/selectForm";
import { useSelector } from "../../store";

const Home: FC = () => {
  const data = useSelector((state) => state.data.data);

  function renderChart(): JSX.Element {
    if (data.length === 0) return <Loader />;
    return <ChartView />;
  }

  return (
    <Container>
      <Header title="Analysis Chart" />
      <Header title="Number of Lessons" isSubtitle />
      {data.length > 0 && <SelectForm />}
      {renderChart()}
    </Container>
  );
};

export default Home;
