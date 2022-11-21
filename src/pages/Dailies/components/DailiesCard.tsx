import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Dailies } from "../../../types/types";

interface DailiesCardProps {
  dailies: Dailies;
  name: string;
  handleDailiesChange: () => void;
}

const DailiesCard: React.FC<DailiesCardProps> = (props) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={props.handleDailiesChange}
            checked={props.dailies[props.name]}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default DailiesCard;
