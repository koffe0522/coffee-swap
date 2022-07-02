import InputAdornment from "@mui/material/InputAdornment";

import Image from "components/atoms/Image";
import NumberField from "components/atoms/NumberField";
import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, TextFieldProps } from "@mui/material";

type Props = {
  symbol: string;
  src: string;
  balance: number;
  value?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
} & TextFieldProps

const TokenInput = ({ symbol, src, balance, value, onChange, ...other }: Props) => {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="overline" component="p">
          {symbol.toUpperCase()}
        </Typography>
        <Typography variant="body2" component="p">
          balance: {balance.toLocaleString()}
        </Typography>
      </Grid>
      <NumberField
        {...other}
        startAdornment={
          <InputAdornment position="start">
            <Image
              src={src}
              alt="logo"
              loading="lazy"
              sx={{ display: { md: "flex" }, width: 12 }}
            />
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default React.memo(TokenInput);
