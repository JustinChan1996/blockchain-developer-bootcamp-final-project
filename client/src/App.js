import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import {ADDRESS, ABI, CHAIN_ID, NETWORK_NAME} from './ABI'
import { Modal, Button } from "react-bootstrap";
import Table1 from './table';

import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link,
  Outlet,
  Routes
} from "react-router-dom";
import MyCoupon from "./myCoupon";
import {hello,getPromotion,getPromotionWithBalances,getPromotionForCouponHash} from './helper';

class App extends React.Component  {

  componentDidMount() {
    this.loadBlockchainData();
    this.Connect = this.Connect.bind(this);
  }

  async Connect(){
    if (window.ethereum) {
      // alert('installed');
      const address = await window.ethereum.enable();
      
      // alert(address);
      var outputText = '<b>Current Account:</b> ' + address + '   ';
      var that = this;

      const web3 = new Web3(Web3.givenProvider);
      // Get account balance
      web3.eth.getBalance(address.toString(), function(err, result) {
      if (err) {
        console.log(err)
      } else {
        var currentBalance = (Web3.utils.fromWei(result, "ether") + " <b>ETH</b>");
        // console.log(currentBalance);
        outputText = outputText + " " + currentBalance;
        console.log(outputText);
        that.setState({accountInfo: outputText});
        const btn_connectWallet = document.getElementById('btn_connectWallet');
        btn_connectWallet.style.display = 'none';
      }
    })

    console.log(outputText);
    this.setState({accountInfo: outputText});
    }
    else{
      alert('Metamask not installed');
    }
  }



  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    const chainId = await web3.eth.getChainId();
    console.log("Chain ID is " + chainId);
    this.setState({accountInfo: ''});
    var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
    const accounts = await web3.eth.getAccounts();
    // await GetAllPromoCodes(contractInstance);

    var that = this;
    var codeArray = [];
    var promoOrigin = [];
    var promo = [];
    var promoDate = [];
    var PromotionLimit = [];

    promo = await getPromotion(contractInstance,accounts[0]);
    console.log("from App");
    console.log(promo);

  }

  constructor(props) {
    super(props);
    this.state = {accountInfo: ''};
  }

render(){
  return(

    <div class="container">
    <div class="p-5 bg-primary text-white text-center">
  <h1>EthCoupon</h1>
  <p>Get free Ether to spend on products and services</p> 
</div>

<HashRouter basename="/">
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <ul class="navbar-nav me-auto">
        <li class="nav-item">
          {/* <a class="nav-link active" href="index.html">My Promotions</a> */}
          <Link to="/" class="nav-link active" >My Promotions</Link>
        </li>
        <li class="nav-item">
          {/* <a class="nav-link" href="myCoupons.html">My coupons</a> */}
          <Link to="/myCoupon" class="nav-link active" >My Coupons</Link>
        </li>
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item" style={{color: '#fff'}}>
       <div id="lblAcctInfo" style={{display: 'inline'}}><div style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: this.state.accountInfo}}></div>&nbsp;&nbsp;&nbsp;</div>
       <button type="button" class="btn btn-primary" id="btn_connectWallet" onClick={this.Connect}>Connect Wallet</button>
     </li>
   </ul>
  </div>
</nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myCoupon" element={<MyCoupon />} />
    </Routes>

</HashRouter>

</div>


  );
}
}

class Home extends React.Component  {

  componentDidMount() {
    // this.loadBlockchainData();
    this.checkChainID();
    this.CreateNewPromotion = this.CreateNewPromotion.bind(this);
    this.toStorePromoCode = this.toStorePromoCode.bind(this);
    this.toStoreAccount = this.toStoreAccount.bind(this);
    this.toStoreEther = this.toStoreEther.bind(this);
    this.toStoreStartDate = this.toStoreStartDate.bind(this);
    this.toStoreEndDate = this.toStoreEndDate.bind(this);
    this.toStoreMinSpendingAmt = this.toStoreMinSpendingAmt.bind(this);
    this.toStoreMaxSpendingAmt = this.toStoreMaxSpendingAmt.bind(this);
    this.toStoreAmount = this.toStoreAmount.bind(this);
  }

  toStorePromoCode(event){
    this.setState({promoCode: event.target.value});
    console.log(event.target.value);
  }

