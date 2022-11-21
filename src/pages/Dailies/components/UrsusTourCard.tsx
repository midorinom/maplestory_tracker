import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const UrsusTourCard = (props: any) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={props.handleUrsusTourChange}
            // checked={true}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default UrsusTourCard;
