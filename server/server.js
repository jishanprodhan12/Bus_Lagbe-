import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI not set in server/.env');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  transactionId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  bus: { type: Object, required: true },
  seats: { type: [String], required: true },
  boardingPoint: { type: String, required: true },
  droppingPoint: { type: String, required: true },
  passenger: { type: Object, required: true },
  amount: { type: Number, required: true },
  bookingDate: { type: String, required: true },
  journeyDate: { type: String, required: true },
  status: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  ticketGenerated: { type: Boolean, required: true },
  paymentNote: { type: String },
  createdAt: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error('Failed to fetch bookings:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (err) {
    console.error('Failed to save booking:', err);
    res.status(500).json({ success: false, message: 'Failed to save booking' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
