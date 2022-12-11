import { style } from "@mui/system";
import { useState, useEffect } from "react";
import { bossingActions } from "../../store/bossing";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./Bossing.module.css";

const BossingMain = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const dispatch = useAppDispatch();
  const charactersCurrentPage = useAppSelector(
    (state) => state.bossing.charactersCurrentPage
  );
  const bossingCurrentPage = useAppSelector(
    (state) => state.bossing.bossingCurrentPage
  );
  const [checkboxCards, setCheckboxCards] = useState<any>();

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    if (bossingCurrentPage.length > 0) {
      const allCheckboxes = bossingCurrentPage.map((element) => {
        // Map out checkboxes based on bossing list
        let checkboxes;
        if (element.bossing_list) {
          checkboxes = element.bossing_list.split("@").map((element) => {
            return <div>{element}</div>;
          });
        }

        // Wrap the checkboxes in a div
        return <div className={styles.checkbox_ctn}>{checkboxes}</div>;
      });

      setCheckboxCards(allCheckboxes);
    }
  }, [bossingCurrentPage]);

  // ======
  // Return
  // ======
  return (
    <div className={styles.main_ctn}>
      <div className={styles.main_left_ctn}>Boss Names</div>
      <div className={styles.main_right_ctn}>
        {/* <div>
          <div>Checkbox 1</div>
          <div>Checkbox 2</div>
          <div>Checkbox 3</div>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div> */}
        {checkboxCards && checkboxCards}
      </div>
    </div>
  );
};

export default BossingMain;
