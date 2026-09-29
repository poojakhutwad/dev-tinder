const dns = require("dns");

dns.setServers(["8.8.8.8"]);
const mongoose =  require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
}

module.exports = connectDB;

