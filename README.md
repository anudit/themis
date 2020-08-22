# Themis ⚖
An oracle enabling Purchasing Power Parity on Ethereum to allow for more equitable and dynamic pricing of products.

## Details

### Response Schema
```
{
    0: string: ccIsoAlpha2
    1: string: ccIsoAlpha3
    2: uint256: exchangeRate
    3: uint256: ppp
    4: uint256: pppConversionFactor
}
```

### Response Example
```
{
    'ccIsoAlpha2': 'IN',
    'ccIsoAlpha3': 'IND',
    'exchangeRate': 74929300,
    'ppp': 185530,
    'pppConversionFactor': 247606743957303,
}
```
### Response Details

ℹ All baselines are in USD.

- **countryCodeIsoAlpha2** : This is the ISO Alpha 2 Standard Country Code. You can find the available country codes below.

- **countryCodeIsoAlpha3** : This is the ISO Alpha 3 Standard Country Code. You can find the available country codes below.

- **exchangeRate** : Exchange rate of the currency vs USD. ℹ️ The original value is multiplied by (10^6) and returned by the contract. This is done to allow storing decimals on Ethereum.

- **ppp** : This is the Purchasing Power Pairity. ℹ️ The original value is multiplied by (10^4) and returned by the contract.

- **pppConversionFactor** : The `exchangeRate` and `ppp` property are used to compute the `pppConversionFactor`.  ℹ️ The original value is multiplied by (10^15) and returned by the contract.


## Integration Guide

