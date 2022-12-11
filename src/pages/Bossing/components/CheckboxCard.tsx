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
      if (props.bossing_done) {
        arrBossingDone = props.bossing_done.split("@");
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
        bossing_done = arrBossingDone.join("@");
      }

      const res = await fetch(`${url}/bossing/update`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          uuid: props.uuid,
          bossing_done: bossing_done,
        }),
      });
      const response: DefaultRes = await res.json();

      if (res.ok) {
        console.log("ok");
      }
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
            //   id={props.name}
          />
        }
        label={props.boss}
      />
      <p>{props.uuid}</p>
    </div>
  );
};

export default CheckboxCard;
