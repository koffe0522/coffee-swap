import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TokenInput from "components/moleclus/TokenInput";
import React from "react";

const SwapCard = () => {
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
                id="swap-from"
              />

              <Box textAlign="center">
                <IconButton color="primary">
                  <ArrowDownwardIcon />
                </IconButton>
              </Box>
              <TokenInput
                symbol="MOCHA"
                src={`${process.env.PUBLIC_URL}/mocha-logo.svg`}
                id="swap-to"
              />

              <Box mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
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
