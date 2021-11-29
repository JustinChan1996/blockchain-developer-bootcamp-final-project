import Web3 from 'web3'

export function hello(){
    alert('hello');
}

export function getPromotion(contractInstance,account){
    return new Promise(function(resolve, reject) {
        var codeArray = [];
        contractInstance.getPastEvents('Promotion', {
            filter: {sponsorAddress:account}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){
          console.log(events);
          if(events.length > 0){
            // console.log(events[0].returnValues); 
            for(var i=0;i<events.length;i++){
              
              // Get promotional balance for all of them
              // console.log(events[i].returnValues["couponCode"]);
              // var res = await GetPromotionBalance(contractInstance,account,events[i].returnValues["couponCode"]);
              // console.log("Balance is " + res.leftOver);
              // events[i].returnValues.Balance = res.leftOver;
              // events[i].returnValues.unspentEther = res.unspentEther;
              // console.log(events[i].returnValues);
              codeArray.push(events[i].returnValues);
              // codeArray.push([events[i].returnValues.couponCode,events[i].returnValues.sponsorAddress,new Date(events[i].returnValues.dateCreated*1000),events[i].returnValues.targetAddress,Web3.utils.fromWei(events[i].returnValues.totalEth,"ether"),Web3.utils.fromWei(events[i].returnValues.amtPerAddress,"ether"),Web3.utils.fromWei(events[i].returnValues.minRedeemAmt,"ether"),Web3.utils.fromWei(events[i].returnValues.maxRedeemAmt,"ether"),new Date(events[i].returnValues.startDate*1000),new Date(events[i].returnValues.endDate*1000)]);
            }
            resolve(codeArray);            
          }
          })
        .then(function(events){
        });
    });
}

export function getPromotionForCouponHash(contractInstance,hash){
  return new Promise(function(resolve, reject) {
      var codeArray = [];
      contractInstance.getPastEvents('Promotion', {
          filter: {couponHash:hash}, // Using an array means OR: e.g. 20 or 23
          fromBlock: 0,
          toBlock: 'latest'
      }, function(error, events){
        console.log(events);
        if(events.length > 0){
          // console.log(events[0].returnValues); 
          // for(var i=0;i<events.length;i++){
            codeArray.push(events[0].returnValues);
          // }
        }
        resolve(codeArray);            
        })
      .then(function(events){
      });
  });
}


export function getRedeem(contractInstance,account){
    return new Promise(function(resolve, reject) {
        var codeArray = [];
        contractInstance.getPastEvents('Redeem', {
            filter: {user:account}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){
          console.log(events);
          if(events.length > 0){
            // console.log(events[0].returnValues);
            for(var i=0;i<events.length;i++){
              codeArray.push(events[i].returnValues);
            } 
            resolve(codeArray);            
          }
          })
        .then(function(events){
        });
    });
}

export function getRedeemByAccountAndCouponHash(contractInstance,couponhash,account){
  return new Promise(function(resolve, reject) {
      var codeArray = [];
      contractInstance.getPastEvents('Redeem', {
          filter: {couponHash: couponhash, user:account}, // Using an array means OR: e.g. 20 or 23
          fromBlock: 0,
          toBlock: 'latest'
      }, function(error, events){
        console.log(events);
        if(events.length > 0){
            codeArray.push(events[0].returnValues);
        }
        resolve(codeArray); 
        })
      .then(function(events){
      });
  });
}

export async function getRedeemCouponInfo(contractInstance,account){
    // return new Promise(function(resolve, reject) {

      var redeems = await getRedeem(contractInstance,account);
      for(var i=0;i<redeems.length;i++){
        var couponInfo = await getPromotionForCouponHash(contractInstance,redeems[i][0]);
        // append promotion code,target account, starting date, ending date, amount redemmed, min coupon txn amount and max coupon txn amount
        console.log(couponInfo)
        if(couponInfo.length > 0){
          redeems[i]["couponCode"] = couponInfo[0].couponCode;
          redeems[i]["startDate"] = couponInfo[0].startDate;
          redeems[i]["endDate"] = couponInfo[0].endDate;
          redeems[i]["endDate"] = couponInfo[0].endDate;
          redeems[i]["amtPerAddress"] = couponInfo[0].amtPerAddress;
          redeems[i]["minRedeemAmt"] = couponInfo[0].minRedeemAmt;
          redeems[i]["maxRedeemAmt"] = couponInfo[0].maxRedeemAmt;
          redeems[i]["targetAddress"] = couponInfo[0].targetAddress;
        }
      }
      return redeems;
}

export function GetPromotionBalance(contractInstance,account,promoCode){
   return new Promise(function(resolve, reject) {
    // var details = await contractInstance.checkPromotionalBalance.call(promoCode,{from: account});
    // console.log(details);
    // // return resolve(details);
    // return details;
    contractInstance.methods.checkPromotionalBalance(promoCode).call({from: account})
    .then(function(result){
        console.log(result);
        return(resolve(result));
    });
   });

}

export function GetCouponBalance(contractInstance,account,promoCode){
  return new Promise(function(resolve, reject) {
   // var details = await contractInstance.checkPromotionalBalance.call(promoCode,{from: account});
   // console.log(details);
   // // return resolve(details);
   // return details;
   contractInstance.methods.checkCouponBalance(promoCode).call({from: account})
   .then(function(result){
       console.log(result);
       return(resolve(result));
   });
  });

}

export async function getPromotionWithBalances(contractInstance,account){
    var promoList = await getPromotion(contractInstance,account);
    for(var i=0;i<promoList.length;i++){
      console.log("Promotion code is " + promoList[i]["couponCode"]);
      var res = await GetPromotionBalance(contractInstance,account,promoList[i]["couponCode"]);
      // append promotion code,target account, starting date, ending date, amount redemmed, min coupon txn amount and max coupon txn amount
      console.log("Coupon " + promoList[i]["couponCode"] + " still has " + res.leftOver);
      // if(res.length > 0){
        promoList[i]["Balance"] = res.leftOver;
        promoList[i]["unspentEther"] = res.unspentEther;
      // }
      
    }
    return promoList;
}

export async function getCouponWithBalance(contractInstance,account){
  var couponList = await getRedeemCouponInfo(contractInstance,account);
  for(var i=0;i<couponList.length;i++){
    console.log("Coupon code is " + couponList[i]["couponCode"]);
    var res = await GetCouponBalance(contractInstance,account,couponList[i]["couponCode"]);
    // append promotion code,target account, starting date, ending date, amount redemmed, min coupon txn amount and max coupon txn amount
    console.log("Coupon " + couponList[i]["couponCode"] + " still has " + res);
    // if(res.length > 0){
    couponList[i]["Balance"] = res;
    console.log(couponList);
    // }    
  }
  return couponList;
}

