  const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    /*
      ethers.js의 DeployContract는새로운 스마트 컨트랙트를 배포하는데 사용되는
      추상화입니다.

      따라서 이 WhitelistContract는 우리의 Whitelist contract의 인스턴스를 위한 factory입니다.
    */
    
    // 컨트랙트 배포하는 코드
    const whitelistContract = await hre.ethers.deployContract("Whitelist", [10]);
    // 10은 허용된 화이트리스트 어드레스 최대치를 의미합니다.
    // -> Constructor argument를 의미한다고 보면 될 듯

    // 컨트랙트가 배포될때까지 대기 합니다.
    await whitelistContract.waitForDeployment();

    const bytecodes = await whitelistContract.getDeployedCode();

    // 배포된 컨트랙트의 address를 출력합니다.
    console.log("Whitelist Contract Address:", whitelistContract.target);
    console.log("bytecode : ", bytecodes);

    // 이더스탠이 새로운 컨트랙트의 배포를 인댁스할동안 30초 대기합니다.
    await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

    // 이더스캔에 컨트랙트를 승인합니다.
    await hre.run("verify:verify", {
      address: whitelistContract.target,
      constructorArgument: [10],
    });
}


// 메인 함수를 호출하고 에러가 발생했다면 catch 합니다.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit();
    });