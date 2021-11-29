import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import {ADDRESS, ABI} from './ABI'
import { Modal, Button } from "react-bootstrap";
import {hello,getPromotion,getPromotionWithBalances} from './helper';

class Table1 extends React.Component  {

    componentDidMount() {
        this.loadBlockchainData();
        this.TopUpFunds = this.TopUpFunds.bind(this);
        this.reclaimEthers = this.reclaimEthers.bind(this);
        this.showTopUpModal = this.showTopUpModal.bind(this);
        this.toStoreAmount = this.toStoreAmount.bind(this);
      }

      toStoreAmount(event){
        this.setState({amount: event.target.value});
        console.log(event.target.value);
      }

      showTopUpModal(e){
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
    
        promo = await getPromotionWithBalances(contractInstance,accounts[0]);
        console.log(promo);
        this.setState({testData:promo});
        console.log("from Home");
        console.log(this.state.testData);
    
      }

    constructor(props) {
        super(props);
        this.state = {testData: '',promoCode: ''};
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        // console.log("list data is " + JSON.stringify(this.props.testData));
      }

      open() {
        this.setState({showModal: true});
      }
      
      close() {
        this.setState({showModal: false});
      }

      async TopUpFunds(){
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
        var weiValue = web3.utils.toWei(this.state.amount.toString(),'ether');

        var that = this;

        contractInstance.methods.topUp(this.state.promoCode).send({from: accounts[0], value: weiValue})
        .on("transactionHash",function(hash){
          var bool = window.confirm('Promotion top up pending. User will be notified once it is confirmed. Click Ok to check transaction status.');
          if(bool == true){
            window.open("https://ropsten.etherscan.io/tx/" + hash);
          }
          that.close();
          // $('#myModal').modal('hide');
          // window.location.reload(true);
        })
        .on("receipt",function(hash){
          alert('Promotion top up success');
          window.location.reload(true);
        })
        .on("error", function(error){
          alert(error);
        });

      }

    async reclaimEthers(e){
        e.preventDefault();
        var promoCode = e.currentTarget.value;

        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        var contractInstance = new web3.eth.Contract(ABI, ADDRESS);
        // var weiValue = web3.utils.toWei(this.state.amount.toString(),'ether');

        var that = this;


        contractInstance.methods.collectLeftoverEther(promoCode).send({from: accounts[0]})
        .on("transactionHash",function(hash){
          var bool = window.confirm('Ether withdrawal pending. User will be notified once it is confirmed. Click Ok to check transaction status.');
          if(bool == true){
            window.open("https://ropsten.etherscan.io/tx/" + hash);
          }
          // $('#myModal').modal('hide');
          // window.location.reload(true);
        })
        .on("receipt",function(receipt){
          console.log(receipt);
          alert(web3.utils.fromWei(receipt.events.CollectLeftOver.returnValues.amount,"ether") + ' unspent remaining Ether reclaimed by user');
          window.location.reload(true);
        })
        .on("error", function(error){
          console.log(error);
          alert(error);
        });
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
                  {console.log("List data is ")}
                              {console.log(listData)}
                    const rows = [];
                    for (let i = 0; i < listData.length; i++) {
                    // For promotions sponsored, only show active and expired promotions if unclaimed
                    if(!(new Date() > new Date(listData[i].endDate * 1000) && (Web3.utils.fromWei(Web3.utils.toBN(listData[i].Balance),"ether") == 0))){
                      rows.push(<tr>
                        <td> {(() => {
                          if(new Date() > new Date(listData[i].endDate * 1000)){
                            return <><button type="button" class="btn" title="Reclaim unspent Ethers" value={listData[i].couponCode} onClick={this.reclaimEthers}><i class="fa fa-times"></i></button></>
                          }
                          else{
                            return <><button type="button" class="btn" title="Top up promotion" value={listData[i].couponCode} onClick={this.showTopUpModal}><i class="fa fa-credit-card"></i></button></>
                          }
                          })()}</td>
                        {/* <td><button type="button" class="btn" title="top up promotion" value={listData[i].couponCode} onClick={this.showTopUpModal}><i class="fa fa-credit-card"></i></button></td> */}
                        <td>{listData[i].couponCode}</td>
                        <td>{new Date(listData[i].dateCreated * 1000).toLocaleString()}</td>
                        <td>{listData[i].targetAddress}</td>
                        <td>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].totalEth),"ether")}</td>
                        {/* <td>{listData[i].unspentEther}</td> */}
                        <td><b>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].Balance),"ether")}</b></td>
                        <td>{new Date(listData[i].startDate*1000).toLocaleString()}</td>
                        <td>{new Date(listData[i].endDate*1000).toLocaleString()}</td>
                        <td>{Web3.utils.fromWei(Web3.utils.toBN(listData[i].amtPerAddress),"ether")}</td>
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

            <Modal className="modalTopUp" 
          show={this.state.showModal} 
          onHide={this.close}
          animation={true} 
      bsSize="small">

                      <Modal.Header closeButton>
      <Modal.Title>Top Up Promotion Funds</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <table>
                    <tr style={{ height: '45px' }}>
                      <td style={{ width: '200px' }}>Promotion code:</td>
                      <td><input type="text" class="form-control" name="txtPromoCode" value={this.state.promoCode} onChange={this.toStorePromoCode} disabled/></td>
                    </tr>
                    <tr style={{ height: '45px' }}>
                      <td>Amount top up(eth):</td>
                      <td><input type="text" class="form-control" name="txtAmt" value={this.state.amount} onChange={this.toStoreAmount} /></td>
                    </tr>
                  </table>
          </Modal.Body>

          <Modal.Footer>
            <button type="button" class="btn btn-success" onClick={this.TopUpFunds} id="btn_TopUp">Top Up Promotion Funds</button>
            <button type="button" class="btn btn-danger" onClick={this.close}>Close</button>
          </Modal.Footer>         
        </Modal> 

          </>
        );
    }
}

export default Table1;