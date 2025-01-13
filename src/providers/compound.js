const BaseProvider = require('./base');
const axios = require('axios');
const logger = require('../utils/logger');

class CompoundProvider extends BaseProvider {
  constructor() {
    super('Compound');
    this.apiUrl = 'https://api.compound.finance/v2/ctoken';
  }

  async fetchData() {
    try {
      logger.info('Fetching Compound data');
      const response = await axios.get(this.apiUrl);
      const markets = response.data.cToken || [];
      
      this.data = {
        protocol: 'Compound V2',
        timestamp: Date.now(),
        markets: markets.map(m => ({
          symbol: m.symbol,
          supplyRate: m.supply_rate?.value || 0,
          borrowRate: m.borrow_rate?.value || 0
        }))
      };
      logger.info('Compound data fetched', { markets: markets.length });
    } catch (error) {
      logger.error('Compound fetch error', { error: error.message });
      this.data = { protocol: 'Compound V2', timestamp: Date.now(), markets: [] };
    }
  }
}

module.exports = CompoundProvider;