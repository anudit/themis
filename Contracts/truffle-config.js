const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc-mumbai.matic.today'),
      network_id: 80001,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.7.0",
      settings: {
       optimizer: {
        enabled: true,
        runs: 200
       },
       evmVersion: "istanbul"
      }
    }
  }
}
