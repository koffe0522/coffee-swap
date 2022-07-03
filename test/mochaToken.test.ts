import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

import type { Mocha } from "../typechain/";

describe("MochaToken", function () {
  let mochaToken: Mocha;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  const setUp = async () => {
    const MochaFactory = await ethers.getContractFactory("Mocha");
    mochaToken = await MochaFactory.deploy();

    const accounts = await ethers.getSigners();
    owner = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
  };

  describe("Basic token test", function () {
    before(async function () {
      await setUp();
    });

    it("Should return token names and symbols correctly", async () => {
      const name = await mochaToken.name();
      const symbol = await mochaToken.symbol();

      expect(name).to.equal("Mocha");
      expect(symbol).to.equal("MOCHA");
    });
  });

  describe("Supply and balance test", function () {
    before(async function () {
      await setUp();
    });

    it("Should have correct initial balances", async () => {
      const totalSupply = await mochaToken.totalSupply()
      const ownerBalance = await mochaToken.balanceOf(owner.address);
      const user1Balance = await mochaToken.balanceOf(user1.address);

      assert(ownerBalance.eq(totalSupply));
      assert(user1Balance.eq(0));
    });
  });

  describe("transfer test", function () {
    const transferAmount = ethers.BigNumber.from(1000);

    before(async function () {
      await setUp();
    });

    it("Should pass when transfer amount <= balance", async () => {
      assert(
        await mochaToken.connect(owner).transfer(user1.address, transferAmount)
      );
    });

    it("Should update balances", async () => {
      const ownerBalance = await mochaToken.balanceOf(owner.address);
      const user1Balance = await mochaToken.balanceOf(user1.address);
      const totalSupply = await mochaToken.connect(owner).totalSupply();

      assert(totalSupply.sub(transferAmount).eq(ownerBalance));
      assert(user1Balance.eq(transferAmount));
    });
  });

  describe("transferFrom test", function () {
    before(async function () {
      await setUp();
      await mochaToken.connect(owner).transfer(user2.address, 500);
      await mochaToken
        .connect(user2)
        .approve(user1.address, ethers.BigNumber.from(500));
    });

    it("Should pass when transfer amount =< allowance", async () => {
      const approveAmount = await mochaToken.allowance(
        user2.address,
        user1.address
      );

      assert(
        await mochaToken
          .connect(user1)
          .transferFrom(user2.address, user1.address, approveAmount)
      );
    });
  });
});
