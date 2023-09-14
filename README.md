# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
2023-09-14
npx hardhat run scripts/...js --network [networkName] 
위 명령에 따른 hardhat.config.js의 이해

명령어 : scripts/blabla.js를 실행시키며 networkName에 해당하는 --network 설정으로 실행시켜라
--network 설정
  hardhat.config.js에 설정된 것
  
hardhat.config.js의 구조
```json
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.RPC_URL;
const RPC_URL_LINEA = process.env.RPC_URL_LINEA;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const LINEASCAN_API_KEY = process.env.LINEASCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    linea (네트워크 이름(임의로 작성 가능)): {
      url: RPC_URL_LINEA (RPC URL 주소),
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      ETHERSCAN_API_KEY,
      lineascan : LINEA_API_KEY (아래 custmChains의 network와 이름이 같아야함): 해당 체인에서 제공하는 api key (보통 Scan사이트에서 발급 가능)
    },
    customChains: [
      {
        network: "lineascan", (커스텀 체인 network 이름 지정)
        chainId: 59140, 커스텀 체인의 체인 ID ("체인 이름 chain id"라고 구글링 하면 나온다)
        urls: {
          apiURL:   "https://api.lineascan.build/api", (해당 체인에서 제공하는 질의용 api 주소)
          browserURL: "https://lineascan.build/" (해당 체인의 브라우저)
        }
      },
    ]
  },
};
```
