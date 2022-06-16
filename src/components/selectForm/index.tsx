import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DropDown from "../Dropdown";

const SelectForm = () => {
  return (
    <Container className="mt-100">
      <Row>
        <Col>
          <DropDown label="item1" options={["1", "2", "3"]} />
        </Col>
        <Col>
          <DropDown label="item1" options={["1", "2", "3"]} />
        </Col>
        <Col>
          <DropDown label="item1" options={["1", "2", "3"]} />
        </Col>
      </Row>
    </Container>
  );
};

export default SelectForm;
