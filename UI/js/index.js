let OracleContract;

if (typeof window.ethereum !== 'undefined') {
    ethereum.autoRefreshOnNetworkChange = false;
}

window.addEventListener('load', async () => {

    if (window.web3) {

        // web3.version.getNetwork((err, netId) => {
        //     if(netId != 80001){
        //         alert("Please switch to https://rpc-mumbai.matic.today");
        //     }
        // });

        try {

            window.portis = new Portis('46cabecf-b3a1-4a29-b4b4-b8691b410a39', 'maticMumbai');
            window.web3 = new Web3(portis.provider)
            web3.currentProvider.enable();
            OracleContract = new web3.eth.Contract(oracleABI, oracleAddress);
            init();

        } catch (error) {
            console.log(error);
            alert(error);
        }

    } else{
        window.portis = new Portis('46cabecf-b3a1-4a29-b4b4-b8691b410a39', 'maticMumbai');
        window.web3 = new Web3(portis.provider);
        OracleContract = new web3.eth.Contract(oracleABI, oracleAddress);
        init();
        alert("We Recommend Getting a Web3 Compatible browser like MetaMask.");
    }
});


function getParameterByName(name) {
  url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}
