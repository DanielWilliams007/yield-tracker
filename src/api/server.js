const express = require('express');
const DataStore = require('../storage/dataStore');

class ApiServer {
  constructor(port = 3000) {
    this.app = express();
    this.port = port;
    this.dataStore = new DataStore();
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: Date.now() });
    });

    this.app.get('/data/:protocol', async (req, res) => {
      const { protocol } = req.params;
      const data = await this.dataStore.getLatest(protocol);
      
      if (!data) {
        return res.status(404).json({ error: 'No data found' });
      }
      
      res.json(data);
    });

    this.app.get('/protocols', (req, res) => {
      res.json(['aave', 'compound']);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`API server running on port ${this.port}`);
    });
  }
}

module.exports = ApiServer;