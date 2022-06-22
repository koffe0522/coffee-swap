// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Dex {
    event Buy(
        address account,
        address _tokenAddr,
        uint256 _cost,
        uint256 _amount
    );
    event Sell(
        address account,
        address _tokenAddr,
        uint256 _cost,
        uint256 _amount
    );

    // サポートしているトークンのアドレス
    mapping(address => bool) public supportedTokenAddress;

    constructor(address[] memory _tokenAddress) {
        for (uint256 i = 0; i < _tokenAddress.length; i++) {
            supportedTokenAddress[_tokenAddress[i]] = true;
        }
    }

    function buy(
        address _tokenAddr,
        uint256 _payment,
        uint256 _amount
    ) public payable {
        IERC20 token = IERC20(_tokenAddr);
        require(msg.value == _payment, "Insufficient fund");
        require(token.balanceOf(address(this)) >= _amount, "Token sold out");
        // NOTE: Dexコントラクトへ指定の量のトークンを送信する
        token.transfer(msg.sender, _amount);
        emit Buy(msg.sender, _tokenAddr, _payment, _amount);
    }

    function sell(
        address _tokenAddr,
        uint256 _payment,
        uint256 _amount
    ) public {
        IERC20 token = IERC20(_tokenAddr);
        require(
            token.balanceOf(msg.sender) >= _payment,
            "Insufficient token balance"
        );
        require(
            address(this).balance >= _amount,
            "Dex does not have enough funds"
        );
        token.transferFrom(msg.sender, address(this), _payment);
        (
            bool success, /* bytes memory data */

        ) = payable(msg.sender).call{value: _amount}("");
        require(success, "ETH transfer failed");
        emit Sell(msg.sender, _tokenAddr, _payment, _amount);
    }
}
