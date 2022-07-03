import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumberish } from "ethers";
import { ethers } from "hardhat";

import type { Mocha, Exchange } from "../typechain/";

const toEth = (wei: BigNumberish) => parseInt(ethers.utils.formatEther(wei))
const toWei = (ether: string) => ethers.utils.parseEther(ether)

describe("Exchange", function () {
  let mochaToken: Mocha;
  let exchange: Exchange;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  const vsEthRate = 1000;

  const setUp = async () => {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    user = accounts[1];


    const MochaFactory = await ethers.getContractFactory("Mocha");
    mochaToken = await MochaFactory.deploy();

    const ExchangeFactory = await ethers.getContractFactory("Exchange");
    exchange = await ExchangeFactory.deploy([mochaToken.address])

    const totalSupply = await mochaToken.totalSupply()
    await mochaToken.transfer(exchange.address, totalSupply.toString())
  };

  beforeEach(async function () {
    await setUp();
  });

  it('should get total supply of Token', async () => {
    const exchangeBalance = await mochaToken.balanceOf(exchange.address)
    const tokenSupply = await mochaToken.totalSupply()
    expect(exchangeBalance.toString()).to.equal(tokenSupply.toString());
  })

  it('should be able to send tokens to buyers', async () => {
    const totalSupply = await mochaToken.totalSupply()
    const amount = toWei("1.0")
    const tokenPurchases = toEth(amount) * vsEthRate

    const buyerEthStarting = await ethers.provider.getBalance(user.address);
    await exchange.connect(user).buyToken(mochaToken.address, toWei(tokenPurchases.toString()), {
      value: amount,
    });

    const userBalance = await mochaToken.balanceOf(user.address);
    const exchangeBalance = await mochaToken.balanceOf(
      exchange.address
    );
    const exchangeEth = await ethers.provider.getBalance(
      exchange.address
    );
    const buyerEth = await ethers.provider.getBalance(user.address);

    expect(toEth(userBalance)).to.equal(tokenPurchases);
    expect(toEth(buyerEth)).to.be.lessThan(toEth(buyerEthStarting));
    expect(toEth(exchangeBalance)).to.equal(toEth(totalSupply) - tokenPurchases);
    expect(toEth(exchangeEth)).to.equal(toEth(amount));
  })

  it("should be able to receive tokens from buyers", async () => {
    const tokenSell = toEth(toWei("1.0")) * vsEthRate

    await exchange.connect(user).buyToken(mochaToken.address, toWei((toEth(toWei("2.0")) * vsEthRate).toString()), {
      value: toWei("2.0"),
    });

    // before balance
    const prevUserBalance = await mochaToken.balanceOf(user.address);
    const prevExchangeBalance = await mochaToken.balanceOf(
      exchange.address
    );
    const prevExchangeEth = await ethers.provider.getBalance(
      exchange.address
    );
    const prevBuyerEth = await ethers.provider.getBalance(user.address);

    await mochaToken
      .connect(user)
      .approve(exchange.address, toWei(tokenSell.toString()));

    await mochaToken
      .connect(user).allowance(user.address, exchange.address)

    await exchange.connect(user).sellToken(mochaToken.address, toWei(tokenSell.toString()), toWei("1.0"))

    const userBalance = await mochaToken.balanceOf(user.address);
    const exchangeBalance = await mochaToken.balanceOf(
      exchange.address
    );
    const exchangeEth = await ethers.provider.getBalance(
      exchange.address
    );
    const buyerEth = await ethers.provider.getBalance(user.address);

    expect(toEth(userBalance)).to.equal(toEth(prevUserBalance) - tokenSell);
    expect(toEth(prevBuyerEth)).to.be.lessThan(toEth(buyerEth));
    expect(toEth(exchangeBalance)).to.equal(toEth(prevExchangeBalance) + tokenSell);
    expect(toEth(exchangeEth)).to.be.lessThan(toEth(prevExchangeEth));
  })
})