// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Exchange {
    receive() external payable {}

    fallback() external payable {}

    event Buy(address account, address _tokenAddr, uint256 _amount);
    event Sell(address account, address _tokenAddr, uint256 _amount);

    // サポートしているトークンのアドレス
    mapping(address => bool) public supportedTokenAddress;

    constructor(address[] memory _tokenAddress) {
        for (uint256 i = 0; i < _tokenAddress.length; i++) {
            supportedTokenAddress[_tokenAddress[i]] = true;
        }
    }

    function buyToken(address _tokenAddr, uint256 _amount) public payable {
        require(supportedTokenAddress[_tokenAddr], "not support token");
        ERC20 token = ERC20(_tokenAddr);
        require(token.balanceOf(address(this)) >= _amount, "Token sold out");

        // トークン購入者へ指定の量のトークンを送信する
        token.transfer(msg.sender, _amount);

        emit Buy(msg.sender, _tokenAddr, _amount);
    }

    function sellToken(address _tokenAddr, uint256 _amount) public payable {
        require(supportedTokenAddress[_tokenAddr], "not support token");
        IERC20 token = IERC20(_tokenAddr);
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient token balance"
        );
        require(
            address(this).balance >= _amount,
            "Dex does not have enough funds"
        );
        // Exchangeコントラクトに指定の量のトークンを送信する
        token.transferFrom(msg.sender, address(this), _amount);
        //
        (
            bool success, /* bytes memory data */

        ) = payable(msg.sender).call{value: _amount}("");
        require(success, "ETH transfer failed");

        emit Sell(msg.sender, _tokenAddr, _amount);
    }
}
