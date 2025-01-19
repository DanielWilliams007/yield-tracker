const config = require('./config');
const AaveProvider = require('./providers/aave');
const CompoundProvider = require('./providers/compound');
const CurveProvider = require('./providers/curve');
const DataStore = require('./storage/dataStore');
const ApiServer = require('./api/server');

class YieldTracker {
  constructor() {
    this.providers = [
      new AaveProvider(config.rpc.ethereum),
      new CompoundProvider(),
      new CurveProvider()
    ];
    this.dataStore = new DataStore();
    this.apiServer = new ApiServer(config.api.port);
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