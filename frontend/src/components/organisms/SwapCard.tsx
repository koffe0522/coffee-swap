import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TokenInput from "components/moleclus/TokenInput";
import React, { useState } from "react";

interface Props {
  toInputData: {
    balance: number;
  };
  fromInputData: {
    balance: number;
    tokenRate: number;
  };
  buyToken?: (form: number, to: number) => void;
}

const SwapCard = (props: Props) => {
  const [inputToken, setInputToken] = useState(0.0);
  const [outputToken, setOutputToken] = useState(0.0);

  const handleBuyToken = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.buyToken) {
      props.buyToken(inputToken, outputToken);
    }
  };

  const handleInputToken = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputToken(Number(event.target.value));
    setOutputToken(Number(event.target.value) / props.fromInputData.tokenRate);
  };

  const handleOutputToken = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputToken(Number(event.target.value) * props.fromInputData.tokenRate);
    setOutputToken(Number(event.target.value));
  };

  return (
    <CardContent>
      <Card
        variant="outlined"
        sx={{
          p: { xs: 4, md: 8 },
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid
            lg={12}
            sm={12}
            justifyContent="center"
            alignItems="center"
            item
            container
          >
            <Box
              component="form"
              autoComplete="off"
              width="80%"
              sx={{
                width: { xs: "100%", md: "80%" },
              }}
            >
              <TokenInput
                symbol="ETH"
                src={`${process.env.PUBLIC_URL}/ethereum-eth-logo.svg`}
                balance={props.fromInputData.balance}
                onChange={handleInputToken}
                value={inputToken}
              />

              <Box textAlign="center">
                <IconButton color="primary">
                  <ArrowDownwardIcon />
                </IconButton>
              </Box>
              <TokenInput
                symbol="MOCHA"
                src={`${process.env.PUBLIC_URL}/mocha-logo.svg`}
                balance={props.toInputData.balance}
                onChange={handleOutputToken}
                value={outputToken}
              />

              <Box mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleBuyToken}
                >
                  SWAP
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </CardContent>
  );
};

export default React.memo(SwapCard);
