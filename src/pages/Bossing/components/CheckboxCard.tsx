import React from "react";
import styles from "../Bossing.module.css";

interface CheckboxCardProps {
  checkboxes: any;
}

const CheckboxCard: React.FC<CheckboxCardProps> = (props) => {
  //     <FormControlLabel
  //   control={
  //     <Checkbox
  //       onChange={props.handleDailiesChange}
  //       checked={props.dailies[props.name]}
  //       id={props.name}
  //     />
  //   }
  //   label={props.name}
  // />;

  return <div className={styles.checkbox_ctn}>{props.checkboxes}</div>;
};

export default CheckboxCard;
