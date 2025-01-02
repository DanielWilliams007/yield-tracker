require('dotenv').config();

module.exports = {
  rpc: {
    ethereum: process.env.ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    polygon: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com'
  },
  updateInterval: 60000 * 5 // 5 minutes
};