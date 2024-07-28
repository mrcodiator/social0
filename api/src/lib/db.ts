import mongoose, { ConnectOptions } from "mongoose";

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL || "");
        console.log('Successfully connected to database');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connectToDatabase,
};
