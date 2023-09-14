require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.RPC_URL;
const RPC_URL_LINEA = process.env.RPC_URL_LINEA;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const LINESCAN_API_KEY = process.env.LINESCAN_API_KEY;
const RPC_URL_POLY_zkEVM_TESTNET = process.env.RPC_URL_POLY_zkEVM_TESTNET;
const zkEVMPOLYSCAN_API_KEY = process.env.zkEVMPOLYSCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  path: {
    artifacts: "./src",
  },
  networks: {
    sepolia: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
    linea_goerli: {
      url : RPC_URL_LINEA,
      accounts: [PRIVATE_KEY],
    },
    poly_zkEVM: {
      url : "https://rpc.public.zkevm-test.net",
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: {
      ETHERSCAN_API_KEY,
      linea_goerli: LINESCAN_API_KEY,
      zkEVM_Polygon_Testnet: zkEVMPOLYSCAN_API_KEY,
    },
    customChains: [
      {
        network: "linea_goerli",
        chainId: 59140,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build/"
        }
      },
      {
        network: "zkEVM_Polygon_Testnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com/"
        }
      }
    ]
  },
};