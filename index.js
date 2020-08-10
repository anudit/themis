const Web3 = require('web3');
const Dagger = require("@maticnetwork/dagger");

// wss://mainnet.dagger.matic.network
// wss://mumbai-dagger.matic.today
const dagger = new Dagger("wss://mainnet.dagger.matic.network");

async function storeBlockData(block){
    console.log(`[ Saving State of ${block.number} ] Storing ${block.transactions.length} new transactions.`);
}

dagger.on("latest:block", function(result) {
    storeBlockData(result);
});

