import { ChangeEvent, FC } from "react";
import classes from "./styles.module.css";

interface DropDownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChangeSelectedValue?: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const DropDown: FC<DropDownProps> = ({ label, options, selectedValue, onChangeSelectedValue }) => {
  function renderSelectItems(): JSX.Element[] {
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  }
  return (
    <div>
      <label className={classes.label}>{label}</label>
      <select id={label} className={classes.select} value={selectedValue} onChange={onChangeSelectedValue}>
        {renderSelectItems()}
      </select>
    </div>
  );
};

export default DropDown;
