import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Force use of public DNS to avoid querySrv ECONNREFUSED on some network configurations
dns.setServers(['1.1.1.1', '8.8.8.8']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to this file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buslagbe';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'traveler' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const routeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);

const offerSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: String, required: true },
  description: { type: String, required: true },
  expiry: { type: String, required: true }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@buslagbe.com' });
    if (!adminExists) {
      const hashedPassword = hashPassword('admin123');
      const admin = new User({
        name: 'Admin User',
        email: 'admin@buslagbe.com',
        phone: '01700000000',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user seeded successfully');
    }
  } catch (err) {
    console.error('Failed to seed admin user:', err);
  }
};

const seedCatalog = async () => {
  try {
    const routeCount = await Route.countDocuments();
    if (routeCount === 0) {
      const initialRoutes = [
        { id: 1, from: 'Dhaka', to: 'Chattogram', price: 800, duration: '6-7 Hours', image: 'https://images.unsplash.com/photo-1596463059386-2918e41306fc?auto=format&fit=crop&w=400&q=80' },
        { id: 2, from: 'Dhaka', to: "Cox's Bazar", price: 1200, duration: '10-12 Hours', image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=400&q=80' },
        { id: 3, from: 'Dhaka', to: 'Sylhet', price: 700, duration: '5-6 Hours', image: 'https://images.unsplash.com/photo-1626082896492-766af4fc6595?auto=format&fit=crop&w=400&q=80' },
        { id: 4, from: 'Dhaka', to: 'Rajshahi', price: 900, duration: '6-7 Hours', image: 'https://images.unsplash.com/photo-1622760879944-ff8dfc5c7db6?auto=format&fit=crop&w=400&q=80' },
        { id: 5, from: 'Dhaka', to: 'Khulna', price: 950, duration: '7-8 Hours', image: 'https://images.unsplash.com/photo-1608958416733-4df45e9ee9b0?auto=format&fit=crop&w=400&q=80' },
        { id: 6, from: 'Dhaka', to: 'Rangpur', price: 1100, duration: '8-9 Hours', image: 'https://images.unsplash.com/photo-1608958416733-4df45e9ee9b0?auto=format&fit=crop&w=400&q=80' },
        { id: 7, from: 'Dhaka', to: 'Gaibandha', price: 850, duration: '7-8 Hours', image: 'https://images.unsplash.com/photo-1608958416733-4df45e9ee9b0?auto=format&fit=crop&w=400&q=80' }
      ];
      await Route.insertMany(initialRoutes);
      console.log('Routes seeded successfully');
    }

    const offerCount = await Offer.countDocuments();
    if (offerCount === 0) {
      const initialOffers = [
        { code: 'BLFIRST', discount: '10%', description: 'Get 10% off on your first booking up to ৳150', expiry: '31 Aug 2026' },
        { code: 'COXSPECIAL', discount: '৳200 Off', description: 'Flat ৳200 off on Dhaka to Cox\'s Bazar route bookings', expiry: '15 Sep 2026' },
        { code: 'EIDTRIP', discount: '15%', description: 'Celebrate Eid with 15% discount on selected operators', expiry: '10 Oct 2026' }
      ];
      await Offer.insertMany(initialOffers);
      console.log('Offers seeded successfully');
    }
  } catch (err) {
    console.error('Failed to seed catalog:', err);
  }
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log('Connected to MongoDB');
    await seedAdmin();
    await seedCatalog();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.warn('Continuing without database connection. Health endpoint will report disconnected status.');
  }
};

connectToDatabase();

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
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

app.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const status = dbState === 1 ? 'connected' : 'disconnected';
    res.json({ status: 'ok', database: status, readyState: dbState, uri: mongoUri });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'error' });
  }
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
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database unavailable. Booking was not stored.' });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (err) {
    console.error('Failed to save booking:', err);
    res.status(500).json({ success: false, message: 'Failed to save booking' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All registration fields are required' });
    }

    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email or phone number is already registered' });
    }

    const newUser = new User({
      name,
      email,
      phone,
      password: hashPassword(password),
      role: 'traveler'
    });

    await newUser.save();
    
    res.status(201).json({
      success: true,
      data: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: 'Email or phone and password are required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const lookupKey = isEmail ? 'email' : 'phone';
    let foundUser = await User.findOne({ [lookupKey]: emailOrPhone });

    if (!foundUser) {
      if (password === 'SOCIAL') {
        foundUser = new User({
          name: 'Google User',
          email: isEmail ? emailOrPhone : 'google.user@gmail.com',
          phone: isEmail ? '01712345678' : emailOrPhone,
          password: hashPassword('SOCIAL'),
          role: 'traveler'
        });
        await foundUser.save();
        return res.status(201).json({
          success: true,
          data: {
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone,
            role: foundUser.role
          }
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (password === 'SOCIAL' || hashPassword(password) === foundUser.password) {
      return res.json({
        success: true,
        data: {
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          role: foundUser.role
        }
      });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

app.put('/users/:email/role', async (req, res) => {
  try {
    const { email } = req.params;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    foundUser.role = foundUser.role === 'admin' ? 'traveler' : 'admin';
    await foundUser.save();
    res.json({
      success: true,
      data: {
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: foundUser.role
      }
    });
  } catch (err) {
    console.error('Failed to update user role:', err);
    res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
});

// Routes API
app.get('/routes', async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: routes });
  } catch (err) {
    console.error('Failed to fetch routes:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch routes' });
  }
});

app.post('/routes', async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();
    res.status(201).json({ success: true, data: newRoute });
  } catch (err) {
    console.error('Failed to save route:', err);
    res.status(500).json({ success: false, message: 'Failed to save route' });
  }
});

app.delete('/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Route.findOneAndDelete({ id: Number(id) });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({ success: true, message: 'Route deleted successfully', data: deleted });
  } catch (err) {
    console.error('Failed to delete route:', err);
    res.status(500).json({ success: false, message: 'Failed to delete route' });
  }
});

// Offers API
app.get('/offers', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: offers });
  } catch (err) {
    console.error('Failed to fetch offers:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch offers' });
  }
});

app.post('/offers', async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.status(201).json({ success: true, data: newOffer });
  } catch (err) {
    console.error('Failed to save offer:', err);
    res.status(500).json({ success: false, message: 'Failed to save offer' });
  }
});

app.delete('/offers/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const deleted = await Offer.findOneAndDelete({ code: code.toUpperCase() });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer deleted successfully', data: deleted });
  } catch (err) {
    console.error('Failed to delete offer:', err);
    res.status(500).json({ success: false, message: 'Failed to delete offer' });
  }
});

// Update Booking details (e.g. status)
app.put('/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: updatedBooking });
  } catch (err) {
    console.error('Failed to update booking:', err);
    res.status(500).json({ success: false, message: 'Failed to update booking' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
