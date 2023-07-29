const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const winston = require('./helpers/logger');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Request logging middleware
app.use(expressWinston.logger({
  winstonInstance: winston,
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
}));

// Routes
const authRouter = require('./routes/auth')
app.use('/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.code || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
