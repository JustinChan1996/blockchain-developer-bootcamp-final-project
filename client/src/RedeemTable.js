import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import {ADDRESS, ABI} from './ABI'
import {hello,getPromotion,getRedeemCouponInfo,getCouponWithBalance} from './helper';
import { Modal, Button } from "react-bootstrap";

class RedeemTable extends React.Component  {

    componentDidMount() {
        this.loadBlockchainData();
        this.toStoreCouponAmt = this.toStoreCouponAmt.bind(this);
        this.toStoreWalletAmt = this.toStoreWalletAmt.bind(this);
        this.showTransactionModal = this.showTransactionModal.bind(this);
        this.PerformTransaction = this.PerformTransaction.bind(this);
      }

      toStoreCouponAmt(event){
        this.setState({couponAmt: event.target.value});
        console.log(event.target.value);
      }

      toStoreWalletAmt(event){
        this.setState({walletAmt: event.target.value});
        console.log(event.target.value);
      }

      showTransactionModal(e){
        // event.preventDefault();
        // alert("hello " + event.target.value);
        e.preventDefault();
        var promoCodeValue = e.currentTarget.value;
        this.setState({promoCode: promoCodeValue});
        this.open();
        //console.log(e.currentTarget.value);
        
      }

      async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider);
        const chainId = await web3.eth.getChainId();
        console.log(chainId);
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
    
        promo = await getCouponWithBalance(contractInstance,accounts[0]);
        console.log("Promo data is ");
        console.log(promo);
        this.setState({testData:promo});
        console.log("from Home");
        console.log(this.state.testData);
    
      }

    async PerformTransaction(){
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      var contractInstance = new web3.eth.Contract(ABI, ADDRESS);

      // console.log(this.state);
      var couponAmt = this.state.couponAmt;
      var walletAmt = this.state.walletAmt;
      console.log('state value is ' + couponAmt);
      console.log('state value is ' + walletAmt);
      var couponAmt = web3.utils.toWei(couponAmt,'ether');
      var walletAmt = web3.utils.toWei(walletAmt,'ether');

      var that = this;

      contractInstance.methods.transaction(this.state.promoCode,couponAmt).send({from: accounts[0],value: walletAmt})
      .on("transactionHash",function(hash){
        var bool = window.confirm('Transaction pending. User will be notified once it is confirmed. Click Ok to check transaction status.');
        if(bool == true){
          window.open("https://ropsten.etherscan.io/tx/" + hash);
        }
        that.close();
        // $('#myModal').modal('hide');
        // window.location.reload(true);
      })
      .on("receipt",function(hash){
          alert('Transaction success');
          // $('#myModal').modal('hide');
          window.location.reload(true);
      })
      .on("error", function(error){
          alert(error);
      });
    }

    open() {
      this.setState({showModal: true});
    }
    
    close() {
      this.setState({showModal: false});
    }

    constructor(props) {
        super(props);
        this.state = {testData: ''};
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        // console.log("list data is " + JSON.stringify(this.props.testData));
      }



    render(){
        const tableHeader = this.props.header;
        var listData = this.state.testData;
        return (
            <>
            <table class="table table-striped">
              <thead>
                <tr>
                {tableHeader.map((header) => <th>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {(() => {
                    const rows = [];
                    for (let i = 0; i < listData.length; i++) {
                    // display only active coupons
                    if(!(new Date() > new Date(listData[i].endDate * 1000))){
                        rows.push(<tr>
                          <td> {(() => {
                            // Only allow transactions if the coupon balance is a non zero value
                          if(Web3.utils.fromWei(Web3.utils.toBN(listData[i].Balance),"ether") > 0){
                            return <><button type="button" class="btn" title="Spend coupon value" value={listData[i].couponCode} onClick={this.showTransactionModal}><i class="fa fa-credit-card"></i></button></>
                          }
                          })()}</td>
                        {/* <td><button type="button" class="btn" title="Spend coupon value" value={listData[i].couponCode} onClick={this.showTransactionModal}><i class="fa fa-credit-card"></i></button></td> */}
                        <td>{listData[i].couponCode}</td>
                        <td>{new Date(listData[i].date * 1000).toLocaleString()}</td>
                        <td>{listData[i].targetAddress}</td>
                        {/* <td>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].totalEth),"ether")}</td> */}
                        <td>{new Date(listData[i].startDate*1000).toLocaleString()}</td>
                        <td>{new Date(listData[i].endDate*1000).toLocaleString()}</td>
                        <td>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].amtPerAddress),"ether")}</td>
                        <td><b>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].Balance),"ether")}</b></td>
                        <td>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].minRedeemAmt),"ether")}</td>
                        <td>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].maxRedeemAmt),"ether")}</td>
                        </tr>);
                      }
                    }
                    return rows;
                })()
                }
              </tbody>
            </table>
            {/* {JSON.stringify(listData)} */}

            <Modal className="modalTransaction" 
          show={this.state.showModal} 
          onHide={this.close}
          animation={true} 
      bsSize="small">

            <Modal.Header closeButton>
      <Modal.Title>Spend coupon value</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <table>
                    <tr style={{ height: '45px' }}>
                      <td style={{ width: '200px' }}>Promotion code:</td>
                      <td><input type="text" class="form-control" name="txtPromoCode" value={this.state.promoCode} onChange={this.toStorePromoCode} disabled/></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Coupon amount(eth):</td>
                      <td><input type="text" class="form-control" name="txtCouponAmt" value={this.state.couponAmt} onChange={this.toStoreCouponAmt} /></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Wallet amount(eth):</td>
                      <td><input type="text" class="form-control" name="txtWalletAmt" value={this.state.walletAmt} onChange={this.toStoreWalletAmt} /></td>
                    </tr>
                  </table>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" class="btn btn-success" onClick={this.PerformTransaction} id="btn_transaction">Perform Transaction</button>
            <button type="button" class="btn btn-danger" onClick={this.close}>Close</button>
          </Modal.Footer>         
        </Modal> 

          </>
        );
    }
}

export default RedeemTable;