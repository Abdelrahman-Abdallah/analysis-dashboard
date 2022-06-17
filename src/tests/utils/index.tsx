import { render as rtlrender } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "src/store";

// export const renderFun = (Component) =>
//   ReactTestingRender(
//     <Provider store={store}>
//       <Component />
//     </Provider>
//   );

interface HocProps {
  children: ReactNode;
}

const AllTheProviders: FC<HocProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options) => rtlrender(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as renderFunc };
