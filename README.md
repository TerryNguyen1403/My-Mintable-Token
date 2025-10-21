# 🌿 My Mintable Token — Capstone Project

This project demonstrates how to implement an **ERC-20 token** with **Merkle Tree-based whitelisting** using **Solidity** and **Hardhat**.  
It aims to showcase smart contract development, secure access control, and efficient verification using cryptographic proofs.

---

## 📘 Overview

**My Mintable Token** is a custom ERC-20 token designed to restrict minting or claiming to a **whitelisted set of addresses** verified through a Merkle Tree.  
This approach allows on-chain verification without storing every address, reducing gas costs and improving scalability.

---

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Smart Contracts** | Solidity (v0.8.x) |
| **Development Framework** | Hardhat |
| **Merkle Tree Utility** | OpenZeppelin MerkleTree library |
| **Testing** | Mocha + Chai |
| **Deployment** | Hardhat + Alchemy |
| **Network** | Ethereum Testnet (e.g., Sepolia) |

---

## 🏗️ Project Structure

## 📂 Folder Structure & Responsibilities

| Folder / File | Description |
|----------------|-------------|
| **contracts/** | Contains Solidity smart contracts. In this project, `MyMintableToken.sol` defines the ERC-20 token logic with Merkle proof validation. |
| **data/abi/** | Stores generated ABI (Application Binary Interface) files after contract compilation. These JSON files are used by frontend or scripts to interact with the smart contract. |
| **deploy/** | Includes TypeScript deployment scripts. `MyMintableToken.ts` handles contract deployment to a target network (e.g., Sepolia). |
| **deployments/** | Automatically created by Hardhat to store deployment information (deployed addresses, chain IDs, etc.) for different networks. |
| **scripts/** | Contains utility scripts used off-chain. `MerkleTree.ts` generates the whitelist, computes the Merkle root, and exports proofs for verification. |
| **test/** | Holds all test files for smart contracts. Tests are written in TypeScript/JavaScript using Mocha + Chai for assertions. |
| **hardhat.config.ts** | Main Hardhat configuration file. Defines networks, compiler version, and plugins. |
| **tsconfig.json** | TypeScript configuration for compiling `.ts` scripts. |
| **package.json / yarn.lock** | Manage dependencies, scripts, and project metadata. |
| **README.md** | Documentation explaining the project (this file). |

---

📘 **Build Flow Summary**
1. **Smart contract** → `contracts/`
2. **Compile** → generates `artifacts/` and `typechain/`
3. **Whitelist** → `scripts/MerkleTree.ts` creates Merkle root & proofs
4. **Deploy** → `deploy/MyMintableToken.ts` deploys the contract
5. **Test** → `test/` ensures functionality and security
6. **Deployment info** → stored in `deployments/`