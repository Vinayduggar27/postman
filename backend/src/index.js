import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        console.log("MONGODB_URI configured:", process.env.MONGODB_URI ? "Yes" : "No");
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        });
    } catch (err) {
        console.log("MONGO db connection failed !!! ", err);
    }
};

startServer();
