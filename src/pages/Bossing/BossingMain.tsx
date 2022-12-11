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

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getBosses();
  }, [bossingCurrentPage]);

  useEffect(() => {
    if (bossingCurrentPage.length > 0) {
      // Set the Checkbox Cards
      const allCheckboxes = bossingCurrentPage.map((element, index) => {
        // Map out checkboxes based on bossing list
        let checkboxes;
        if (element.bossing_list) {
          const bossingList = element.bossing_list.split("@");

          checkboxes = bossingList.map((bossName) => {
            let checked = false;
            if (element.bossing_done) {
              if (element.bossing_done.includes(bossName)) {
                checked = true;
              }
            }

            let crystal: bigint = BigInt(0);
            const boss = bosses.find((element) => element.name === bossName);
            if (boss) {
              crystal = boss.crystal;
            }
            console.log("crystal", crystal);

            return (
              <CheckboxCard
                boss={bossName}
                crystal={crystal}
                index={index}
                checked={checked}
                bossing_done={element.bossing_done}
                uuid={element.uuid}
                key={Math.random()}
              />
            );
          });
        }

        // Wrap the checkboxes in a div
        return (
          <div className={styles.checkbox_ctn} key={Math.random()}>
            {checkboxes}
          </div>
        );
      });

      setCheckboxCards(allCheckboxes);
    }
  }, [bosses]);

  // ===============
  // Fetch Functions
  // ===============
  const getBosses = async () => {
    try {
      const res = await fetch(`${url}/bosses/get`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          role: userData.role,
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
      <div className={styles.main_right_ctn}>
        {checkboxCards && checkboxCards}
      </div>
    </div>
  );
};

export default BossingMain;
