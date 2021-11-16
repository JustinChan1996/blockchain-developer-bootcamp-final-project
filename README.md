**EthCoupon: A smart contract to give out free Ethereum for people to spent at a certain address**

**Smart contract overview**: EthCoupon is a smart contract that allow people to hand out free Ether to other Ether users that only can be spend in specific Ethereum addresses like how shopping coupons work. Shopping coupon works in real life by 
giving people coupons that allow them to spend a specific amount of given money at only specific outlets. Thus, this smart contract is bringing the concept of shopping coupons to the Ethereum blockchain whereby account holders can redeem free Ether to be spent at addresses that are specified by the coupon author. For example: If the account gives out 5 Ether that only can be given to address 0x71C7656EC7ab88b098defB751B7401B5f6d8976F, the person who redeems the free Ether cannot give it to address 0x81C7656EC7ab88b098defB751B7401B5f6d8976F but instead only can give to account 0x71C7656EC7ab88b098defB751B7401B5f6d8976F. 

Account holders that redeemed the free Ether can top up the redeemed amount by adding more funds from their existing Ethereum wallet. Through this system, it is hoped that third party organisations and account holders can hold promotions to encourage adoption of early stage DAPPS(decentralised applications) by giving out free Ethereum for people to spend at the specific DAPPS that the organisation or account holder is currently sponsoring. Moreover, this smart contract can help promote Ether as a means of payment by offering rebates if the user does any transaction to the specified Ethereum address. Currently, the bottleneck of DAPPS adoption is the lack of financial rebates for early adopters to try out the DAPP before it becomes popular unlike in the real world where financial rebates and discount are given to people to encourage purchase of items.  For example: I can lock up 1000 Ethereum to allow people to spend 0.05 Ethereum each at the at ethereum address 0x81C7656EC7ab88b098defB751B7401B5f6d8976F. Thus, I provide opportunity for 20000 people for spend free 0.05 Ethereum each at Ethereum address 0x81C7656EC7ab88b098defB751B7401B5f6d8976F. Besides redeem amount, the valid date range, minimum transaction amount and maximum transaction amount of the transaction can be made by the promotion organisers.  When the promotional fund balance is low, the promotion sponsor can top up more funds for the promotion using the smart contract.

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
