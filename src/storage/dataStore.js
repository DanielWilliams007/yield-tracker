const fs = require('fs').promises;
const path = require('path');

class DataStore {
  constructor() {
    this.dataDir = path.join(__dirname, '../../data');
    this.ensureDataDir();
  }

  async ensureDataDir() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create data directory:', error);
    }
  }

  async save(protocol, data) {
    const filename = `${protocol.toLowerCase()}_${Date.now()}.json`;
    const filepath = path.join(this.dataDir, filename);
    
    try {
      await fs.writeFile(filepath, JSON.stringify(data, null, 2));
      return filepath;
    } catch (error) {
      console.error(`Failed to save ${protocol} data:`, error);
      return null;
    }
  }

  async getLatest(protocol) {
    try {
      const files = await fs.readdir(this.dataDir);
      const protocolFiles = files.filter(f => f.startsWith(protocol.toLowerCase()));
      
      if (protocolFiles.length === 0) return null;
      
      protocolFiles.sort((a, b) => b.localeCompare(a));
      const latestFile = path.join(this.dataDir, protocolFiles[0]);
      
      const data = await fs.readFile(latestFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Failed to get latest ${protocol} data:`, error);
      return null;
    }
  }
}

module.exports = DataStore;