  toStoreAccount(event){
    this.setState({account: event.target.value});
    console.log(event.target.value);
  }

  toStoreEther(event){
    this.setState({ether: event.target.value});
    console.log(event.target.value);
  }

  toStoreAmount(event){
    this.setState({amount: event.target.value});
    console.log(event.target.value);
  }

  toStoreStartDate(event){
    this.setState({startDate: event.target.value});
    console.log(event.target.value);
  }

  toStoreEndDate(event){
    this.setState({endDate: event.target.value});
    console.log(event.target.value);
  }

  toStoreMinSpendingAmt(event){
    this.setState({minSpendingAmt: event.target.value});
    console.log(event.target.value);
  }

  toStoreMaxSpendingAmt(event){
    this.setState({maxSpendingAmt: event.target.value});
    console.log(event.target.value);
  }


  async checkChainID() {
    const web3 = new Web3(Web3.givenProvider);
    const chainId = await web3.eth.getChainId();
    console.log(chainId);
    this.setState({accountInfo: ''});
    var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
    const accounts = await web3.eth.getAccounts();
    // await GetAllPromoCodes(contractInstance);

    // var that = this;
    // var codeArray = [];
    // var promoOrigin = [];
    // var promo = [];
    // var promoDate = [];
    // var PromotionLimit = [];

    var button = document.querySelector('#btn_AddPromotion');
    if(chainId != CHAIN_ID){
        alert("Incorrect chain ID. This application only runs on "+ NETWORK_NAME);
        button.disabled = true;
    }
    else{
        button.disabled = false;
    }

    // promo = await getPromotionWithBalances(contractInstance,accounts[0]);
    // console.log(promo);
    // this.setState({testData:promo});
    // console.log("from Home");
    // console.log(this.state.testData);

  }

  async CreateNewPromotion(){
    // const web3 = new Web3(Web3.givenProvider);
    // const chainId = await web3.eth.getChainId();
    // alert(chainId);
    const web3 = new Web3(Web3.givenProvider);
    // const address = await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
    // var etherAmount = web3.utils.toBN(this.state.ether);
    var weiValue = web3.utils.toWei(this.state.ether.toString(),'ether');
    // var depositAmount = web3.utils.toBN(this.state.amount);
    var depositValue = web3.utils.toWei(this.state.amount,'ether');
    // var minSpendingAmt = web3.utils.toBN(this.state.minSpendingAmt);
    var minSpendingValue = web3.utils.toWei(this.state.minSpendingAmt,'ether');
    // var maxSpendingAmt = web3.utils.toBN(this.state.maxSpendingAmt);
    var maxSpendingValue = web3.utils.toWei(this.state.maxSpendingAmt,'ether');
    const startDate = Math.round((new Date(this.state.startDate.toString())).getTime() / 1000);
    const endDate = Math.round((new Date(this.state.endDate.toString())).getTime() / 1000);
    // console.log(address);
    
    console.log(accounts[0]);
    var that = this;

    // Check if promotion code exists. Do not continue if promotion code already exists
    var couponExists = await getPromotionForCouponHash(contractInstance, web3.utils.keccak256(this.state.promoCode));
    if(couponExists == 0){
      contractInstance.methods.mint(this.state.promoCode, weiValue, this.state.account, startDate, endDate, minSpendingValue, maxSpendingValue).send({from: accounts[0], value: depositValue})
      .on("transactionHash",function(hash){
        var bool = window.confirm('Promotion creation pending. User will be notified once it is confirmed. Click Ok to check transaction status.');
        if(bool == true){
          window.open("https://ropsten.etherscan.io/tx/" + hash);
        }
        that.close();
        // $('#myModal').modal('hide');
        // window.location.reload(true);
      })
      .on("receipt",function(hash){
        alert('Promotion add success');
        that.close();
        window.location.reload(true);
      })
      .on("error", function(error){
        alert(error);
      });
    }
    else{
      alert("Promotion code already exists");
    }
    
    



  }

  open() {
    this.setState({showModal: true});
  }
  
  close() {
    this.setState({showModal: false});
  }

  constructor(props) {
    super(props)
    this.state = {promoCode: '', account: '', ether: '' ,startDate: '',endDate: '',minSpendingAmt: '',maxSpendingAmt: '',amount:'',testData:''};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }


