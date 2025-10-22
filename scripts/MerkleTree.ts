import { StandardMerkleTree } from "@openzeppelin/merkle-tree"

const whitelistedAddresses: string[][] = [
    ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"],
    ["0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"],
    ["0x90F79bf6EB2c4f870365E785982E1f101E93b906"],
    ["0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"],
    ["0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"],
    ["0x976EA74026E726554dB657fA54763abd0C3a0aa9"],
    ["0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"],
    ["0x4b7d7f0720ca4b276aF03f303F86621C2902132B"],
    ["0x450393dDB269b71504112c99F77860d39dc69803"]
];

const tree = StandardMerkleTree.of<string[]>(whitelistedAddresses, ["address"]);

// Get the root tree value
const root: string = tree.root;
console.log("Root value:", root);

// Gen proof for each address
for(const [i, v] of tree.entries()) {
    console.log(`Address[${i}]: `, v[0]);
    console.log(`Proof of Address[${i}]: `, tree.getProof(i));
};

// Verify
// const testAddress = "0x450393dDB269b71504112c99F77860d39dc69803";
// try {
// Tìm vị trí trong danh sách whitelist
//   const index = whitelistedAddresses.findIndex(
//     (a) => a[0].toLowerCase() === testAddress.toLowerCase()
//   );

//   if (index === -1) {
//     console.log(`❌ Địa chỉ ${testAddress} không có trong whitelist.`);
//   } else {
//     const proof = tree.getProof(index+1);
//     const isValid = StandardMerkleTree.verify(root, ["address"], [testAddress], proof);
//     console.log(isValid ? "✅ Proof hợp lệ!" : "❌ Proof sai!");
//   }
// } catch (err) {
//   console.error("⚠️ Lỗi khi tạo proof:", (err as Error).message);
// }