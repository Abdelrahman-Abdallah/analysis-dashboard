import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SchoolItemView from "./Pages/SchoolItemView";
import DarkTheme from "./components/DarkTheme";
import { useSelector } from "./store";
import { useCallback, useEffect } from "react";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkTheme);

  const setDark = useCallback(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);
  const setLight = useCallback(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    isDarkMode ? setDark() : setLight();
  }, [isDarkMode, setDark, setLight]);
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
