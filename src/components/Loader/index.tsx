import { Spinner } from "react-bootstrap";
import classes from "./style.module.css";
const Loader = () => {
  return (
    <div className={classes.loaderContainer} data-testid="loader">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
