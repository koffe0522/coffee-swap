// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mocha is ERC20 {
    constructor() ERC20("Mocha", "MOCHA") {
        _mint(msg.sender, 10000 * 10**18);
    }
}
