const config = require('./config');
const AaveProvider = require('./providers/aave');
const CompoundProvider = require('./providers/compound');
const DataStore = require('./storage/dataStore');
const ApiServer = require('./api/server');

class YieldTracker {
  constructor() {
    this.providers = [
      new AaveProvider(config.rpc.ethereum),
      new CompoundProvider()
    ];
    this.dataStore = new DataStore();
    this.apiServer = new ApiServer(3000);
  }

  async start() {
    console.log('Starting yield tracker...');
    
    // Start API server
    this.apiServer.start();
    
    await this.updateAll();
    
    setInterval(() => {
      this.updateAll();
    }, config.updateInterval);
  }

  async updateAll() {
    console.log(`Updating data at ${new Date().toISOString()}`);
    
    for (const provider of this.providers) {
      await provider.fetchData();
      const data = provider.getData();
      console.log(`${provider.name}: ${JSON.stringify(data)}`);
      
      // Save to storage
      await this.dataStore.save(provider.name, data);
    }
  }
}

const tracker = new YieldTracker();
tracker.start();