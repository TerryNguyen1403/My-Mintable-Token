// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.28;

// Import ERC20 and Ownable
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyMintableToken is ERC20, Ownable {

    bytes32 public rootHash;
    mapping(address => bool) public hasClaimed;

    constructor(bytes32 _root) ERC20("MyMintableToken", "MMT") Ownable(msg.sender) {
        rootHash = _root;
    }

    function verifyProof(bytes32[] calldata proof, bytes32 leaf) public view returns (bool) {
        return MerkleProof.verify(proof, rootHash, leaf);
    }

    // --------- ADMIN FUNCTION ---------
    function setNewRoot(bytes32 _newRoot) public onlyOwner {
        rootHash = _newRoot;
    }

    // Mint token
    function ownerMint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    // Burn token
    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }
}