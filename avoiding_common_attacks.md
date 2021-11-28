**SWC-104: Unchecked Call Return Value**

In the function `collectLeftoverEther()` and `transaction()`, the return value of the call function to transfer Ether is checked to see if the call is successful. If not, the transaction will revert.

**SWC-105: Unprotected Ether Withdrawal**

After the promotion time period ends, only the promotion sponsor who created it and deposits funds into it can withdraw the remaining funds back to his/her account using the function `collectLeftoverEther()`. Not even the contract creator can withdraw remaining funds from the contract that belongs to the promotion.

**SWC-107: Reentrancy**

In this smart contract, there are two functions which involves transfering Ether from the smart contract to another address which are `transaction()` and `collectLeftoverEther()`. Before any call functions to transfer Ether are called, all the state changes to the coupon's and promotion balances are made so that re-entrancy attacks will fail as the state would have already changed if the attack occurs.