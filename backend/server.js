import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connect.js";

dotenv.config();

const app = express();
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    connectMongoDB();
});
