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
- 2023-09-14
npx hardhat run scripts/...js --network [networkName] 
위 명령에 따른 hardhat.config.js의 이해

명령어 : scripts/blabla.js를 실행시키며 networkName에 해당하는 --network 설정으로 실행시켜라


hardhat.config.js의 구조
```javascript
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

hardhat.config.js의 network 설정
 - solidity : 작성한 .sol 코드의 컴파일러 버전을 의미
 -  networks : 배포할때 적용할 RPC node url과 배포자의 지갑의 개인키등, 배포에 필요한 정보들을 설정해두는 부분, 여러개의 설정을 작성할 수 있으며, 이름으로 구분한다.
 -  etherscan : 배포 대상 체인에서 발급받은 API_KEY를 저장해 놓는 곳 ( API_KEY는 apiURL을 통한 각종 정보 질의에 사용되므로, 보안을 위해 env로 숨겨야 함)
                 hardhat에서 default로 지정된 체인인 Ethereum 이외의 chain에 배포하기 위해서는 해당 체인에 대한 추가 정보를 customChain: 라는 항목에 지정해야한다
          - customChans : Ethereum 체인이 아닌 다른 체인에 배포할 경우 작성해야 한다.
                          - network : 체인을 구별하는 이름 (사용자 정의)
                          - chainId : 체인의 Id (정해져 있는 값으로 검색하면 나온다.)
                          - urls : 체인에서 제공하는 url들을 작성하는 곳으로 apiURL, browserURL을 작성한다
                                - apiURL : API_KEY를 이용해 질의할 수 있는 해당 체인의 서버 URL을 말한다. https://api.lineascan.build/api
                                - browserURL : 해당 체인의 브라우저 URL을 말한다 (ex) https://lineascan.build/

hardhat.config.js를 통해 다양한 체인에 배포해보면서 느낀점 / 궁금증
1. Polygon과 linea 둘다 Ethereum 의 L2이다 보니 이미 Varified되었다고 뜬다. 
2. 각 체인들의 Scan사이트는 블록체인을 가시화 하고, 각종 클라이언트 프로그램(프로젝트)들과의 중간자 역할을 하는 것 같다 (apiURL을 보고서 느낌)

