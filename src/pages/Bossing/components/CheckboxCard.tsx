import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import styles from "../Bossing.module.css";

interface CheckboxCardProps {
  boss: string;
  index: number;
}

const CheckboxCard: React.FC<CheckboxCardProps> = (props) => {
  //   <FormControlLabel
  //     control={
  //       <Checkbox
  //         onChange={props.handleDailiesChange}
  //         checked={props.dailies[props.name]}
  //         id={props.name}
  //       />
  //     }
  //     label={props.name}
  //   />;

  return <div>{props.boss}</div>;
};

export default CheckboxCard;
