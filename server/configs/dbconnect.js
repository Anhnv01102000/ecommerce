const { default: mongoose } = require("mongoose")

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if (connect.connection.readyState === 1) console.log("DB OK");
        else console.log("DB connecting");
    } catch (error) {
        console.log("DB connect is Failed");
        throw new Error(error)
    }
}

module.exports = dbConnect