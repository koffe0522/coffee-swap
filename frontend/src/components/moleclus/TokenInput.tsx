import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import Image from "components/atoms/Image";
import NumberField from "components/atoms/NumberField";
import React from "react";

interface Props {
  symbol: string;
  src: string;
  id: string;
}

const TokenInput = (props: Props) => {
  return (
    <>
      <InputLabel shrink htmlFor={props.id}>
        {props.symbol.toUpperCase()}
      </InputLabel>
      <NumberField
        id={props.id}
        startAdornment={
          <InputAdornment position="start">
            <Image
              src={props.src}
              alt="logo"
              loading="lazy"
              sx={{ display: { md: "flex" }, width: 12 }}
            />
          </InputAdornment>
        }
      />
    </>
  );
};

export default React.memo(TokenInput);
