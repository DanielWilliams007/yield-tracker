const BaseProvider = require('./base');
const { ethers } = require('ethers');

class AaveProvider extends BaseProvider {
  constructor(rpcUrl) {
    super('Aave');
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    // Aave V3 pool address on mainnet
    this.poolAddress = '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2';
  }

  async fetchData() {
    try {
      // simplified for now
      this.data = {
        protocol: 'Aave V3',
        timestamp: Date.now(),
        pools: []
      };
    } catch (error) {
      console.error('Aave fetch error:', error);
    }
  }
}

module.exports = AaveProvider;