import { Spinner } from "react-bootstrap";
import classes from "./style.module.css";
const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
