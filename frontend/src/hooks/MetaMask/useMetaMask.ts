import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { MetaMeskStateContext, MetaMeskDispatchContext } from "./Provider";
import { ActionType } from "./reducer";

import EIP20 from "abi/EIP20.json";

export const useMetaMesk = (config?: {
  chainId?: string | number;
  tokenAddress?: string;
}) => {
  const state = useContext(MetaMeskStateContext);
  const dispatch = useContext(MetaMeskDispatchContext);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [balance, setBalance] = useState(0.0);
  const [tokenBalance, setTokenBalance] = useState(0.0);

  const connect = async (chainId?: string | number) => {
    let params: Record<string, unknown>[] = [];
    if (config?.chainId) {
      params = [
        ...params,
        { chainId: ethers.utils.hexlify(Number(config.chainId)) },
      ];
    }

    if (chainId) {
      params = [...params, { chainId: ethers.utils.hexlify(Number(chainId)) }];
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: params,
    });

    if (!Array.isArray(accounts) || accounts.length === 0) {
      console.error("Account does not exist");
      return;
    }

    dispatch({
      type: ActionType.ACTION_SET_ACCOUNT,
      payload: { account: accounts[0] },
    });
  };

  const getBalance = async () => {
    const balance = await provider?.getBalance(state.account)
    if (!balance) {
      return
    }
    setBalance(Number(ethers.utils.formatEther(balance)));
  };

  const getBalanceOf = async (tokenAddress: string) => {
    const erc20Token = new ethers.Contract(
      tokenAddress,
      EIP20.abi,
      provider?.getSigner()
    );

    const { balance } = await erc20Token.functions.balanceOf(state.account);
    setTokenBalance(Number(ethers.utils.formatEther(balance)));
  };

  const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  };

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      console.log("MetaMask is installed!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: any) => {
          if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log("Please connect to MetaMask.");
            return;
          }

          dispatch({
            type: ActionType.ACTION_SET_ACCOUNT,
            payload: { account: accounts[0] },
          });
        });

      window.ethereum.on("accountsChanged", function (accounts: any) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0]);
      });
    }
  }, []);

  return {
    account: state.account,
    connect,
    getBalance,
    balance,
    getBalanceOf,
    tokenBalance,
  };
};
