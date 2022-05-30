import React from "react";
import NumberFormat from "react-number-format";

import TextField, { BaseTextFieldProps } from "@mui/material/TextField";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat<unknown>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
  }
);

interface Props extends BaseTextFieldProps {
  startAdornment?: React.ReactNode;
}

const NumberField = ({ id, startAdornment }: Props) => {
  return (
    <TextField
      id={id}
      variant="outlined"
      fullWidth
      name="numberformat"
      InputProps={{
        startAdornment,
        inputComponent: NumberFormatCustom as any,
      }}
    />
  );
};

export default NumberField;
