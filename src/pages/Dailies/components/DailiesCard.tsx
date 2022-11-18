import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const DailiesCard = (props: any) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={
              props.name === "Ursus" || props.name === "Maple Tour"
                ? props.handleUrsusTourChange
                : props.handleDailiesChange
            }
            checked={props.dailies}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default DailiesCard;
