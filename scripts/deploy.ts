// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const toWei = ethers.utils.parseEther;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MochaFactory = await ethers.getContractFactory("Mocha")
  const mochaToken = await MochaFactory.deploy()

  const ExchangeFactory = await ethers.getContractFactory("Exchange")
  const exchange = await ExchangeFactory.deploy([mochaToken.address])

  await mochaToken.deployed();
  await exchange.deployed();

  console.log("MochaToken deployed to:", mochaToken.address);
  console.log("Exchange deployed to:", exchange.address);


  const totalSupply = await mochaToken.totalSupply();

  const result = await mochaToken.transfer(exchange.address, totalSupply)
  console.log("transaction:", result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
