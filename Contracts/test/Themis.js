const Themis = artifacts.require("Themis");

contract("Themis", async (accounts) => {

    it("It should store Parity Data", async () =>{
        let themisInstance = await Themis.deployed();

        await themisInstance.updateParityData(
            9,
            'AU',
            'AUS',
            101,
            102,
            103,
        { from: accounts[0] });

        let data = await themisInstance.parityData(9, {from: accounts[0]});

        assert.equal(
            data[0],
            'AU',
            "Themis is not storing parity data properly"
        );
    });


});
