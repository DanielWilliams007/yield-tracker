const BaseProvider = require('./base');
const axios = require('axios');

class CompoundProvider extends BaseProvider {
  constructor() {
    super('Compound');
    this.apiUrl = 'https://api.compound.finance/v2/ctoken';
  }

  async fetchData() {
    try {
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
    } catch (error) {
      console.error('Compound fetch error:', error.message);
      this.data = { protocol: 'Compound V2', timestamp: Date.now(), markets: [] };
    }
  }
}

module.exports = CompoundProvider;