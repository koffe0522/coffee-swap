import { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import { useMetaMesk } from "hooks/MetaMask/useMetaMask";
import { useDex } from "hooks/useDex";

import Layout from "layouts/Default";
import SwapCard from "components/organisms/SwapCard";

const initTokenData = {
  symbol: "",
  src: '',
  rate: 1,
  balance: 1,
  input: 0
}

export default function SwapPage() {
  const { account, balance, getBalance, tokenBalance, getBalanceOf } =
    useMetaMesk({
      chainId: process.env.REACT_APP_CHAIN_ID,
      tokenAddress: process.env.REACT_APP_TOKEN_ADDRESS,
    });
  const [tokenInputs, setTokenInputs] = useState({
    to: initTokenData,
    from: initTokenData
  });
  const { supportedTokenList, buyToken } = useDex();

  const handleBuyToken = () => {
    buyToken(process.env.REACT_APP_TOKEN_ADDRESS || "", tokenInputs.from.input, tokenInputs.to.input);
  };

  const handleSwapToken = () => {
    setTokenInputs((prev) => ({
      to: prev.from,
      from: prev.to
    }))
  }

  const handleChangeToInput = (value: number) => {
    setTokenInputs((prev) => ({
      to: {
        ...prev.to,
        input: value
      },
      from: {
        ...prev.from,
        input: (value / prev.from.rate) * prev.to.rate
      }
    }))
  }

  const handleChangeFromInput = (value: number) => {
    setTokenInputs((prev) => {
      return {
        to: {
          ...prev.to,
          input: (value * prev.from.rate) / prev.to.rate
        },
        from: {
          ...prev.from,
          input: value
        }
      }
    })
  }

  useEffect(() => {
    if (!account) {
      return;
    }

    getBalance();
    getBalanceOf(process.env.REACT_APP_TOKEN_ADDRESS || "");
  }, [account]);

  useEffect(() => {
    if (supportedTokenList.length === 0) {
      return
    }

    console.log(supportedTokenList)

    setTokenInputs({
      to: {
        ...supportedTokenList[1],
        input: 0,
        balance: tokenBalance
      },
      from: {
        ...supportedTokenList[0],
        input: 0,
        balance
      }
    })
  }, [supportedTokenList, balance, tokenBalance])

  return (
    <Layout>
      <Container component="main" maxWidth={false}>
        <Container maxWidth="sm">
          <SwapCard
            toTokenData={tokenInputs.to}
            fromTokenData={tokenInputs.from}
            onClickBuyToken={handleBuyToken}
            onClickSwap={handleSwapToken}
            onChangeToInput={handleChangeToInput}
            onChangeFromInput={handleChangeFromInput}
          />
        </Container>
      </Container>
    </Layout>
  );
}
