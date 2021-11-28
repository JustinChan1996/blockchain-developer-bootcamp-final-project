const EthCoupon = artifacts.require('./EthCoupon.sol');

module.exports = function(deployer) {
    deployer.deploy(EthCoupon);
};
