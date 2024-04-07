const redisDB = require("redis")
const redisClient = redisDB.createClient()


redisClient.connect()
redisClient.on("connect",()=>console.log("Connected to Redis"))
redisClient.on("error",(err)=>console.log("Connected to Redis Error",err.message))
redisClient.on("ready",()=>console.log("Redis ready to use"))
redisClient.on("end",()=>console.log("Disconnected from redis"))

module.exports = redisClient
