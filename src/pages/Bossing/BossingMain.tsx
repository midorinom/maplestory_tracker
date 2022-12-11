import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { Bosses, GetBossesRes } from "../../types/types";
import styles from "./Bossing.module.css";
import CheckboxCard from "./components/CheckboxCard";

const BossingMain = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const bossingCurrentPage = useAppSelector(
    (state) => state.bossing.bossingCurrentPage
  );
  const userData = useAppSelector((state) => state.user.userData);
  const [checkboxCards, setCheckboxCards] = useState<any>();
  const [bosses, setBosses] = useState<Bosses[]>([]);
  const [bossCards, setBossCards] = useState<any>();

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    if (bossingCurrentPage.length > 0) {
      let longestList: string[] = [];

      // Set the Checkbox Cards
      const allCheckboxes = bossingCurrentPage.map((element) => {
        // Map out checkboxes based on bossing list
        let checkboxes;
        if (element.bossing_list) {
          const bossingList = element.bossing_list.split("@");
          // Update longestList if appropriate
          if (bossingList.length > longestList.length) {
            longestList = [...bossingList];
          }

          checkboxes = bossingList.map((element) => {
            return <div>{element}</div>;
          });
        }

        // Wrap the checkboxes in a div
        return <CheckboxCard checkboxes={checkboxes} />;
      });

      setCheckboxCards(allCheckboxes);

      // Fetch Bosses
      if (longestList.length > 0) {
        getBosses(longestList.length);
      }
    }
  }, [bossingCurrentPage]);

  useEffect(() => {
    if (bosses.length > 0) {
      const allBossCards = bosses.map((element) => {
        return (
          <div className={styles.boss_card_ctn}>
            <div>{element.crystal}</div>
            <div>{element.name}</div>
          </div>
        );
      });

      setBossCards(allBossCards);
    }
  }, [bosses]);

  // ===============
  // Fetch Functions
  // ===============
  const getBosses = async (id: number) => {
    try {
      const res = await fetch(`${url}/bosses/get`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          role: userData.role,
          id: id,
        }),
      });
      const response: GetBossesRes = await res.json();

      if (res.ok) {
        setBosses(response.bosses);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.main_ctn}>
      <div className={styles.main_left_ctn}>{bossCards && bossCards}</div>
      <div className={styles.main_right_ctn}>
        {checkboxCards && checkboxCards}
      </div>
    </div>
  );
};

export default BossingMain;
