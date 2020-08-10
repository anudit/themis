const Web3 = require('web3');
const fetch = require('node-fetch');
const INFURA_KEY = '9f34d0bf5e1b4b36914fd5bc66c50b05';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}

async function storeBlockData(transactionList = []){
    console.log(`[ Saving State ] Storing ${transactionList.length} new transactions.`);
}

var lastSyncedBlockNumber = 0;

async function updater(){
    var latestblockdata = await postData(`https://mainnet.infura.io/v3/${INFURA_KEY}`, {"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1})
    var latestBlockNumber  = parseInt(latestblockdata.result);

    if (latestBlockNumber>lastSyncedBlockNumber){
        console.log(`[ Syncing New Block ] ${lastSyncedBlockNumber} => ${latestBlockNumber}`);
        var newBlockData = await postData(`https://mainnet.infura.io/v3/${INFURA_KEY}`, {
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": [
                latestblockdata.result,
                false
            ],
            "id": 1
        });
        console.log(Object.keys(newBlockData.result));
        lastSyncedBlockNumber = latestBlockNumber;
        storeBlockData(newBlockData.result)
    }
}

setInterval(updater, 6000);


/*
Each Block has

[
  'difficulty',       'extraData',
  'gasLimit',         'gasUsed',
  'hash',             'logsBloom',
  'miner',            'mixHash',
  'nonce',            'number',
  'parentHash',       'receiptsRoot',
  'sha3Uncles',       'size',
  'stateRoot',        'timestamp',
  'totalDifficulty',  'transactions',
  'transactionsRoot', 'uncles'
]

*/
