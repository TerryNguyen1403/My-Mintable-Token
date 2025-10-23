import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import path from "path";

// ===== TYPES =====

interface whitelistEntry {
    address: string;
    amount: string;
}

type ProofEntry = {
  address: string;
  proof: string[];
};

// ===== DEFINE PATHS =====

const whitelistPath = path.join(__dirname, "../merkle/WhiteList.json");
const rootPath = path.join(__dirname, "../merkle/Root.json");
const proofPath = path.join(__dirname, "../merkle/Proofs.json");

// ===== READ WHITELIST =====

const whitelist: whitelistEntry[] = JSON.parse(fs.readFileSync(whitelistPath, "utf8"));

// ===== CREATE LEAVES =====

const leaves: [string, string][] = whitelist.map((entry) => [
    entry.address,
    entry.amount
])

// ===== CREATE MERKLE TREE =====

const tree = StandardMerkleTree.of(leaves, ["address", "uint256"]);
const rootHash = tree.root;

// ===== GEN PROOFS =====

const proofs: Record <string, ProofEntry> = {};

for (const [index, value] of tree.entries()) {
    const address = value[0];
    const proof = tree.getProof(index)
    proofs[address] = {
        address: address,
        proof: proof
    };
}

// ===== SAVE FILES =====

fs.writeFileSync( // Save rootHash
    rootPath,
    JSON.stringify(
        { rootHash: rootHash },
        null,
        2
    )
);

fs.writeFileSync( // Save proofs
    proofPath,
    JSON.stringify(
        proofs,
        null,
        2
    )
);