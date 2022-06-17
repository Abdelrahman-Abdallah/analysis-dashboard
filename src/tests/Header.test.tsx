import Header from "src/components/Header/Header";
import { render, screen } from "@testing-library/react";

it("should render Header", () => {
  render(<Header title="Analytics-dashboard" />);
  const element = screen.getByText(/Analytics-dashboard/);
  expect(element).toBeInTheDocument();
});
