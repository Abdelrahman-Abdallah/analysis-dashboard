import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SchoolItemView from "./Pages/SchoolItemView";
import DarkTheme from "./components/DarkTheme";
import { useDispatch, useSelector } from "./store";
import { useCallback, useEffect } from "react";
import { fetchChartData } from "./slices/Data";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();

  const setDark = useCallback(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);
  const setLight = useCallback(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    isDarkMode ? setDark() : setLight();
  }, [isDarkMode, setDark, setLight]);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  return (
    <div data-testid="App">
      <Routes>
        <Route path="/item/:id" element={<SchoolItemView />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <DarkTheme />
    </div>
  );
}

export default App;
