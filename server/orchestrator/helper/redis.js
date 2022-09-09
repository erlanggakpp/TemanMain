const Redis = require("ioredis");

const redis = new Redis({
  port: 12767,
  host: "redis-12767.c12.us-east-1-4.ec2.cloud.redislabs.com",
  password: "dSXARJ3TeXDa4XPtPcAsxCmcMvYNCUDx"
});

module.exports = redis