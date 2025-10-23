import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import path from "path";
import fs from "fs";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("====================");
    console.log(`Network: ${hre.network.name}`);
    console.log(`Deployer: ${deployer}`);
    console.log("====================\n");

    // ====== 1. Deploy MyMintableToken ======
    console.log("Deploying MyMintableToken...\n");
    const tokenDeployment = await deploy("MyMintableToken", {
        contract: "MyMintableToken",
        args: [],
        from: deployer,
        log: true,
        autoMine: true,
        skipIfAlreadyDeployed: false,
    });

    // Get Token address
    const tokenAddress = tokenDeployment.address;
    console.log(`✅ MyMintableToken deployed at: ${tokenAddress}`);

    // ==== 2. Deploy Airdrop ====
    
    //Get Merkle root
    const rootPath = path.join(__dirname, "../merkle/Root.json");
    const rootData = fs.readFileSync(rootPath, "utf8");
    const rootHash = JSON.parse(rootData).rootHash;

    console.log("Deploying Airdrop...\n");
    const airdropDeployment = await deploy("Airdrop", {
        proxy: {
            proxyContract: "UUPS",
            execute: {
                init: {
                    methodName: "initialize",
                    args: [ // Constructor agrs
                        tokenAddress,
                        rootHash
                    ]
                },
            },
        },
        contract: "Airdrop",
        from: deployer,
        log: true,
        autoMine: true,
        skipIfAlreadyDeployed: true,
    })

    //Get Airdrop address
    const airdropAddress = airdropDeployment.address;
    console.log(`✅ Airdrop deployed at: ${airdropAddress}`);

    console.log("==================== DEPLOY COMPLETED ====================");
};

func.tags = ["Airdrop"];
export default func;