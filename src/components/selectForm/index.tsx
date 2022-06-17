import { ChangeEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { selectCamp, selectCountry, selectSchoolName } from "../../slices/Data";
import { useDispatch, useSelector } from "../../store";
import DropDown from "../Dropdown";

const SelectForm = () => {
  const dispatch = useDispatch();

  const { countries, camps, schools, selectedSchool: selectSchool, selectedCamp, selectedCountry } = useSelector((state) => state.data);

  function handleChangCountry(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(selectCountry(value));
  }
  function handleChangeCamp(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(selectCamp(value));
  }
  function handleChangeSchool(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(selectSchoolName(value));
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
          <DropDown label="Select School" options={schools} selectedValue={selectSchool} onChangeSelectedValue={handleChangeSchool} />
        </Col>
      </Row>
    </Container>
  );
};

export default SelectForm;
