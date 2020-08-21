const Themis = artifacts.require("Themis");

module.exports = function(deployer) {
  deployer.deploy(Themis, '0x48959611032Fe165ceca68AA0B3429c66284Fc1D');
};
