const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ['https://immunie-carteirinha.vercel.app', 'localhost:3000', 'https://immunie-api-v6gs.onrender.com/users'],
  credentials: true
}));

app.use(express.json());

app.use('/api', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
