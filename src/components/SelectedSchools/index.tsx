import { FC } from "react";
import { TableBaseDataSet } from "src/utils/helpers";
import Header from "../Header/Header";
import classes from "./styles.module.css";

interface SelectedSchoolsProps {
  info: TableBaseDataSet[];
  hiddenSchools: string[];
  onCheckSchool: (id: string) => void;
  numberOfLessons: number;
  campName: string;
}
const SelectedSchools: FC<SelectedSchoolsProps> = ({ info, onCheckSchool, hiddenSchools, numberOfLessons, campName }) => {
  const title = `${numberOfLessons} lessons`;

  function handleItemClick(id: string) {
    return function () {
      onCheckSchool(id);
    };
  }

  function renderSelectedSchools(): JSX.Element[] {
    return info.map((item) => {
      const lessons = item.data.reduce((acc, value) => acc + value, 0);
      const isChecked = !hiddenSchools.includes(item.id) ? true : false;
      const color = hiddenSchools.includes(item.id) ? "#DDD" : item.borderColor;
      return (
        <div key={item.id} className={classes.schoolItem} onClick={handleItemClick(item.id)} style={{ color: color }}>
          <input type="checkbox" defaultChecked={isChecked} className={classes.checkbox} style={{ backgroundColor: color }} />
          <div className={classes.schoolContent}>
            <span>
              <span className={classes.bold}>{lessons}</span> lessons
            </span>
            <span className={classes.schoolName}>in {item.id}</span>
          </div>
        </div>
      );
    });
  }
  return (
    <div className={classes.schoolContainer}>
      <Header data-testid="school-lessons-count" isSubtitle title={title} />
      <Header isSubtitle title={`in ${campName}`} />
      <div>{renderSelectedSchools()}</div>
    </div>
  );
};

export default SelectedSchools;