**Intergration Example Contract** 👉 [ThemisIntegration.sol](https://github.com/anudit/themis/blob/master/Contracts/contracts/ThemisIntegration.sol)

**Latest Deployment Address** 👉 [0x494D59F11c6da8A49aB5E3DC4a4A6dcdb6b68f6b](https://mumbai-explorer.matic.today/address/0x494D59F11c6da8A49aB5E3DC4a4A6dcdb6b68f6b/)

**Solidity Interface**
```solidity
interface IThemis {

    function getConversionFactor(uint256 _index) view external returns (uint256);
    function getParityData(uint256 _index)
        view external
        returns (
            string memory ccIsoAlpha2, string memory ccIsoAlpha3, uint256 exchangeRate, uint256 ppp, uint256 pppConversionFactor
        );
}
```

**ABI**

<details><summary>View</summary>
<p>

```json
 [
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
]
```


</p>
</details>


## Supported Country Codes
| Country Name                               | Alpha-2 code | Alpha-3 code | Query Index |
| ------------------------------------------ | ------------ | ------------ | ----------- |
| Afghanistan                                | AF           | AFG          | 1           |
| Albania                                    | AL           | ALB          | 2           |
| Algeria                                    | DZ           | DZA          | 3           |
| Angola                                     | AO           | AGO          | 4           |
| Antigua and Barbuda                        | AG           | ATG          | 5           |
| Argentina                                  | AR           | ARG          | 6           |
| Armenia                                    | AM           | ARM          | 7           |
| Aruba                                      | AW           | ABW          | 8           |
| Australia                                  | AU           | AUS          | 9           |
| Austria                                    | AT           | AUT          | 10          |
| Azerbaijan                                 | AZ           | AZE          | 11          |
| Bahamas                                    | BS           | BHS          | 12          |
| Bahrain                                    | BH           | BHR          | 13          |
| Bangladesh                                 | BD           | BGD          | 14          |
| Barbados                                   | BB           | BRB          | 15          |
| Belarus                                    | BY           | BLR          | 16          |
| Belgium                                    | BE           | BEL          | 17          |
| Belize                                     | BZ           | BLZ          | 18          |
| Benin                                      | BJ           | BEN          | 19          |
| Bhutan                                     | BT           | BTN          | 20          |
| Bolivia, Plurinational State of            | BO           | BOL          | 21          |
| Bosnia and Herzegovina                     | BA           | BIH          | 22          |
| Botswana                                   | BW           | BWA          | 23          |
| Brazil                                     | BR           | BRA          | 24          |
| Brunei Darussalam                          | BN           | BRN          | 25          |
| Bulgaria                                   | BG           | BGR          | 26          |
| Burkina Faso                               | BF           | BFA          | 27          |
| Burundi                                    | BI           | BDI          | 28          |
| Cambodia                                   | KH           | KHM          | 29          |
| Cameroon                                   | CM           | CMR          | 30          |
| Canada                                     | CA           | CAN          | 31          |
| Cape Verde                                 | CV           | CPV          | 32          |
| Central African Republic                   | CF           | CAF          | 33          |
| Chad                                       | TD           | TCD          | 34          |
| Chile                                      | CL           | CHL          | 35          |
| China                                      | CN           | CHN          | 36          |
| Colombia                                   | CO           | COL          | 37          |
| Comoros                                    | KM           | COM          | 38          |
| Congo                                      | CG           | COG          | 39          |
| Congo, the Democratic Republic of the      | CD           | COD          | 40          |
| Costa Rica                                 | CR           | CRI          | 41          |
| CÃ´te d'Ivoire                             | CI           | CIV          | 42          |
| Croatia                                    | HR           | HRV          | 43          |
| Cyprus                                     | CY           | CYP          | 44          |
| Czech Republic                             | CZ           | CZE          | 45          |
| Denmark                                    | DK           | DNK          | 46          |
| Djibouti                                   | DJ           | DJI          | 47          |
| Dominica                                   | DM           | DMA          | 48          |
| Dominican Republic                         | DO           | DOM          | 49          |
| Ecuador                                    | EC           | ECU          | 50          |
| Egypt                                      | EG           | EGY          | 51          |
| El Salvador                                | SV           | SLV          | 52          |
| Equatorial Guinea                          | GQ           | GNQ          | 53          |
| Eritrea                                    | ER           | ERI          | 54          |
| Estonia                                    | EE           | EST          | 55          |
| Ethiopia                                   | ET           | ETH          | 56          |
| Fiji                                       | FJ           | FJI          | 57          |
| Finland                                    | FI           | FIN          | 58          |
| France                                     | FR           | FRA          | 59          |
| Gabon                                      | GA           | GAB          | 60          |
| Gambia                                     | GM           | GMB          | 61          |
| Georgia                                    | GE           | GEO          | 62          |
| Germany                                    | DE           | DEU          | 63          |
| Ghana                                      | GH           | GHA          | 64          |
| Greece                                     | GR           | GRC          | 65          |
| Grenada                                    | GD           | GRD          | 66          |
| Guatemala                                  | GT           | GTM          | 67          |
| Guinea                                     | GN           | GIN          | 68          |
| Guinea-Bissau                              | GW           | GNB          | 69          |
| Guyana                                     | GY           | GUY          | 70          |
| Haiti                                      | HT           | HTI          | 71          |
| Honduras                                   | HN           | HND          | 72          |
| Hong Kong                                  | HK           | HKG          | 73          |
| Hungary                                    | HU           | HUN          | 74          |
| Iceland                                    | IS           | ISL          | 75          |
| India                                      | IN           | IND          | 76          |
| Indonesia                                  | ID           | IDN          | 77          |
| Iran, Islamic Republic of                  | IR           | IRN          | 78          |
| Iraq                                       | IQ           | IRQ          | 79          |
| Ireland                                    | IE           | IRL          | 80          |
| Israel                                     | IL           | ISR          | 81          |
| Italy                                      | IT           | ITA          | 82          |
| Jamaica                                    | JM           | JAM          | 83          |
| Japan                                      | JP           | JPN          | 84          |
| Jordan                                     | JO           | JOR          | 85          |
| Kazakhstan                                 | KZ           | KAZ          | 86          |
| Kenya                                      | KE           | KEN          | 87          |
| Kiribati                                   | KI           | KIR          | 88          |
| Korea, Republic of                         | KR           | KOR          | 89          |
| Kuwait                                     | KW           | KWT          | 90          |
| Kyrgyzstan                                 | KG           | KGZ          | 91          |
| Lao People's Democratic Republic           | LA           | LAO          | 92          |
| Latvia                                     | LV           | LVA          | 93          |
| Lebanon                                    | LB           | LBN          | 94          |
| Lesotho                                    | LS           | LSO          | 95          |
| Liberia                                    | LR           | LBR          | 96          |
| Libyan Arab Jamahiriya                     | LY           | LBY          | 97          |
| Lithuania                                  | LT           | LTU          | 98          |
| Luxembourg                                 | LU           | LUX          | 99          |
| Macao                                      | MO           | MAC          | 100         |
| Macedonia, the former Yugoslav Republic of | MK           | MKD          | 101         |
| Madagascar                                 | MG           | MDG          | 102         |
| Malawi                                     | MW           | MWI          | 103         |
| Malaysia                                   | MY           | MYS          | 104         |
| Maldives                                   | MV           | MDV          | 105         |
| Mali                                       | ML           | MLI          | 106         |
| Malta                                      | MT           | MLT          | 107         |
| Marshall Islands                           | MH           | MHL          | 108         |
| Mauritania                                 | MR           | MRT          | 109         |
| Mauritius                                  | MU           | MUS          | 110         |
| Mexico                                     | MX           | MEX          | 111         |
| Micronesia, Federated States of            | FM           | FSM          | 112         |
| Moldova, Republic of                       | MD           | MDA          | 113         |
| Mongolia                                   | MN           | MNG          | 114         |
| Montenegro                                 | ME           | MNE          | 115         |
| Morocco                                    | MA           | MAR          | 116         |
| Mozambique                                 | MZ           | MOZ          | 117         |
| Myanmar                                    | MM           | MMR          | 118         |
| Namibia                                    | NA           | NAM          | 119         |
| Nauru                                      | NR           | NRU          | 120         |
| Nepal                                      | NP           | NPL          | 121         |
| Netherlands                                | NL           | NLD          | 122         |
| New Zealand                                | NZ           | NZL          | 123         |
| Nicaragua                                  | NI           | NIC          | 124         |
| Niger                                      | NE           | NER          | 125         |
| Nigeria                                    | NG           | NGA          | 126         |
| Norway                                     | NO           | NOR          | 127         |
| Oman                                       | OM           | OMN          | 128         |
| Pakistan                                   | PK           | PAK          | 129         |
| Palau                                      | PW           | PLW          | 130         |
| Panama                                     | PA           | PAN          | 131         |
| Papua New Guinea                           | PG           | PNG          | 132         |
| Paraguay                                   | PY           | PRY          | 133         |
| Peru                                       | PE           | PER          | 134         |
| Philippines                                | PH           | PHL          | 135         |
| Poland                                     | PL           | POL          | 136         |
| Portugal                                   | PT           | PRT          | 137         |
| Puerto Rico                                | PR           | PRI          | 138         |
| Qatar                                      | QA           | QAT          | 139         |
| Romania                                    | RO           | ROU          | 140         |
| Russian Federation                         | RU           | RUS          | 141         |
| Rwanda                                     | RW           | RWA          | 142         |
| Saint Kitts and Nevis                      | KN           | KNA          | 143         |
| Saint Lucia                                | LC           | LCA          | 144         |
| Saint Vincent and the Grenadines           | VC           | VCT          | 145         |
| Samoa                                      | WS           | WSM          | 146         |
| San Marino                                 | SM           | SMR          | 147         |
| Sao Tome and Principe                      | ST           | STP          | 148         |
| Saudi Arabia                               | SA           | SAU          | 149         |
| Senegal                                    | SN           | SEN          | 150         |
| Serbia                                     | RS           | SRB          | 151         |
| Seychelles                                 | SC           | SYC          | 152         |
| Sierra Leone                               | SL           | SLE          | 153         |
| Singapore                                  | SG           | SGP          | 154         |
| Slovakia                                   | SK           | SVK          | 155         |
| Slovenia                                   | SI           | SVN          | 156         |
| Solomon Islands                            | SB           | SLB          | 157         |
| Somalia                                    | SO           | SOM          | 158         |
| South Africa                               | ZA           | ZAF          | 159         |
| Spain                                      | ES           | ESP          | 160         |
| Sri Lanka                                  | LK           | LKA          | 161         |
| Sudan                                      | SD           | SDN          | 162         |
| Suriname                                   | SR           | SUR          | 163         |
| Swaziland                                  | SZ           | SWZ          | 164         |
| Sweden                                     | SE           | SWE          | 165         |
| Switzerland                                | CH           | CHE          | 166         |
| Taiwan, Province of China                  | TW           | TWN          | 167         |
| Tajikistan                                 | TJ           | TJK          | 168         |
| Tanzania, United Republic of               | TZ           | TZA          | 169         |
| Thailand                                   | TH           | THA          | 170         |
| Timor-Leste                                | TL           | TLS          | 171         |
| Togo                                       | TG           | TGO          | 172         |
| Tonga                                      | TO           | TON          | 173         |
| Trinidad and Tobago                        | TT           | TTO          | 174         |
| Tunisia                                    | TN           | TUN          | 175         |
| Turkey                                     | TR           | TUR          | 176         |
| Turkmenistan                               | TM           | TKM          | 177         |
| Tuvalu                                     | TV           | TUV          | 178         |
| Uganda                                     | UG           | UGA          | 179         |
| Ukraine                                    | UA           | UKR          | 180         |
| United Arab Emirates                       | AE           | ARE          | 181         |
| United Kingdom                             | GB           | GBR          | 182         |
| United States                              | US           | USA          | 183         |
| Uruguay                                    | UY           | URY          | 184         |
| Uzbekistan                                 | UZ           | UZB          | 185         |
| Vanuatu                                    | VU           | VUT          | 186         |
| Venezuela, Bolivarian Republic of          | VE           | VEN          | 187         |
| Viet Nam                                   | VN           | VNM          | 188         |
| Yemen                                      | YE           | YEM          | 189         |
| Zambia                                     | ZM           | ZMB          | 190         |
| Zimbabwe                                   | ZW           | ZWE          | 191         |
