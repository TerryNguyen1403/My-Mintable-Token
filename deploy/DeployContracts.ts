import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

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
    const merkleRoot = "0x79ba8e7b1051944565b6953aeb2351d0d6ef5ef3b62f51f1d210de97776782cf";
    console.log("Deploying Airdrop...\n");
    const airdropDeployment = await deploy("Airdrop", {
        contract: "Airdrop",
        args: [ tokenAddress, merkleRoot ],
        from: deployer,
        log: true,
        autoMine: true,
        skipIfAlreadyDeployed: false,
    })

    //Get Airdrop address
    const airdropAddress = airdropDeployment.address;
    console.log(`✅ Airdrop deployed at: ${airdropAddress}`);

    console.log("==================== DEPLOY COMPLETED ====================");
};

func.tags = ["Airdrop"];
export default func;