import { ChangeEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { setSelectedCountry, setSelectedCamp, setSelectedSchool } from "src/slices/Data";
import { getCurrentlySelectedItems } from "src/utils/helpers";
// import { selectCamp, selectCountry, selectSchoolName } from "../../slices/Data";
import { useDispatch, useSelector } from "../../store";
import DropDown from "../Dropdown";

const SelectForm = () => {
  const dispatch = useDispatch();

  const { selectedSchool, selectedCamp, selectedCountry, data } = useSelector((state) => state.data);

  const { camps, schools, selectedSchool: modifiedSchool } = getCurrentlySelectedItems(selectedCountry, selectedCamp, selectedSchool, data);

  const countries = [...new Set(data.map((data) => data.country))];

  if (selectedSchool !== modifiedSchool) {
    dispatch(setSelectedSchool(modifiedSchool));
  }

  function handleChangCountry(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(setSelectedCountry(value));
  }
  function handleChangeCamp(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(setSelectedCamp(value));
  }
  function handleChangeSchool(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(setSelectedSchool(value));
  }

  return (
    <Container className="mt-100">
      <Row>
        <Col>
          <DropDown label="Select Country" options={countries} selectedValue={selectedCountry} onChangeSelectedValue={handleChangCountry} />
        </Col>
        <Col>
          <DropDown label="Select Camp" options={camps} selectedValue={selectedCamp} onChangeSelectedValue={handleChangeCamp} />
        </Col>
        <Col>
          <DropDown label="Select School" options={schools} selectedValue={modifiedSchool} onChangeSelectedValue={handleChangeSchool} />
        </Col>
      </Row>
    </Container>
  );
};

export default SelectForm;
