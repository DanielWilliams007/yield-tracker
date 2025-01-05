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
      // using aave subgraph for now
      const data = await this.fetchFromSubgraph();
      this.data = {
        protocol: 'Aave V3',
        timestamp: Date.now(),
        reserves: data
      };
    } catch (error) {
      console.error('Aave fetch error:', error);
      this.data = { protocol: 'Aave V3', timestamp: Date.now(), reserves: [] };
    }
  }

  async fetchFromSubgraph() {
    // mock data for now
    return [
      { symbol: 'USDC', depositAPY: 2.1, borrowAPY: 3.5 },
      { symbol: 'DAI', depositAPY: 1.8, borrowAPY: 3.2 }
    ];
  }
}

module.exports = AaveProvider;