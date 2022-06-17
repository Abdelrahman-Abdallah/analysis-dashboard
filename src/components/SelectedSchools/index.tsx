import { FC } from "react";
import { TableBaseDataSet } from "src/utils/helpers";
import Header from "../Header/Header";

interface SelectedSchoolsProps {
  info: TableBaseDataSet[];
  selectedSchools: string[];
  onCheckSchool: (id: string) => void;
  numberOfLessons: number;
  campName: string;
}
const SelectedSchools: FC<SelectedSchoolsProps> = ({ info, onCheckSchool, selectedSchools, numberOfLessons, campName }) => {
  const title = `${campName} have ${numberOfLessons} lessons`;
  function handleItemClick(id: string) {
    return function () {
      onCheckSchool(id);
    };
  }

  function renderSelectedSchools(): JSX.Element[] {
    return info.map((item) => (
      <div key={item.id} onClick={handleItemClick(item.id)} style={{ color: selectedSchools.includes(item.id) ? "#DDD" : item.borderColor }}>
        <h6>{item.id}</h6>
        <p>{item.data.reduce((acc, value) => acc + value, 0)}</p>
      </div>
    ));
  }
  return (
    <div>
      <Header isSubtitle title={title} />
      {renderSelectedSchools()}
    </div>
  );
};

export default SelectedSchools;
