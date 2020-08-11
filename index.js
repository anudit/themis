const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var Dagger = require("@maticnetwork/dagger");

require('dotenv').config()

let web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'))
var account_pubKey = process.env.PUBLIC_KEY;
var account_privKey = process.env.PRIVATE_KEY;
console.log(account_pubKey, account_privKey)

var syncContract_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_syncerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_txnHash",
				"type": "bytes32"
			}
		],
		"name": "addHashToBlock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastSyncBlockNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "syncer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newSyncer",
				"type": "address"
			}
		],
		"name": "updateSyncer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "validBlocks",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "validHashes",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var syncContract_Address = "0x004879d3AeD9F3C182d66D658451aCFdABE1d451";
var syncContract = new web3.eth.Contract(syncContract_ABI, syncContract_Address, {from: account_pubKey});

const dagger = new Dagger("wss://mainnet.dagger.matic.network");

let nonce = await web3.eth.getTransactionCount(
    account_pubKey,
    "pending"
);
nonce = parseInt(nonce);

async function storeBlockData(block){
    console.log(`[ Saving State of ${block.number} ] Storing ${block.transactions.length} new transactions.`);

    block.transactions.forEach(async (_txnhash) => {

        var txParams = {
            "from": account_pubKey,
            "nonce": web3.utils.toHex(nonce),
            "gasPrice": web3.utils.toHex('1000000000'), // 1 gwei
            "gasLimit": web3.utils.toHex('3000000'),
            "to": syncContract_Address,
            "value": "0x0",
            "data": syncContract.methods.addHashToBlock( block.number, _txnhash).encodeABI(),
            "chainId": web3.utils.toHex('80001')
        };

        var privKey = new Buffer.from(account_privKey, 'hex');
        var tx = new Tx(txParams);

        tx.sign(privKey);
        var serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('transactionHash', function(hash){
            // console.log(hash);
        })
        .on('error', console.error);
        nonce +=1;
    });

}

dagger.on("latest:block", function(result) {
    storeBlockData(result);
});
