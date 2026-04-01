import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read data from JSON files
const getData = async (filename) => {
  const dataPath = path.join(__dirname, 'data', filename);
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
};

// --- API ROUTES ---

// 1. Services
app.get('/api/services', async (req, res) => {
  try {
    const services = await getData('services.json');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services.' });
  }
});

// 2. Team Profiles
app.get('/api/team', async (req, res) => {
  try {
    const team = await getData('team.json');
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team.' });
  }
});

// 3. Portfolio Gallery
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await getData('portfolio.json');
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch portfolio gallery.' });
  }
});

// 3. Online Booking System
app.get('/api/available-slots', (req, res) => {
  const { date } = req.query;
  // Mock available slots for simplicity
  const slots = ["10:00 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
  res.json(slots);
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  console.log('Booking received:', booking);
  // Mock processing
  setTimeout(() => {
    res.status(201).json({ 
      success: true, 
      message: 'Booking confirmed.',
      reference: `HERC-${Math.floor(Math.random() * 10000)}` 
    });
  }, 1000);
});

// 4. Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact from ${name} (${email}): ${message}`);
  // Mock submission
  res.json({ success: true, message: 'Message sent successfully.' });
});

// 5. Testimonials & Reviews
let reviews = [
  { "id": 1, "name": "Sarah Jenkins", "rating": 5, "text": "The Hercules Spa Pedicure changed my life. Athena and her team are absolute artists.", "date": "2026-03-25" },
  { "id": 2, "name": "James L.", "rating": 5, "text": "Incredible attention to detail. The gold leaf accents are amazing.", "date": "2026-03-28" }
];

app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const review = { id: reviews.length + 1, ...req.body, date: new Date().toISOString().split('T')[0] };
  reviews.push(review);
  res.status(201).json(review);
});

// 6. Gift Card System
app.get('/api/gift-cards/balance/:code', (req, res) => {
  const { code } = req.params;
  console.log(`Checking balance for code: ${code}`);
  // Mock random balance for demo
  const balance = Math.floor(Math.random() * 200) + 10;
  res.json({ code, balance });
});

// --- BASE ROUTES ---

// Health-check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Hercules Nails Backend is healthy and running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
