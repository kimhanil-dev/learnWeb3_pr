const hre = require("hardhat");

const contractAddress = "0x997848Ea8f202Fe93bBf921084A5607b87212778";

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    // DryptoDevs Contract를 Deploy 합니다.
    const nftContract = await hre.ethers.deployContract("CryptoDevs",[contractAddress]);

    // 컨트랙트가 deploy될때까지 대기합니다.
    await nftContract.waitForDeployment();

    // 배포된 컨트랙트의 어드레스를 출력합니다.
    console.log("NFT Contract Address:", nftContract.target);

    // 이더스캔이 새로운 컨트랙트의 배포를 인댁스할때까지 30초간 슬립(대기) 합니다.
    await sleep(30 * 1000) // 30s = 30 * 1000 milliseconds

    // 컨트랙트를 etherscan에 승인합니다.
    await hre.run("verify:verify", {
        address: nftContract.target,
        constructorArguments: [contractAddress],
    });
}

// main function을 콜하고 에러를 catch 합니다.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });