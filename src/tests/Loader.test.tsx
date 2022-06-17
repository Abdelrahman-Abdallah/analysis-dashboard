import { render, screen } from "@testing-library/react";
import Loader from "src/components/Loader";

it("should render Loader", () => {
  render(<Loader />);
  const element = screen.getByTestId("loader");
  expect(element).toBeInTheDocument();
});
