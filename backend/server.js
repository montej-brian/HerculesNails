import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health-check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Hercules Nails Backend is healthy and running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
