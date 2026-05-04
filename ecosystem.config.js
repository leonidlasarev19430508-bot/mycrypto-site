module.exports = {
  apps: [{
    name: "crypto-site",
    script: "node_modules/next/dist/bin/next",
    args: "start",
    cwd: "C:/Users/Lenovo/Documents/mycrypto-site",
    interpreter: "node",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    watch: false,
    autorestart: true
  }]
};