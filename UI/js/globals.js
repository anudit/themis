let oracleABI = [
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getConversionFactor",
		"outputs": [
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getParityData",
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
let oracleAddress = '0x494D59F11c6da8A49aB5E3DC4a4A6dcdb6b68f6b';


let SUPPORTED_CODES_ALPHA2 = [
    'AF','AL','DZ','AO','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','BN','BG','BF','BI','KH','CM','CA','CV','CF','TD','CL','CN','CO','KM','CG','CD','CR','CI','HR','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','KR','KW','KG','LA','LV','LB','LS','LR','LY','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX','FM','MD','MN','ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','NO','OM','PK','PW','PA','PG','PY','PE','PH','PL','PT','PR','QA','RO','RU','RW','KN','LC','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','ES','LK','SD','SR','SZ','SE','CH','TW','TJ','TZ','TH','TL','TG','TO','TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VE','VN','YE','ZM','ZW'
];
