import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("====================");
    console.log(hre.network.name);
    console.log("====================");

    console.log("====================");
    console.log("Deploy MyMintable Contract");
    console.log("====================");

    console.log("====================");
    console.log("Deployer: ", deployer);
    console.log("====================");

    await deploy("MyMintableToken", {
        contract: "MyMintableToken",
        args: ["0x79ba8e7b1051944565b6953aeb2351d0d6ef5ef3b62f51f1d210de97776782cf"],
        from: deployer,
        log: true,
        autoMine: true,
        skipIfAlreadyDeployed: false,
    })
};

func.tags = ["MyMintableToken"];
export default func;