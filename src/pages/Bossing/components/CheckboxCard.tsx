import React, { useState, useEffect } from "react";
import { DefaultRes } from "../../../types/types";
import styles from "../Bossing.module.css";
import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckboxCardProps {
  boss: string;
  index: number;
  uuid: string;
  bossing_done: string;
  checked: boolean;
}

const CheckboxCard: React.FC<CheckboxCardProps> = (props) => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const [checked, setChecked] = useState<boolean>(props.checked);
  const [initialRender, setInitialRender] = useState<boolean>(false);
  const [localBossingDone, setLocalBossingDone] = useState<string>(
    props.bossing_done
  );

  // ==============
  // Event Handlers
  // ==============
  function handleChange() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    setInitialRender(true);
  }, []);

  useEffect(() => {
    if (initialRender) {
      updateBossing();
    }
  }, [checked]);

  // ===============
  // Fetch Functions
  // ===============
  const updateBossing = async () => {
    try {
      let arrBossingDone: string[] = [];

      if (localBossingDone) {
        arrBossingDone = localBossingDone.split("@");
      }

      if (checked) {
        arrBossingDone.push(props.boss);
      } else {
        arrBossingDone = arrBossingDone.filter(
          (element) => element !== props.boss
        );
      }

      let bossing_done: string = "";
      if (arrBossingDone.length > 0) {
        if (arrBossingDone.length > 1) {
          bossing_done = arrBossingDone.join("@");
        } else {
          bossing_done = arrBossingDone[0];
        }
      }

      setLocalBossingDone(bossing_done);

      const res = await fetch(`${url}/bossing/update`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          uuid: props.uuid,
          bossing_done: bossing_done,
        }),
      });
      const response: DefaultRes = await res.json();
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleChange}
            checked={checked}
            style={{ marginLeft: "1rem" }}
          />
        }
        label={props.boss}
      />
    </div>
  );
};

export default CheckboxCard;
