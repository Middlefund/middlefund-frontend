const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:5000',
    secure: false,
    logLevel: 'error',
    changeOrigin: true,
  },
];
module.exports = PROXY_CONFIG;
