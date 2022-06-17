import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "src/store";
import { Container, Table } from "react-bootstrap";
import classes from "./styles.module.css";

type ParamsType = {
  id: string;
};

const SchoolItemView = () => {
  const { id } = useParams<ParamsType>();
  const navigate = useNavigate();
  const rawData = useSelector((state) => state.data.data);
  const selectedItem = rawData.find((item) => item.id === id);

  function handleBack() {
    navigate(-1);
  }

  function renderSelectedItem(): JSX.Element | undefined {
    if (!selectedItem) return;
    return (
      <>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>item</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>{selectedItem.id}</td>
              </tr>
              <tr>
                <td>country</td>
                <td>{selectedItem.country}</td>
              </tr>
              <tr>
                <td>camp</td>
                <td>{selectedItem.camp}</td>
              </tr>
              <tr>
                <td>school</td>
                <td>{selectedItem.school}</td>
              </tr>
              <tr>
                <td>month</td>
                <td>{selectedItem.month}</td>
              </tr>
              <tr>
                <td>lesson</td>
                <td>{selectedItem.lessons}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
        <button onClick={handleBack}>Go back</button>
      </>
    );
  }

  return <div className={classes.root}>{renderSelectedItem()}</div>;
};

export default SchoolItemView;
