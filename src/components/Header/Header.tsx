import { FC } from "react";
import concateClasses from "../../utils/concatClasses";
import classes from "./styles.module.css";

interface HeaderProps {
  title: string;
  isSubtitle?: boolean;
}
const Header: FC<HeaderProps> = ({ title, isSubtitle = false }) => {
  const subtitle = isSubtitle ? classes.subtitle : "";
  return (
    <div>
      <h1 className={concateClasses(classes.heading, subtitle)}>{title}</h1>
    </div>
  );
};

export default Header;
