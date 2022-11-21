import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Dailies } from "../../../types/types";

interface WeekliesCardProps {
  weeklies: Dailies;
  name: string;
  handleWeekliesChange: (e: any) => void;
}

const WeekliesCard: React.FC<WeekliesCardProps> = (props) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={props.handleWeekliesChange}
            checked={props.weeklies[props.name]}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default WeekliesCard;
