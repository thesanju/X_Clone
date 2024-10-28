import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error connecting to mongoDB: ${err.message}`)
        process.exit(1);
    }
}

export default connectMongoDB;
