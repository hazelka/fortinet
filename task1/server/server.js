const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Set up server
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: "Server is up and running"
  });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/api.routes')(app);

// Set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});