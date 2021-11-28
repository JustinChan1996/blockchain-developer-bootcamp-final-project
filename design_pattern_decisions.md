**Inheritance and Interfaces**

`EthCoupon` smart contract inherits from the OpenZeppelin `ReentrancyGuard` contract which provides protection against reentrancy attacks for functions that involve Ether transactions to external accounts which are `collectLeftoverEther()` and `transaction()`.

**Access control design patterns**

The `collectLeftoverEther()` function only restricts collection of leftover Ether from a promotional campaign to only the promotion sponsor. Moreover, the `transaction()` verifies the caller contract for a promotional code by checking the `msg.sender` parameter.