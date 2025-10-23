import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

describe("Airdrop", function() {
    let token: any;
    let airdrop: any;
    let owner: any;
    let addr1: any;
    let addr2: any;

    this.beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Whitelist
        const whitelist = [owner.address, addr1.address, addr2.address];
        const leaves = whitelist.map((addr) => keccak256(addr));
        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

        const root = tree.getHexRoot();

        // Deploy token
        const Token = await ethers.getContractFactory("MyMintableToken");
        token = await Token.deploy();

        // Deploy Airdrop
        const Airdrop = await ethers.getContractFactory("Airdrop");
        airdrop = await Airdrop.deploy(token.target, root);

        // Authorize Airdrop to mint token
        await token.transferOwnership(airdrop.target);

        // Save for testing
        this.tree = tree;
    });

    it("should allow a whitelisted address to claim tokens", async function () {
        const amount = 100;
        
        // Tạo leaf từ địa chỉ người dùng
        const leaf = keccak256(addr1.address);
        const proof = this.tree.getHexProof(leaf);

        // Gọi claim (với proof đúng)
        const tx = await airdrop.connect(addr1).claim(amount, proof);

        // Expect event Claimed
        await expect(tx)
            .to.emit(airdrop, "Claimed")
            .withArgs(addr1.address, amount);

        // Kiểm tra balance
        const balance = await token.balanceOf(addr1.address);
        expect(balance).to.equal(amount);
    });

    it("should revert if address is not whitelisted", async function () {
        const amount = 100;
        const fakeProof: string[] = [];
        
        await expect(
            airdrop.connect(addr1).claim(amount, fakeProof)
        ).to.be.revertedWith(
            "Not Whitelisted Address"
        );
    });
});
