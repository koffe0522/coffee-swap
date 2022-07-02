import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LoopIcon from '@mui/icons-material/Loop';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TokenInput from "components/moleclus/TokenInput";
import React, { useState } from "react";

type TokenInfo = {
  balance: number;
  rate: number;
  symbol: string;
  src: string;
  input: number
}
interface Props {
  toTokenData: TokenInfo
  fromTokenData: TokenInfo
  onClickBuyToken?: () => void;
  onClickSwap?: () => void;
  onChangeToInput?: (value: number) => void
  onChangeFromInput?: (value: number) => void
}

const TARGET_INPUT = {
  TO: 1,
  FROM: 2
}

const SwapCard = (props: Props) => {
  const [targetInput, setTargetInput] = useState<typeof TARGET_INPUT[keyof typeof TARGET_INPUT]>(1);
  const [hovered, setHovered] = useState(false)

  const handleBuyToken = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.onClickBuyToken) {
      props.onClickBuyToken();
    }
  };

  const handleInputToken = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (targetInput === TARGET_INPUT.TO) {
      return
    }

    if (props.onChangeFromInput) {
      props.onChangeFromInput(Number(event.target.value))
    }
  };

  const handleOutputToken = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (targetInput === TARGET_INPUT.FROM) {
      return
    }

    if (props.onChangeToInput) {
      props.onChangeToInput(Number(event.target.value))
    }
  };

  const handleFocusInput = () => {
    setTargetInput(TARGET_INPUT.FROM)
  }

  const handleFocusOutput = () => {
    setTargetInput(TARGET_INPUT.TO)
  }

  const handleClickSwapInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.onClickSwap) {
      props.onClickSwap();
    }
  }

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
                symbol={props.fromTokenData.symbol}
                src={props.fromTokenData.src}
                balance={props.fromTokenData.balance}
                onChange={handleInputToken}
                value={props.fromTokenData.input}
                onFocus={handleFocusInput}
              />

              <Box textAlign="center">
                <IconButton
                  color="primary"
                  onMouseEnter={() => {
                    setHovered(true);
                  }}
                  onMouseLeave={() => {
                    setHovered(false);
                  }}
                  onClick={handleClickSwapInput}
                >
                  {
                    hovered ? <LoopIcon /> : <ArrowDownwardIcon />
                  }
                </IconButton>
              </Box>
              <TokenInput
                symbol={props.toTokenData.symbol}
                src={props.toTokenData.src}
                balance={props.toTokenData.balance}
                onChange={handleOutputToken}
                value={props.toTokenData.input}
                onFocus={handleFocusOutput}
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
