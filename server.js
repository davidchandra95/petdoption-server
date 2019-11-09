const express = require('express');
const dotenv = require('dotenv');

//Route files
const shelterRoutes = require('./routes/shelters');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.use('/api/v1/bootcamps', shelterRoutes);

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, data: { message: 'Welcome to petdoption API' } });
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
