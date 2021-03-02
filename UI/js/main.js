let mainBtn = document.querySelector('#main-btn');

async function init(){

    if (getParameterByName('create') === '1'){
        document.querySelector('#frameCreate').style.display = 'flex';
    }
    else if(getParameterByName('to')!= null && getParameterByName('amt') != null){
        document.querySelector('#framePay').style.display = 'flex';
        document.querySelector('#payTo').innerText = getParameterByName('to');
        window.RECEIVER = getParameterByName('to');
        getParityAmount(getParameterByName('amt')).then((amt)=>{
            console.log(amt);
            document.querySelector('#payAmount').innerText = amt.toFixed(2);
        })

    }
    else{
        document.querySelector('#frameCreate').style.display = 'flex';
    }




    // let {error, result} = await portis.isLoggedIn();
    // if (result == false){
    //     console.log('Not Loggedin')
    // }
    // else{
    //     console.log('Loggedin')


    // }



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
        if (error){
            alert(error)
            console.log(error)
        }
        else {
            console.log(hash)
        }
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

    let promise = new Promise((res, rej) => {

        fetch('https://freegeoip.app/json/')
        .then(response => response.json())
        .then(async (userLoc) => {
            let pf = await getParityFactor(SUPPORTED_CODES_ALPHA2.indexOf(userLoc['country_code'])+1)
            window.PAYABLE_AMT = parseFloat(amt)*pf;
            res(PAYABLE_AMT)
        })
        .catch((e)=>{
            console.log(e);
            window.PAYABLE_AMT = parseFloat(amt);
            res(PAYABLE_AMT)
        })

    });

    let result = await promise;
    return result;

}


async function copylink(){

    let amt = document.querySelector('#inpvalue').value;
    let to = document.querySelector('#inpadd').value;

    copyToClipboard(`http://localhost/?to=${to}&amt=${amt}`)

    let btnCopy = document.querySelector('#btn-copy');
    btnCopy.innerText = 'Done';
}
