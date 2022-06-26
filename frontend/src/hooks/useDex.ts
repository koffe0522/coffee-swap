import { ethers } from "ethers";
// import Dex from "../abi/Dex.json"
import Exchange from "../abi/Exchange.json";

const exchangeAddress = process.env.REACT_APP_EXCHANGE_ADDRESS || "";

export const useDex = () => {
  const buyToken = async (address: string, payment: number, amount: number) => {
    if (!exchangeAddress) {
      return;
    }

    console.info(
      `tokenAddress: ${address}, payment: ${payment}, amount: ${amount}`
    );

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const exchangeContract = new ethers.Contract(
      exchangeAddress,
      Exchange.abi,
      signer
    );

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

  return { buyToken };
};
