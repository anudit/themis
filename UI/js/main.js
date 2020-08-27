let mainBtn = document.querySelector('#main-btn');

async function init(){

    let {error, result} = await portis.isLoggedIn();
    if (result == false){
        console.log('Not Loggedin')
    }
    else{
        console.log('Loggedin')

        if (getParameterByName('create') === '1'){
            document.querySelector('#frameCreate').style.display = 'flex';
        }
        else if(getParameterByName('to')!= null && getParameterByName('amt') != null){
            document.querySelector('#framePay').style.display = 'flex';
            document.querySelector('#payTo').innerText = getParameterByName('to');
            window.RECEIVER = getParameterByName('to');
            getParityAmount(getParameterByName('amt')).then((amt)=>{
                document.querySelector('#payAmount').innerText = amt.toFixed(2);
            })

        }
        else{
            document.querySelector('#frameCreate').style.display = 'flex';
        }

    }

    // portis.onLogin((walletAddress, email, reputation) => {
    //     mainBtn.innerText = 'Send';
    // });

}

async function handleSend(){

  let {error, result} = await portis.isLoggedIn();
  if (result == false){
    web3.currentProvider.enable();
  }
  else {
    let accs = await web3.eth.getAccounts();
    web3.eth.sendTransaction({
        to:RECEIVER,
        from: accs[0],
        value:web3.utils.toWei((PAYABLE_AMT).toString(), "ether")
    }, function(error, hash){
        console.log(error, hash)
    });
  }

}

async function getParityFactor(_queryIndex){

    let promise = new Promise((res, rej) => {
        OracleContract.methods.getParityData(_queryIndex).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return parseInt(result['pppConversionFactor'])/(10**15)

}


async function getParityAmount(amt = 0){
    let locData = await fetch('https://freegeoip.app/json/');
    let userLoc = await locData.json()
    let pf = await getParityFactor(SUPPORTED_CODES_ALPHA2.indexOf(userLoc['country_code'])+1)
    window.PAYABLE_AMT = parseFloat(amt)*pf;
    return PAYABLE_AMT

}


async function copylink(){

    let amt = document.querySelector('#inpvalue').value;
    let to = document.querySelector('#inpadd').value;

    copyToClipboard(`http://localhost/?to=${to}&amt=${amt}`)
}
