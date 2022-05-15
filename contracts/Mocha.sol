// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface EIP20 {
    /// @param _owner The address from which the balance will be retrieved
    /// @return balance the balance
    function balanceOf(address _owner) external view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transfer(address _to, uint256 _value)
        external
        returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return success Whether the approval was successful or not
    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return remaining Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}

contract Mocha is EIP20 {
    // Meta
    string public name = "Mocha";
    string public symbol = "MOCHA";
    uint8 public decimals = 18;

    // 総供給量
    uint256 public totalSupply;

    // 各アカウントの残高
    mapping(address => uint256) public balances;
    // 各アカウントによる転送を許可したトークンの量
    mapping(address => mapping(address => uint256)) private allowances;

    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        // NOTE: Mochaトークンアドレスに総供給量分を付与
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) private {
        require(balances[_from] >= _value, "Insufficient balance");
        require(_from != _to, "from = to");
        balances[_from] -= _value;
        balances[_to] += _value;

        console.log(
            "transfer '%d' token from '%s' to '%s':",
            _value,
            _from,
            _to
        );
        emit Transfer(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        require(
            allowances[_from][msg.sender] >= _value,
            "Transfer amount exceeds allownace"
        );

        _transfer(_from, _to, _value);
        allowances[_from][msg.sender] -= _value;
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool success)
    {
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256)
    {
        return allowances[_owner][_spender];
    }
}
