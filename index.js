const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const fetch = require('node-fetch');

require('dotenv').config()

let web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'))
var account_pubKey = process.env.PUBLIC_KEY;
var account_privKey = process.env.PRIVATE_KEY;

const THEMIS_ABI = [
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
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ccIsoAlpha2",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ccIsoAlpha3",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_exchangeRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ppp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pppConversionFactor",
				"type": "uint256"
			}
		],
		"name": "updateParityData",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "parityData",
		"outputs": [
			{
				"internalType": "string",
				"name": "ccIsoAlpha2",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ccIsoAlpha3",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "exchangeRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ppp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pppConversionFactor",
				"type": "uint256"
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
	}
];

const THEMIS_Address = '0xD4822b35ED7574510426e0828c2188e84DEdD681';

const themisInstance =  new web3.eth.Contract(THEMIS_ABI, THEMIS_Address, {from: account_pubKey});


let SUPPORTED_CODES_ALPHA2 = [
    'AF','AL','DZ','AO','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','BN','BG','BF','BI','KH','CM','CA','CV','CF','TD','CL','CN','CO','KM','CG','CD','CR','CI','HR','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','KR','KW','KG','LA','LV','LB','LS','LR','LY','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX','FM','MD','MN','ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','NO','OM','PK','PW','PA','PG','PY','PE','PH','PL','PT','PR','QA','RO','RU','RW','KN','LC','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','ES','LK','SD','SR','SZ','SE','CH','TW','TJ','TZ','TH','TL','TG','TO','TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VE','VN','YE','ZM','ZW'
];

async function saveToChain(index, countryCodeIsoAlpha2, countryCodeIsoAlpha3, exchangeRate, ppp, pppConversionFactor){
    console.info(`[SAVING] ${index} ${countryCodeIsoAlpha2} ${countryCodeIsoAlpha3} ${exchangeRate} ${ppp} ${pppConversionFactor}`);

    let nonce = await web3.eth.getTransactionCount(
        account_pubKey,
        "pending"
    );
    nonce = parseInt(nonce);

    var txParams = {
        "from": account_pubKey,
        "nonce": web3.utils.toHex(nonce),
        "gasPrice": web3.utils.toHex('1000000000'), // 1 gwei
        "gasLimit": web3.utils.toHex('3000000'),
        "to": THEMIS_Address,
        "value": "0x0",
        "data": themisInstance.methods.updateParityData(
            index,
            countryCodeIsoAlpha2,
            countryCodeIsoAlpha3,
            Math.floor(exchangeRate),
            Math.floor(ppp),
            Math.floor(pppConversionFactor)
        ).encodeABI(),
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
}

async function start(){

    for (var i = 0; i <= SUPPORTED_CODES_ALPHA2.length; i++){

        // console.log(`looking up ${SUPPORTED_CODES_ALPHA2[i]}`);

        let req = await fetch(`https://api.purchasing-power-parity.com/?target=${SUPPORTED_CODES_ALPHA2[i]}`)
        let resp = await req.json();
        if (resp !== undefined && Object.keys(resp).includes('message') === false){
            await saveToChain(
                i+1,
                resp['ppp']['countryCodeIsoAlpha2'],
                resp['ppp']['countryCodeIsoAlpha3'],
                resp['ppp']['currencyMain']['exchangeRate']*(10**6),
                resp['ppp']['ppp']*(10**4),
                resp['ppp']['pppConversionFactor']*(10**15)
            )
            await sleep(3000);
        }
        else{
            console.warn(`[WARN] Invalid Country at ${i} - ${SUPPORTED_CODES_ALPHA2[i]}`)
        }

    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start();
