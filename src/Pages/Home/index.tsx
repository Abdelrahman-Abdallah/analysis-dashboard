import React, { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import SelectForm from "../../components/selectForm";
import { fetchChartData } from "../../slices/Data";
import { useDispatch, useSelector } from "../../store";

const Home: FC = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  return (
    <Container>
      <Header title="Analysis Chart" />
      <Header title="Number of Lessons" isSubtitle />
      <SelectForm />
      {data.length === 0 && <h1>Loading...</h1>}
    </Container>
  );
};

export default Home;
