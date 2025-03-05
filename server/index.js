import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
}));

app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    console.log("Received request on /");
    res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
