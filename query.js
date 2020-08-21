const fetch = require('node-fetch');

let SUPPORTED_CODES_ALPHA2 = [
    'AF','AL','DZ','AO','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','BN','BG','BF','BI','KH','CM','CA','CV','CF','TD','CL','CN','CO','KM','CG','CD','CR','CI','HR','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','KR','KW','KG','LA','LV','LB','LS','LR','LY','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX','FM','MD','MN','ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','NO','OM','PK','PW','PA','PG','PY','PE','PH','PL','PT','PR','QA','RO','RU','RW','KN','LC','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','ES','LK','SD','SR','SZ','SE','CH','TW','TJ','TZ','TH','TL','TG','TO','TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VE','VN','YE','ZM','ZW'
];

console.log(SUPPORTED_CODES_ALPHA2.length)

async function saveToChain(countryCodeIsoAlpha2, countryCodeIsoAlpha3, exchangeRate, ppp, pppConversionFactor){
    console.log(`[SAVING] ${countryCodeIsoAlpha2} ${countryCodeIsoAlpha3} ${exchangeRate} ${ppp} ${pppConversionFactor}`);
}

async function start(){

    for (var i = 0; i < SUPPORTED_CODES_ALPHA2.length; i++){

        // console.log(`looking up ${SUPPORTED_CODES_ALPHA2[i]}`);

        let req = await fetch(`https://api.purchasing-power-parity.com/?target=${SUPPORTED_CODES_ALPHA2[i]}`)
        let resp = await req.json();
        if (resp !== undefined && Object.keys(resp).includes('message') === false){
            await saveToChain(
                resp['ppp']['countryCodeIsoAlpha2'],
                resp['ppp']['countryCodeIsoAlpha3'],
                resp['ppp']['currencyMain']['exchangeRate'],
                resp['ppp']['ppp']*(10**4),
                resp['ppp']['pppConversionFactor']*(10**17)
            )
            await sleep(1000);
        }
        else{
            console.warn(`[WARN] Invalid Country at ${i} - ${SUPPORTED_CODES_ALPHA2[i]}`)
        }

    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start()
