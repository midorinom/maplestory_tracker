import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { FormControlLabel, Checkbox } from "@mui/material";
import styles from "../Bossing.module.css";

interface CheckboxCardProps {
  boss: string;
  index: number;
  checked: boolean;
}

const CheckboxCard: React.FC<CheckboxCardProps> = (props) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            //   onChange={props.handleDailiesChange}
            checked={props.checked}
            //   id={props.name}
          />
        }
        label={props.boss}
      />
    </div>
  );
};

export default CheckboxCard;
