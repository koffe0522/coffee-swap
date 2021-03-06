import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";

import Exchange from "../abi/Exchange.json";
import ERC20 from "../abi/EIP20.json";

const EXCHANGE_ADDRESS = process.env.REACT_APP_EXCHANGE_ADDRESS || "";

type TokenData = {
  rate: number;
  symbol: string;
  src: string;
}

export const useDex = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const exchangeContract = new ethers.Contract(
    EXCHANGE_ADDRESS,
    Exchange.abi,
    signer
  );

  const [supportedTokenList, setSupportedTokenList] = useState<TokenData[]>([])

  const fetchSupportToken = async () => {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth")
    if (data["dai"]["eth"]) {
      setSupportedTokenList([{
        symbol: "ETH",
        src: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
        rate: 1,
      }, {
        symbol: "MOCHA",
        src: `${process.env.PUBLIC_URL}/mocha-logo.svg`,
        rate: data["dai"]["eth"],
      }])
    }
  }

  const buyToken = async (address: string, payment: number, amount: number) => {
    try {
      const result = await exchangeContract.functions.buyToken(
        address,
        ethers.utils.parseEther(amount.toString()),
        { value: ethers.utils.parseEther(payment.toString()), gasLimit: 100000 }
      );
      console.log(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }

      console.error(e);
    }
  };

  const sellToken = async (tokenAddress: string, payment: number, amount: number) => {
    const erc20Contract = new ethers.Contract(
      tokenAddress,
      ERC20.abi,
      signer
    );

    try {
      const user = await signer.getAddress()

      await erc20Contract.functions.approve(EXCHANGE_ADDRESS, ethers.utils.parseEther(payment.toString()))
      await erc20Contract.functions.allowance(user, EXCHANGE_ADDRESS)
      await exchangeContract.functions.sellToken(
        tokenAddress,
        ethers.utils.parseEther(payment.toString()),
        ethers.utils.parseEther(amount.toString()),
        { gasLimit: 100000 }
      )

    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }

      console.error(e);
    }
  }

  useEffect(() => {
    fetchSupportToken()
  }, [])

  return { supportedTokenList, buyToken, sellToken };
};
