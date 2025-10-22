// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./MyMintableToken.sol";

contract Airdrop is Ownable {
    // ===== STATE VARIABLES =====

    MyMintableToken public token;
    bytes32 public merkleRoot;

    mapping(address => bool) public hasClaimed;

    // ===== EVENTS =====
    event MerkleRootUpdated(bytes32 oldRoot, bytes32 newRoot);
    event Claimed(address indexed account, uint256 amount);

    // ===== MODIFIERS =====
    modifier isWhitelistedAddress(bytes32[] calldata _proof) {
        require(
            verifyProof(_proof, keccak256(abi.encodePacked(msg.sender))),
            "Not Whitelisted Address"
        );
        _;
    }

    modifier isClaimed(address _account ) {
        require(
            !hasClaimed[_account],
            "Already Claimed !!!"
        );
        _;
    }

    // ===== CONSTRUCTOR =====

    constructor(address _tokenAddress, bytes32 _root) Ownable(msg.sender){
        token = MyMintableToken(_tokenAddress);
        merkleRoot = _root;
    }

    // ===== VERIFICATION FUNCTIONS =====

    function verifyProof(bytes32[] calldata _proof, bytes32 _leaf) private view returns(bool) {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }

    // ===== ADMIN FUNCTIONS =====

    function setMerkleRoot(bytes32 _newRoot) external onlyOwner {
        bytes32 _oldRoot = merkleRoot;
        merkleRoot = _newRoot;
        emit MerkleRootUpdated(_oldRoot, _newRoot);
    }

    // ===== CLAIM FUNCTIONS =====
    function claim(
        uint256 _amount,
        bytes32[] calldata _proof
    ) external isWhitelistedAddress(_proof) isClaimed(msg.sender) {
        require(_amount > 0, "Invalid Amount");
        require(_proof.length > 0, "Invalid Proof");

        hasClaimed[msg.sender] = true;

        // Mint token for this 'msg.sender'
        token.ownerMint(msg.sender, _amount);

        // Emitting Claimed
        emit Claimed(msg.sender, _amount);
    }
}