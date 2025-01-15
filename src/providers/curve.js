const BaseProvider = require('./base');
const axios = require('axios');
const logger = require('../utils/logger');

class CurveProvider extends BaseProvider {
  constructor() {
    super('Curve');
    this.apiUrl = 'https://api.curve.fi/api/getPools';
  }

  async fetchData() {
    try {
      logger.info('Fetching Curve data');
      
      // Mock data since real API might need auth
      const pools = this.getMockPools();
      
      this.data = {
        protocol: 'Curve Finance',
        timestamp: Date.now(),
        pools: pools.map(p => ({
          name: p.name,
          apy: p.apy,
          tvl: p.tvl
        }))
      };
      
      logger.info('Curve data fetched', { pools: pools.length });
    } catch (error) {
      logger.error('Curve fetch error', { error: error.message });
      this.data = { protocol: 'Curve Finance', timestamp: Date.now(), pools: [] };
    }
  }

  getMockPools() {
    return [
      { name: '3pool', apy: 1.2, tvl: 1000000000 },
      { name: 'stETH', apy: 3.5, tvl: 500000000 },
      { name: 'FRAX', apy: 2.1, tvl: 300000000 }
    ];
  }
}

module.exports = CurveProvider;