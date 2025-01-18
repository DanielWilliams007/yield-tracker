require('dotenv').config();

module.exports = {
  rpc: {
    ethereum: process.env.ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    polygon: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com'
  },
  api: {
    port: process.env.API_PORT || 3000
  },
  updateInterval: parseInt(process.env.UPDATE_INTERVAL) || 300000, // 5 minutes
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log'
  }
};