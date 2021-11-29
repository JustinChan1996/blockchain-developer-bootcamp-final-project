export const ADDRESS = 'INSERT CONTRACT ADDRESS HERE' // Smart Contract Address

export const CHAIN_ID = 0 // chain ID

export const NETWORK_NAME = 'INSERT NETWORK NAME HERE' // Network Name


export const ABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "couponHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "name": "CollectLeftOver",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "couponHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sponsorAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "targetAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "couponCode",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalEth",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amtPerAddress",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minRedeemAmt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxRedeemAmt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "dateCreated",
        "type": "uint256"
      }
    ],
    "name": "Promotion",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "couponHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "RedeemID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "name": "Redeem",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "couponHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "name": "TopUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "RedeemID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "couponAmt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "walletAmt",
        "type": "uint256"
      }
    ],
    "name": "Transaction",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalPerAddress",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "targetAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minRedeemAmt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxRedeemAmt",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      }
    ],
    "name": "collectLeftoverEther",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      }
    ],
    "name": "topUp",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      }
    ],
    "name": "checkPromotionalBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "leftOver",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "unspentEther",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      }
    ],
    "name": "redeem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "couponAmt",
        "type": "uint256"
      }
    ],
    "name": "transaction",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      }
    ],
    "name": "checkCouponBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "promoCode",
        "type": "string"
      }
    ],
    "name": "checkPromotionDetails",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalPerAddress",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isPromoValid",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "targetAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minRedeemAmt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxRedeemAmt",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
