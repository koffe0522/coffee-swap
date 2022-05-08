import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

import type { Mocha } from "../typechain/";

describe("MochaToken", function () {
  let mochaToken: Mocha;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  const TOTAL_SUPPLY = ethers.BigNumber.from(10 ** 4);

  const setUp = async () => {
    console.log("---- before ----");
    const MochaFactory = await ethers.getContractFactory("Mocha");
    mochaToken = await MochaFactory.deploy(TOTAL_SUPPLY);

    const accounts = await ethers.getSigners();
    owner = accounts[0];
    addr1 = accounts[1];
    addr2 = accounts[2];
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

    it("Should have correct total supply", async () => {
      const totalSupply = await mochaToken.totalSupply();

      assert(totalSupply.eq(TOTAL_SUPPLY));
    });

    it("Should have correct initial balances", async () => {
      const ownerBalance = await mochaToken.balanceOf(owner.address);
      const addr1Balance = await mochaToken.balanceOf(addr1.address);

      assert(ownerBalance.eq(TOTAL_SUPPLY));
      assert(addr1Balance.eq(0));
    });
  });

  describe("transfer test", function () {
    const transferAmount = ethers.BigNumber.from(1000);

    before(async function () {
      await setUp();
    });

    it("Should revert when transfer amount > balance", async () => {
      const ownerBalance = await mochaToken.balanceOf(owner.address);

      await expect(
        mochaToken
          .connect(owner)
          .transfer(addr1.address, ownerBalance.add(transferAmount))
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should pass when transfer amount <= balance", async () => {
      assert(
        await mochaToken.connect(owner).transfer(addr1.address, transferAmount)
      );
    });

    it("Should update balances", async () => {
      const ownerBalance = await mochaToken.balanceOf(owner.address);
      const addr1Balance = await mochaToken.balanceOf(addr1.address);
      const totalSupply = await mochaToken.connect(owner).totalSupply();

      assert(totalSupply.sub(transferAmount).eq(ownerBalance))
      assert(addr1Balance.eq(transferAmount))
    });
  });
});
