import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Dailies } from "../../../types/types";

interface UrsusTourCardProps {
  ursusTour: Dailies;
  name: string;
  handleUrsusTourChange: (e: any) => void;
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
        label={props.name === "ursus" ? "Ursus" : "Maple Tour"}
      />
    </div>
  );
};

export default UrsusTourCard;
