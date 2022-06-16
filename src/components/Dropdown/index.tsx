import React, { FC } from "react";
import classes from "./styles.module.css";

interface DropDownProps {
  label: string;
  options: string[];
}
const DropDown: FC<DropDownProps> = ({ label, options }) => {
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
      <select id={label} className={classes.select}>
        {renderSelectItems()}
      </select>
    </div>
  );
};

export default DropDown;
