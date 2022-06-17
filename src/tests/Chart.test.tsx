import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import ChartView from "src/components/ChartView";
import { addData, fetchChartData } from "src/slices/Data";
import { store } from "src/store";
import { BaseData } from "src/types/common";

const data: BaseData[] = [{ id: "ddfdfd", month: "May", camp: "omaka", school: "suze", country: "egypt", lessons: 10 }];

beforeAll(() => {
  store.dispatch(addData({ data, selectedCountry: "egypt", selectedSchool: "suze", selectedCamp: "omaka" }));
});

it("should render Chart without crash", () => {
  const history = createMemoryHistory();
  history.push("/");
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <ChartView />
      </Router>
    </Provider>
  );

  const element = screen.getByTestId("chart-data");
  expect(element).toBeInTheDocument();
});
