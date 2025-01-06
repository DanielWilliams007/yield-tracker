const config = require('./config');
const AaveProvider = require('./providers/aave');
const CompoundProvider = require('./providers/compound');

class YieldTracker {
  constructor() {
    this.providers = [
      new AaveProvider(config.rpc.ethereum),
      new CompoundProvider()
    ];
  }

  async start() {
    console.log('Starting yield tracker...');
    await this.updateAll();
    
    setInterval(() => {
      this.updateAll();
    }, config.updateInterval);
  }

  async updateAll() {
    console.log(`Updating data at ${new Date().toISOString()}`);
    
    for (const provider of this.providers) {
      await provider.fetchData();
      console.log(`${provider.name}: ${JSON.stringify(provider.getData())}`);
    }
  }
}

const tracker = new YieldTracker();
tracker.start();