import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Dailies } from "../../../types/types";

interface UrsusTourCardProps {
  ursusTour: Dailies;
  name: string;
  handleUrsusTourChange: () => void;
}

const UrsusTourCard: React.FC<UrsusTourCardProps> = (props) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={props.handleUrsusTourChange}
            checked={props.ursusTour[props.name]}
            id={props.name}
          />
        }
        label={props.name}
      />
    </div>
  );
};

export default UrsusTourCard;
