// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.weatherapi.com"],
  },
};
require("dotenv").config();
// console.log(process.env.API_KEY);
module.exports = nextConfig;
