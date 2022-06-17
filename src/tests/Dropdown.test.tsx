import { render, screen } from "@testing-library/react";
import DropDown from "src/components/Dropdown";

it("should render drop down without being crashed", () => {
  const countries = ["egypt", "germany", "USA", "KSA"];
  render(<DropDown label="Select Country" options={countries} selectedValue={countries[0]} onChangeSelectedValue={jest.fn()} />);
  const element = screen.getByTestId("mainLabel");
  expect(element).toBeInTheDocument();
});
