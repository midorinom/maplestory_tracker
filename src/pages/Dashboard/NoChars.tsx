import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Button } from "@mui/material";

const NoChars = () => {
  return (
    <div className={styles.no_chars_parent_ctn}>
      <div className={styles.no_chars_main_ctn}>
        <h1>You do not have any characters</h1>
        <Button
          component={Link}
          to={"/add-characters"}
          className={styles.no_chars_btn}
          size="large"
          variant="contained"
          color="info"
        >
          Add Characters
        </Button>
      </div>
    </div>
  );
};

export default NoChars;
