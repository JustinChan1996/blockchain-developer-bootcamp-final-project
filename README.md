**EthCoupon: A smart contract to give out free Ethereum for people to spent at a certain address**

**Front end URL location:** https://justinchan1996.github.io/EthCoupon-FrontEnd/#/

**Walkthrough video URL:** https://www.youtube.com/watch?v=DUIWO0e_8RY

**Ropsten Smart Contract Address:** `0xE11291A837C7d72D05381d3c89F8292851fFFaFf`

**Installation steps:**

1. Run the `yarn install` command to install all the package dependencies
2. Run the `truffle compile` command to compile the smart contract source code files.
3. In another terminal window, run the `ganache-cli` command to start a local blockchain for testing.
3. Run the `truffle test` command to run all the unit tests.
4. Set the correct port number for the development blockchain in the truffle-config.js file.
5. Run the `truffle migrate development` command to deploy smart contract to local testnet.

**Ropsten network deployment steps(Optional):**

If user does not have an Ethereum seed phrase

1. Generate a random 12 word seed phrase. 
2. Paste the seed phrase generated in step 1 in the `const mnemonic =` section of the truffle-config.js file. 
3. Generate an Ethereum address based on the seed phrase.
4. Paste the Ethereum address in the `from:` field in the ropsten section of the network section of the truffle-config.js file. 
5. Paste the Infura project ID in the `const projectID  = ` section of the truffle-config.js file. 
6. Run the `truffle deploy --network ropsten` to deploy the smart contract to Ropsten network.
7. After the deployment has done, verify the contract address in Etherscan. 

If user does have an Ethereum seed phrase

1. Paste the seed phrase generated in the `const mnemonic = ` section of the truffle-config.js file. 
2. Paste the Infura project ID in the `const projectID  = ` section of the truffle-config.js file. 
3. Generate a new Ethereum address based on the seed phrase.
4. Paste the Ethereum address in the `from:` field in the ropsten section of the network section of the truffle-config.js file. 
5. Run the `truffle deploy --network ropsten` to deploy the smart contract to Ropsten network.
6. After the deployment has done, verify the contract address in Etherscan. 

**Directory Structure**

```
├── README.md
├── avoiding_common_attacks.md
├── build
│   └── contracts
│       ├── EthCoupon.json
│       ├── Migrations.json
│       └── ReentrancyGuard.json
├── contracts
│   ├── EthCoupon.sol
│   └── Migrations.sol
├── design_pattern_decisions.md
├── finalprojectchecklist-211015-155241.txt
├── migrations
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── package-lock.json
├── package.json
├── process.env
├── test
│   └── create_promotion.js
├── truffle-config.js
└── yarn.lock
```

**Smart contract overview**: EthCoupon is a smart contract that allow people to hand out free Ether to other Ether users that only can be spend in specific Ethereum addresses like how shopping coupons work. Shopping coupon works in real life by 
giving people coupons that allow them to spend a specific amount of given money at only specific outlets. Thus, this smart contract is bringing the concept of shopping coupons to the Ethereum blockchain whereby account holders can redeem free Ether to be spent at addresses that are specified by the coupon author. For example: If the account gives out 5 Ether that only can be given to address 0x71C7656EC7ab88b098defB751B7401B5f6d8976F, the person who redeems the free Ether cannot give it to address 0x81C7656EC7ab88b098defB751B7401B5f6d8976F but instead only can give to account 0x71C7656EC7ab88b098defB751B7401B5f6d8976F. 

Account holders that redeemed the free Ether can top up the redeemed amount by adding more funds from their existing Ethereum wallet. Through this system, it is hoped that third party organisations and account holders can hold promotions to encourage adoption of early stage DAPPS(decentralised applications) by giving out free Ethereum for people to spend at the specific DAPPS that the organisation or account holder is currently sponsoring. Moreover, this smart contract can help promote Ether as a means of payment by offering rebates if the user does any transaction to the specified Ethereum address. 

Currently, the bottleneck of DAPPS adoption is the lack of financial rebates for early adopters to try out the DAPP before it becomes popular unlike in the real world where financial rebates and discount are given to people to encourage purchase of items.  For example: I can lock up 1000 Ethereum to allow people to spend 0.05 Ethereum each at the at ethereum address 0x81C7656EC7ab88b098defB751B7401B5f6d8976F. Thus, I provide opportunity for 20000 people for spend free 0.05 Ethereum each at Ethereum address 0x81C7656EC7ab88b098defB751B7401B5f6d8976F. Besides redeem amount, the valid date range, minimum transaction amount and maximum transaction amount of the transaction can be made by the promotion organisers.  When the promotional fund balance is low, the promotion sponsor can top up more funds for the promotion using the smart contract.

**Stakeholders in the system**

1. Sponsor(Account holder that initiates the promotion and provide the funds)
2. Account holder(Redeems promotional amount and spends the free Ethereum at the selected address)

**Use cases:**

1. Mint coupon(Sponsor)
2. Collect leftover Ether(Sponsor)
3. Top up Promotion fund(Sponsor)
4. Redeem coupon(User)
5. Execute transaction(User)
6. Check promotion balance(Sponsor)
7. Check coupon details(public)
8. Check coupon balance(User)

**Assumptions:**

1. Sponsor cannot change the details of the promotion after it is created.
2. At present, only ether sending to another account is supported. No smart contract specific function calls are supported but it will be a future function.
