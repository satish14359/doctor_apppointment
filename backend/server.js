// backend/server.js
console.log("🟡 Server is starting...");
const userRoutes = require('./routes/userRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('CocSpot Backend Running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.log('❌ DB Connection Error:', err));

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🟢 Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try a different one.`);
    process.exit(1);
  } else {
    throw err;
  }
});