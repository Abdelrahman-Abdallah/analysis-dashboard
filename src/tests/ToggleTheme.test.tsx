import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import DarkTheme from "src/components/DarkTheme";
import { toggleTheme } from "src/slices/theme";
import { store } from "src/store";

beforeAll(() => {
  store.dispatch(toggleTheme());
});

it("should toggle dark theme", () => {
  render(
    <Provider store={store}>
      <DarkTheme />
    </Provider>
  );
  expect(store.getState().theme.isDarkTheme).toEqual(true);
});
