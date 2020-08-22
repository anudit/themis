// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

interface IThemis {

    function getConversionFactor(uint256 _index) view external returns (uint256);
    function getParityData(uint256 _index)
        view external
        returns (
            string memory ccIsoAlpha2, string memory ccIsoAlpha3, uint256 exchangeRate, uint256 ppp, uint256 pppConversionFactor
        );
}

contract ThemisIntegration {

    IThemis public themis = IThemis(0xD4822b35ED7574510426e0828c2188e84DEdD681);

    function getParityData(uint256 _amount, uint256 _queryIndex)
        public view
        returns (uint256 _parityAmount)
    {
        (string memory ccIsoAlpha2, string memory ccIsoAlpha3, uint256 exchangeRate, uint256 ppp, uint256 pppConversionFactor ) = themis.getParityData(_queryIndex);

        return _amount*pppConversionFactor;
    }

    function getParityPrice(uint256 _amount, uint256 _queryIndex)
        public view
        returns (uint256 _parityAmount)
    {
        return _amount*themis.getConversionFactor(_queryIndex);
    }
}
