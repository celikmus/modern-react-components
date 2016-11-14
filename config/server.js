
const serverConfig = {
  'development': {
    api: 'http://localhost:3001',
    apiPort: 3001,
    devServerPort: 3000
  },
  'production': {
    api: 'https://myLovelyApiServer/api'
  }
};

module.exports = serverConfig;
