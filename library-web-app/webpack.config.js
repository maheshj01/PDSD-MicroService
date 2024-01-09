// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... other webpack configuration ...
  plugins: [
    new Dotenv({
      systemvars: false, //Set to true if you would rather load all system variables as well (useful for CI purposes)
    })
  ]
};
