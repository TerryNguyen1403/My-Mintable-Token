// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.28;

// Import ERC20 and Ownable
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyMintableToken is ERC20, Ownable {
    bytes32 merkle;

    constructor(bytes32 _root) ERC20("MyMintableToken", "MMT") Ownable(msg.sender) {
        merkle = _root;
    }

    // Mint token
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    // Burn token
    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }
}