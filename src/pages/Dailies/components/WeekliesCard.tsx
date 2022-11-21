import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const WeekliesCard = (props: any) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={props.handleWeekliesChange}
            // checked={props.dailies}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default WeekliesCard;
