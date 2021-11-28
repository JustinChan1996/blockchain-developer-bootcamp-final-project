const { Console } = require("console");
const { time } = require("@openzeppelin/test-helpers");


const ethCoupon = artifacts.require("EthCoupon");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("createPromotion", function (accounts) {

  let contractInstance;

  context("Contract Creation Scenarios", async () => {

    beforeEach(async () => {
      contractInstance = await ethCoupon.new();
    });
  
    it("should assert true", async function () {
      await ethCoupon.deployed();
      return assert.isTrue(true);
    });
  
    it("should be able to create a new promotion", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      assert.equal(result.receipt.status, true);
    });

    it("Sponsor address cannot be the same as target address", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[0];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error;
      }
      assert.equal(err.reason, 'Sponsor address cannot be the same as target address');
    });
  
    it("Promotional Amount must be greater than the amount per address", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("2", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error;
      }
      assert.equal(err.reason, 'Eth per address must be lesser than or equal to total Eth amount');
    });
  
    it("Promotional Amount can be equal to the amount per address", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      assert.equal(result.receipt.status, true);
    });
  
    it("Start Date cannot be later than the end date", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,endDate,startDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Start date must be earlier than end date');
    });
  
    it("Start Date cannot be equal to the end date", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,startDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Start date must be earlier than end date');
    });
  
    it("Max redeem amount must be greater than the min redeem amount", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,maxRedeemAmt,minRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Minimum redeem amount must be greather than maximum redeem amount');
      // assert.ok(err instanceof Error)
      // console.log(err.reason);
    });
  
    it("Max redeem cannot be equal to the min redeem amount", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,minRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Minimum redeem amount must be greather than maximum redeem amount');
      // assert.ok(err instanceof Error)
      // console.log(err.reason);
    });

    it("should be able to create a new promotion with a different promotion code", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      // Create second promotion with different code
      promoCode1 = "test1";
      const result = await contractInstance.mint(promoCode1,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      assert.equal(result.receipt.status, true);
    });

    it("should not be able to create a new promotion with a same name", async function () {
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date()).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      let err = null;
      try{
        const result = await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion code already exists');
    });

  })

  context("Test function for promotion topup", async () => {

    beforeEach(async () => {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
    });

    it("Only promotion owner can add funds to the promotion", async function () {
      const promoCode = "test";
      const result = await contractInstance.topUp(promoCode,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      assert.equal(result.receipt.status, true);
      // assert.ok(err instanceof Error)
      // console.log(err.reason);
    });

    it("Non promotion owner can cannot add funds to the promotion", async function () {
      const promoCode = "test";
      let err = null;
      try{
        const result = await contractInstance.topUp(promoCode,{from: accounts[2], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Caller Address is not the sponsor address of the promotion code');
      // assert.ok(err instanceof Error)
      // console.log(err.reason);
    });

    it("Promotion owner cannot add funds to an invalid promotion code", async function () {
      const promoCode = "test1";
      let err = null;
      try{
        const result = await contractInstance.topUp(promoCode,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Caller Address is not the sponsor address of the promotion code');
      // assert.ok(err instanceof Error)
      // console.log(err.reason);
    });

    it("Promotion owner cannot add funds before the valid date", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 11, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      let err = null;
      try{
        const result = await contractInstance.topUp(promoCode,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
      // assert.ok(err instanceof Error)
      // console.log(err.reason);

    });

    it("Promotion owner cannot add funds after the valid date", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 10, 10, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      let err = null;
      try{
        const result = await contractInstance.topUp(promoCode,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
      // assert.ok(err instanceof Error)
      // console.log(err.reason);

    });


  })

  context("Test function to show promotion details", async () => {

    it("Promotion details must match input values", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      var results = await contractInstance.checkPromotionDetails.call(promoCode);
      assert.equal(results.totalPerAddress.toString(), totalPerAddress.toString());
      assert.equal(results.targetAddress.toString(), targetAddress.toString());
      assert.equal(results.startDate.toString(), startDate.toString());
      assert.equal(results.endDate.toString(), endDate.toString());
      assert.equal(results.minRedeemAmt.toString(), minRedeemAmt.toString());
      assert.equal(results.maxRedeemAmt.toString(), maxRedeemAmt.toString());
    });

    // it("It should only work when after the valid date starts", async function () {
    //   contractInstance = await ethCoupon.new();
    //   const promoCode = "test";
    //   const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
    //   const targetAddress = accounts[1];
    //   const startDate = Math.round((new Date(2022, 10, 01, 10, 33, 30)).getTime() / 1000);
    //   const endDate = Math.round((new Date(2022, 10, 15, 10, 33, 30)).getTime() / 1000);
    //   const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
    //   const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    //   await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
    //   let err = null;
    //   try{
    //     var results = await contractInstance.checkPromotionDetails.call(promoCode);
    //   }catch(error){
    //     err = error; 
    //   }
    //   assert.equal(results, undefined);
    // });

    // it("It should only work when before the valid date ends", async function () {
    //   contractInstance = await ethCoupon.new();
    //   const promoCode = "test";
    //   const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
    //   const targetAddress = accounts[1];
    //   const startDate = Math.round((new Date(2020, 10, 01, 10, 33, 30)).getTime() / 1000);
    //   const endDate = Math.round((new Date(2020, 10, 15, 10, 33, 30)).getTime() / 1000);
    //   const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
    //   const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    //   await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
    //   let err = null;
    //   try{
    //     var results = await contractInstance.checkPromotionDetails.call(promoCode);
    //   }catch(error){
    //     err = error; 
    //   }
    //   assert.equal(results, undefined);
    // });

    it("It should show promotion as valid when funds are still present", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 10, 15, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      var results = await contractInstance.checkPromotionDetails.call(promoCode);
      assert.equal(results.isPromoValid, true);
    });
    
    //TODO: It should show promotion as invalid when funds are still present
    it("It should show promotion as invalid when funds are not present", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 10, 15, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      // // Debug promotion validity by calling checkPromotionalBalance function
      // var promoResults = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      // console.log("balance: " + promoResults.leftOver.toString());
      const result = await contractInstance.redeem(promoCode,{from: accounts[2]});
      // var promoResults2 = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      // console.log("balance: " + promoResults2.leftOver.toString());
      var results1 = await contractInstance.checkPromotionDetails.call(promoCode);
      assert.equal(results1.isPromoValid, false);
      // console.log(results1.isPromoValid);
    });
    
  })

  context("Test function for the sponsor to check promotional balance", async () => {

    it("Only the sponsor can check promotional balance", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      var results = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      assert.notEqual(results, undefined);
    });

    it("Non sponsor cannot check promotional balance", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      let err = null;
      try{
        var results = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[1]});
      }catch(error){
        err = error; 
      }
      assert.equal(results, undefined);
    });

    // it("It should only work after the valid date starts", async function () {
    //   contractInstance = await ethCoupon.new();
    //   const promoCode = "test";
    //   const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
    //   const targetAddress = accounts[1];
    //   const startDate = Math.round((new Date(2022, 10, 01, 10, 33, 30)).getTime() / 1000);
    //   const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
    //   const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
    //   const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    //   await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
    //   let err = null;
    //   try{
    //     var results = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[1]});
    //   }catch(error){
    //     err = error; 
    //   }
    //   assert.equal(results, undefined);
    // });

    // it("It should only work before the valid date ends", async function () {
    //   contractInstance = await ethCoupon.new();
    //   const promoCode = "test";
    //   const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
    //   const targetAddress = accounts[1];
    //   const startDate = Math.round((new Date(2020, 10, 01, 10, 33, 30)).getTime() / 1000);
    //   const endDate = Math.round((new Date(2020, 11, 01, 10, 33, 30)).getTime() / 1000);
    //   const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
    //   const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    //   await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
    //   let err = null;
    //   try{
    //     var results = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[1]});
    //   }catch(error){
    //     err = error; 
    //   }
    //   assert.equal(results, undefined);
    // });

    it("Original Leftover balance and unspent Ether balance must be equal to ether deposited", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const totalAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: totalAmt});
      var results = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      assert.equal(results.leftOver.toString(), totalAmt.toString());
      assert.equal(results.unspentEther.toString(), totalAmt.toString());
    });

    it("Leftover balance and unspent Ether balance must be updated when the fund is top up", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const totalAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const topUpAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      const newAmount = web3.utils.toBN(totalAmt).add(topUpAmt);
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: totalAmt});
      const result1 = await contractInstance.topUp(promoCode,{from: accounts[0], value: topUpAmt});
      var results2 = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      assert.equal(results2.leftOver.toString(), newAmount.toString());
      assert.equal(results2.unspentEther.toString(), newAmount.toString());
    });

    it("Leftover balance must be updated when a coupon is redemeed", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const totalAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      const newAmount = web3.utils.toBN(totalAmt).sub(totalPerAddress);
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: totalAmt});
      const result = await contractInstance.redeem(promoCode,{from: accounts[2]});
      var results1 = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      assert.equal(results1.leftOver.toString(), newAmount.toString());
    });

    it("Unspent ether must be updated when a coupon is spent", async function () {
      contractInstance = await ethCoupon.new();
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const totalAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: totalAmt});
      await contractInstance.redeem(promoCode,{from: accounts[2]});
      const couponAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const txnAmt = web3.utils.toBN(web3.utils.toWei("0.50", "ether"));
      const updatedUnspentEther = web3.utils.toBN(totalAmt).sub(txnAmt);
      await contractInstance.transaction(promoCode,txnAmt,{from: accounts[2],value: txnAmt});
      var results = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
      assert.equal(results.unspentEther.toString(), updatedUnspentEther.toString());
    });
  
  })

  context("Test function for coupon redeem", async () => {

    beforeEach(async () => {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
    });

    it("Sponsor cannot redeem the coupon", async function () {
      const promoCode = "test";
      let err = null;
      try{
        const result = await contractInstance.redeem(promoCode,{from: accounts[0]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Sponsor cannot redeem coupon');
    });

    it("Target address cannot redeem the coupon", async function () {
      const promoCode = "test";
      let err = null;
      try{
        const result = await contractInstance.redeem(promoCode,{from: accounts[1]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Target address cannot redeem coupon');
    });

    it("Non sponsor and target address can redeem coupon", async function () {
      const promoCode = "test";
      const result = await contractInstance.redeem(promoCode,{from: accounts[2]});
      assert.equal(result.receipt.status, true);
    });

    it("Coupon cannot be redemeed more than one time", async function () {
      const promoCode = "test";
      const result = await contractInstance.redeem(promoCode,{from: accounts[2]});
      let err = null;
      try{
        const result1 = await contractInstance.redeem(promoCode,{from: accounts[2]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'User has redemeed the promotion code already');
    });

    it("Coupon cannot be redeemed if there are insufficient funds", async function () {
      const promoCode = "test";
      const result = await contractInstance.redeem(promoCode,{from: accounts[2]});
      const result1 = await contractInstance.redeem(promoCode,{from: accounts[3]});
      let err = null;
      try{
        const result2 = await contractInstance.redeem(promoCode,{from: accounts[4]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion balance insufficient to allocate to coupon');
    });

    it("Cannot redeem non existant coupon", async function () {
      const promoCode = "test1";
      let err = null;
      try{
        const result1 = await contractInstance.redeem(promoCode,{from: accounts[2]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
    });

    it("Coupon cannot be redeemed before valid date starts", async function () {
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2022, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      let err = null;
      try{
        const result1 = await contractInstance.redeem(promoCode,{from: accounts[2]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
    });

    it("Coupon cannot be redeemed after valid date ends", async function () {
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2020, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2020, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      let err = null;
      try{
        const result1 = await contractInstance.redeem(promoCode,{from: accounts[2]});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
    });

  })

  context("Test function for coupon transaction", async () => {

    beforeEach(async () => {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      await contractInstance.redeem(promoCode,{from: accounts[2]});
    });

    it("Coupon owner can do transaction with the coupon", async function () {
      const promoCode = "test";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("0.50", "ether"));;
      const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      assert.equal(result.receipt.status, true);
    });

    it("Coupon owner cannot spend more than the coupon balance", async function () {
      const promoCode = "test";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("2", "ether"));;
      let err = null;
      try{
        const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Coupon amount is greater than the balance');
    });

    it("Coupon transaction amount is greater than or equal to the minimum amount", async function () {
      const promoCode = "test";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("0.09", "ether"));;
      let err = null;
      try{
        const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Coupon transaction amount is lesser than the minimum amount');
    });

    it("Coupon transaction amount is lesser than or equal to the maximum amount", async function () {
      const promoCode = "test";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("0.60", "ether"));;
      let err = null;
      try{
        const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Coupon transaction amount is greater than the maximum amount');
    });

    it("Coupon owner cannot use a non existent promotion code", async function () {
      const promoCode = "test1";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("0.50", "ether"));;
      let err = null;
      try{
        const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
    });

    it("Only accounts that redeemed can use the promotion code", async function () {
      const promoCode = "test";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("0.50", "ether"));;
      let err = null;
      try{
        const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[3],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Caller Address has not redeemed the promotion code');
    });

    it("Coupon only can be spent before the valid date ends", async function () {
      let duration = time.duration.days(300);
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("0.50", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 01, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      var details = await contractInstance.checkPromotionDetails.call(promoCode);
      const couponAmt = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      await contractInstance.redeem(promoCode,{from: accounts[2]});
      // time gap between redemption and transaction to simulate doing transaction past valid date
      await time.increase(duration);
      let err = null;
      try{
        const result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      }catch(error){
        err = error; 
      }
      assert.equal(err.reason, 'Promotion is not currently valid');
    });

  })

  context("Test function for checkCouponBalance", async () => {

    beforeEach(async () => {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2022, 11, 01, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
      await contractInstance.redeem(promoCode,{from: accounts[2]});
    });

    it("Coupon owner can check coupon balance", async function () {
      const promoCode = "test";
      var result = await contractInstance.checkCouponBalance(promoCode, {from: accounts[2]});
      assert.notEqual(result, undefined);
    });

    it("Non Coupon owner cannot check coupon balance", async function () {
      const promoCode = "test";
      let err = null;
      try{
        var details = await contractInstance.checkCouponBalance(promoCode, {from: accounts[3]});
      }
      catch(error){
        err = error;
      }
      assert.equal(details, undefined);
    });

    it("Initial coupon balance is the total amount given per account for a promotion code", async function () {
      const promoCode = "test";
      var promoDetails = await contractInstance.checkPromotionDetails.call(promoCode);
      var details = await contractInstance.checkCouponBalance(promoCode, {from: accounts[2]});
      assert.equal(promoDetails.amt, details.totalPerAddress);
    });

    it("Coupon balance is deducted correctly when a transaction is made", async function () {
      const promoCode = "test";
      const couponAmt = web3.utils.toBN(web3.utils.toWei("0.50", "ether"));   
      var promoDetails = await contractInstance.checkCouponBalance(promoCode, {from: accounts[2]});
      // console.log(promoDetails.toString());
      const leftOverAmt = web3.utils.toBN(promoDetails.toString()).sub(couponAmt);
      result = await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2],value: web3.utils.toBN(web3.utils.toWei("1", "ether"))});
      var details = await contractInstance.checkCouponBalance(promoCode, {from: accounts[2]});
      assert.equal(leftOverAmt.toString(), details.toString());
    });

    // it("Coupon balance can only be checked before the valid date ends", async function () {
    //   let duration = time.duration.days(1000);
    //   const promoCode = "test";
    //   let err = null;
    //   // time gap between redemption and transaction to simulate doing transaction past valid date
    //   await time.increase(duration);
    //   try{
    //     var details = await contractInstance.checkCouponBalance(promoCode, {from: accounts[3]});
    //   }
    //   catch(error){
    //     err = error;
    //   }
    //   assert.equal(err.reason, undefined);
    // });
  })

  context("Test function for collectLeftoverEther", async () => {

    beforeEach(async () => {
      contractInstance = await ethCoupon.new();
      const promoCode = "test";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2021, 10, 15, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});
    });

    it("Leftover promotion balance can only be collected by the sponsor", async function () {
        // let duration = time.duration.days(-1000);
        // await time.increase(duration);
        const promoCode = "test";
        await contractInstance.collectLeftoverEther(promoCode,{from: accounts[0]});
        assert.equal(result.receipt.status, true);
    });

    it("Leftover promotion balance cannot be collected by other address", async function () {
        const promoCode = "test";
        try{
          await contractInstance.collectLeftoverEther(promoCode, {from: accounts[3]});
        }
        catch(error){
          err = error;
        }
        assert.equal(err.reason, "Caller Address is not the sponsor address of the promotion code");
    });

    it("It will fail when an invalid promotion code is entered", async function () {
        const promoCode = "test1";
        try{
          await contractInstance.collectLeftoverEther(promoCode, {from: accounts[0]});
        }
        catch(error){
          err = error;
        }
        assert.equal(err.reason, "Caller Address is not the sponsor address of the promotion code");
    });

    it("Leftover Ether cannot be collected before the valid date ends", async function () {
      const promoCode = "test1";
      const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
      const targetAddress = accounts[1];
      const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
      const endDate = Math.round((new Date(2030, 10, 15, 10, 33, 30)).getTime() / 1000);
      const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
      const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
      await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: web3.utils.toBN(web3.utils.toWei("2", "ether"))});

      try{
        await contractInstance.collectLeftoverEther(promoCode, {from: accounts[0]});
      }
      catch(error){
        err = error;
      }
      assert.equal(err.reason, "To collect leftover Ether, the promotion must expire first");
  });

  it("Leftover Ether is the same as original amount if no transactions are made", async function () {
    const promoCode = "test1";
    const sponsorAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    const totalPerAddress = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    const targetAddress = accounts[1];
    const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
    const endDate = Math.round((new Date(2023, 10, 15, 10, 33, 30)).getTime() / 1000);
    const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
    const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: sponsorAmt});
    // fast forward the time till the promotion expires
    let duration = time.duration.days(1000);
    await time.increase(duration);
    const result = await contractInstance.collectLeftoverEther(promoCode, {from: accounts[0]});
    assert.equal(result.logs[0].args.amount.toString(), sponsorAmt.toString());
});

  it("Leftover Ether is calculated properly when a coupon holder makes a transaction", async function () {
    const promoCode = "test1";
    const sponsorAmt = web3.utils.toBN(web3.utils.toWei("2", "ether"));
    const totalPerAddress = web3.utils.toBN(web3.utils.toWei("1", "ether"));
    const targetAddress = accounts[1];
    const startDate = Math.round((new Date(2021, 10, 01, 10, 33, 30)).getTime() / 1000);
    const endDate = Math.round((new Date(2026, 10, 15, 10, 33, 30)).getTime() / 1000);
    const minRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
    const maxRedeemAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    await contractInstance.mint(promoCode,totalPerAddress,targetAddress,startDate,endDate,minRedeemAmt,maxRedeemAmt,{from: accounts[0], value: sponsorAmt});
    await contractInstance.redeem(promoCode,{from: accounts[2]});
    const couponAmt = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
    await contractInstance.transaction(promoCode,couponAmt,{from: accounts[2]});
    // calculate the final ether collected by the sponsor
    var details = await contractInstance.checkPromotionalBalance.call(promoCode,{from: accounts[0]});
    const initialAmt = details.unspentEther;
    const finalEtherAmt = web3.utils.toBN(sponsorAmt.toString()).sub(couponAmt);
    // fast forward the time till the promotion expires
    let duration = time.duration.days(1000);
    await time.increase(duration);
    const result = await contractInstance.collectLeftoverEther(promoCode, {from: accounts[0]});
    assert.equal(result.logs[0].args.amount.toString(), finalEtherAmt.toString());
});

  })
});
