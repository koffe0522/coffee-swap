import { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import Layout from "layouts/Default";
import SwapCard from "components/organisms/SwapCard";

import { useMetaMesk } from "hooks/MetaMask/useMetaMask";

export default function SwapPage() {
  const { account, balance, getBalance, tokenBalance, getBalanceOf } =
    useMetaMesk({
      chainId: process.env.REACT_APP_CHAIN_ID,
      tokenAddress: process.env.REACT_APP_TOKEN_ADDRESS,
    });
  const [tokenRate, setTokenRate] = useState(0);

  const handleBuyToken = (from: number, to: number) => {

  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth"
    )
      .then((res) => res.json())
      .then((res) => {
        setTokenRate(res["dai"]["eth"] || 0);
      });

    if (!account) {
      return;
    }

    getBalance();
    getBalanceOf(process.env.REACT_APP_TOKEN_ADDRESS || "");
  }, [account]);

  return (
    <Layout>
      <Container component="main" maxWidth={false}>
        <Container maxWidth="sm">
          <SwapCard
            toInputData={{ balance: tokenBalance }}
            fromInputData={{ balance: balance, tokenRate: tokenRate }}
            buyToken={handleBuyToken}
          />
        </Container>
      </Container>
    </Layout>
  );
}
