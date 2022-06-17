import { toggleTheme } from "src/slices/theme";
import { useDispatch, useSelector } from "src/store";
import "./style.css";

const DarkTheme = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  function handleChangeMode(): void {
    dispatch(toggleTheme());
  }
  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" data-testid="darkModeToggle" onChange={handleChangeMode} defaultChecked={isDarkTheme} />
        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default DarkTheme;
