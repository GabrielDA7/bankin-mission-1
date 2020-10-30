require("dotenv").config();
const devConfig = require("./config.development");
const prodConfig = require("./config.production");

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

module.exports = config;
