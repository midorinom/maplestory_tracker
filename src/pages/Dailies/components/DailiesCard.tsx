import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const DailiesCard = (props: any) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={props.handleDailiesChange}
            checked={props.dailies.dailies_done.split("@").includes(props.name)}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default DailiesCard;