  render(){

    const header = ["","Promotion Code","Date Created","Target account","Starting Ether balance","Present Ether Balance","Starting Date","Ending Date","Ether per Account","Min coupon txn amount","Max coupon txn amount"]

      return (


        <>
        <div class="container mt-5">
          <div class="row">
            <div style={{ textAlign: 'right' }}>
              {/* <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal1">Add New Promotion</button> */}
              <button type="button" class="btn btn-success" onClick={this.open} id="btn_AddPromotion">Add New Promotion</button> 
            </div>
            <h5>My Promotions</h5>
            <hr />
            <br />
            {/* <table class="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Promotion Code</th>
                  <th>Date Created</th>
                  <th>Target account</th>
                  <th>Starting Ether Balance</th>
                  <th>Present Ether Balance</th>
                  <th>Starting Date</th>
                  <th>Ending Date</th>
                  <th>Ether per account</th>
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
                  <td>500</td>
                  <td>100</td>
                  <td>15/01/2022</td>
                  <td>20/01/2022</td>
                  <td>2</td>
                  <td>0.1</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <th><i class="fa fa-credit-card"></i></th>
                  <td>Doge</td>
                  <td>01/12/2021</td>
                  <td>0x28cd15e5B23a8bA95Bb4660c3d305Fb18081c511</td>
                  <td>500</td>
                  <td>100</td>
                  <td>15/01/2022</td>
                  <td>20/01/2022</td>
                  <td>2</td>
                  <td>0.1</td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <th><i class="fa fa-window-close-o"></i></th>
                  <td>DogeElonMars</td>
                  <td>01/11/2021</td>
                  <td>0x28cd15e5B23a8bA95Bb4660c3d305Fb18081c510</td>
                  <td>500</td>
                  <td>0</td>
                  <td>10/11/2021</td>
                  <td>15/11/2021</td>
                  <td>2</td>
                  <td>0.1</td>
                  <td>0.5</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
        {/* {this.state.testData.length} */}
        <Table1 header={header}/>
      
          <Modal className="myModal1" 
          show={this.state.showModal} 
          onHide={this.close}
          animation={true} 
      bsSize="small">

          <Modal.Header closeButton>
      <Modal.Title>Create New Promotion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <table>
                    <tr style={{ height: '45px' }}>
                      <td style={{ width: '200px' }}>Promotion code:</td>
                      <td><input type="text" class="form-control" name="txtPromoCode" value={this.state.promoCode} onChange={this.toStorePromoCode} /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Target Account:</td>
                      <td><input type="text" class="form-control" name="txtAccount" value={this.state.account} onChange={this.toStoreAccount} /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Ether Deposited:</td>
                      <td><input type="text" class="form-control" name="txtEtherDeposited" value={this.state.amount} onChange={this.toStoreAmount}  /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Ether per account:</td>
                      <td><input type="text" class="form-control" name="txtEtherPerAccount" value={this.state.ether} onChange={this.toStoreEther}  /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Starting Date:</td>
                      <td><input type="datetime-local" class="form-control" name="txtStartingDate" value={this.state.startDate} onChange={this.toStoreStartDate} /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Ending Date:</td>
                      <td><input type="datetime-local" class="form-control" name="txtEndingDate" value={this.state.endDate} onChange={this.toStoreEndDate}  /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Min Spending Amount:</td>
                      <td><input type="text" class="form-control" name="txtMinSpendingAmount" value={this.state.minSpendingAmt} onChange={this.toStoreMinSpendingAmt} /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Max Spending Amount:</td>
                      <td><input type="text" class="form-control" name="txtMaxSpendingAmount" value={this.state.maxSpendingAmt} onChange={this.toStoreMaxSpendingAmt}  /></td>
                    </tr>
                  </table>
          </Modal.Body>

          <Modal.Footer>
            <button type="button" class="btn btn-success" onClick={this.CreateNewPromotion} id="btn_CreateNewPromotion">Add New Promotion</button>
            <button type="button" class="btn btn-danger" onClick={this.close}>Close</button>
          </Modal.Footer>         
        </Modal> 

          </>

      );
  }
}

export default App;

