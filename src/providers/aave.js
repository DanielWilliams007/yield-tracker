const BaseProvider = require('./base');
const { ethers } = require('ethers');
const logger = require('../utils/logger');

class AaveProvider extends BaseProvider {
  constructor(rpcUrl) {
    super('Aave');
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    // Aave V3 pool address on mainnet
    this.poolAddress = '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2';
  }

  async fetchData() {
    try {
      logger.info('Fetching Aave data');
      const data = await this.fetchFromSubgraph();
      this.data = {
        protocol: 'Aave V3',
        timestamp: Date.now(),
        reserves: data
      };
      logger.info('Aave data fetched successfully', { count: data.length });
    } catch (error) {
      logger.error('Aave fetch error', { error: error.message });
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