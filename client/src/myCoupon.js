import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import { NavLink } from "react-router-dom";
import {ADDRESS, ABI, CHAIN_ID, NETWORK_NAME} from './ABI'
// import { Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import { useWeb3React } from '@web3-react/core'
// import { InjectedConnector } from '@web3-react/injected-connector'
import {hello,getRedeemCouponInfo,getRedeem,getRedeemByAccountAndCouponHash,getPromotionForCouponHash} from './helper';
import RedeemTable from './RedeemTable';


class MyCoupon extends React.Component  {

    componentDidMount() {
        this.loadBlockchainData();
        this.toStorePromoCode = this.toStorePromoCode.bind(this);
        this.RedeemPromotion = this.RedeemPromotion.bind(this);
        

      }

      async loadBlockchainData(){
        const web3 = new Web3(Web3.givenProvider);
        const chainId = await web3.eth.getChainId();
        console.log(chainId);
        // Disable redeem button if chain ID is not correct
        var button = document.querySelector('#btn_RedeemPromotion');
        if(chainId != CHAIN_ID){
            alert("Incorrect chain ID. This application only runs on "+ NETWORK_NAME);
            button.disabled = true;
        }
        else{
            button.disabled = false;
        }
        this.setState({accountInfo: ''});
        var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
        const accounts = await web3.eth.getAccounts();
        // await GetAllPromoCodes(contractInstance);
    
        var that = this;
        var redeems = [];
    
        // redeems = await getRedeem(contractInstance,accounts[0]);
        redeems = await getRedeemCouponInfo(contractInstance,accounts[0]);
        console.log(redeems);
    
      }

    async RedeemPromotion(){
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
        console.log(accounts[0]);
        console.log(this.state.promoCode);

        // check if user has redemeed the coupon
        var redeemExist = await getRedeemByAccountAndCouponHash(contractInstance, web3.utils.keccak256(this.state.promoCode), accounts[0]);
        if(redeemExist == 0){
            // check if promotion code exist. If not, tell the user that it does not exist
            var couponExist = await getPromotionForCouponHash(contractInstance,web3.utils.keccak256(this.state.promoCode));
            if(couponExist != 0){
                contractInstance.methods.redeem(this.state.promoCode).send({from: accounts[0]})
                .on("transactionHash",function(hash){
                    var bool = window.confirm('Coupon redeem pending. User will be notified once it is confirmed. Click Ok to check transaction status.');
                    if(bool == true){
                        window.open("https://ropsten.etherscan.io/tx/" + hash);
                    }
                    // $('#myModal').modal('hide');
                    // window.location.reload(true);
                })
                .on("receipt",function(hash){
                    alert('Coupon redeem success');
                    // $('#myModal').modal('hide');
                    window.location.reload(true);
                })
                .on("error", function(error){
                    alert(error);
                });

            }
            else{
                alert("Coupon Does not exist");
            }
        }
        else{
            alert("User has already redemeed the coupon");
        }



      }

      toStorePromoCode(event){
        this.setState({promoCode: event.target.value});
        console.log(event.target.value);
      }

      constructor(props) {
        super(props)
        this.state = {promoCode: ''};
      }

    render(){

        const header = ["","Promotion Code","Date Redeemed","Target account","Starting Date","Ending Date","Redeemed Ether","Current Balance","Min Coupon Txn Amount","Max coupon txn amount"]

        return (
            
        <div class="container mt-5">
        <div class="row">
            <div style={{textAlign:'right'}}>
                <table style={{float:'right'}}>
                    <tr>
                        <td><input type="text" class="form-control" name="txtPromoCode" id="txtPromoCode" value={this.state.promoCode} onChange={this.toStorePromoCode} /></td><td><button type="button" class="btn btn-success" onClick={this.RedeemPromotion} id="btn_RedeemPromotion">Redeem Coupon</button></td>
                    </tr>
                </table>
            </div>
            <h5>My coupons</h5>
            <hr/>
            <br/>
            <br/>
            {/* <table class="table table-striped">
            <thead>
            <tr>
                <th></th>
                <th>Promotion Code</th>
                <th>Date Redemmed</th>
                <th>Target account</th>
                <th>Ether balance</th>
                <th>Starting Date</th>
                <th>Ending Date</th>
                <th>Redemmed Ether</th>
                <th>Min Coupon Txn Amount</th>
                <th>Max Coupon Txn Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th><i class="fa fa-credit-card"></i></th>
                <td>Ethereum</td>
                <td>01/12/2021</td>
                <td>0x28cd15e5B23a8bA95Bb4660c3d305Fb18081c517</td>
                <td>0.6</td>
                <td>15/01/2022</td>
                <td>20/01/2022</td>
                <td>2</td>
                <td>0.1</td>
                <td>0.5</td>
            </tr>
            </tbody>
        </table> */}
        <RedeemTable header={header}/>
        </div>
        </div>

        );
    }
}

export default MyCoupon;
