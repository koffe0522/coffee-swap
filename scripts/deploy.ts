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
  const mochaTokenTotalSupply = toWei("1")
  const MochaFactory = await ethers.getContractFactory("Mocha")
  const mochaToken = await MochaFactory.deploy(mochaTokenTotalSupply)

  await mochaToken.deployed();

  console.log("MochaToken deployed to:", mochaToken.address);
  const res = await mochaToken.balanceOf(mochaToken.address)
  console.log("MochaToken this contract balance:", res.toString());

  const DexFactory = await ethers.getContractFactory("Dex")

  const dex = await DexFactory.deploy([mochaToken.address])
  await dex.deployed();
  console.log("dex deployed to:", dex.address);

  const result = await mochaToken.transfer(dex.address, mochaTokenTotalSupply)
  console.log("transaction:", result);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
