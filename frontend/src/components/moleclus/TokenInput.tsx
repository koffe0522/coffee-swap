import InputAdornment from "@mui/material/InputAdornment";

import Image from "components/atoms/Image";
import NumberField from "components/atoms/NumberField";
import React from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

interface Props {
  symbol: string;
  src: string;
  balance: number;
  value?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const TokenInput = (props: Props) => {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="overline" component="p">
          {props.symbol.toUpperCase()}
        </Typography>
        <Typography variant="body2" component="p">
          balance: {props.balance.toLocaleString()}
        </Typography>
      </Grid>
      <NumberField
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
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default React.memo(TokenInput);
