import React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

import TextField, {
  BaseTextFieldProps,
  TextFieldProps,
} from "@mui/material/TextField";

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

type Props = TextFieldProps & {
  startAdornment?: React.ReactNode;
};

const NumberField = ({ id, startAdornment, value, onChange }: Props) => {
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
      onChange={(v) => {
        if (onChange) {
          onChange(v);
        }
      }}
      value={value}
    />
  );
};

export default NumberField;
