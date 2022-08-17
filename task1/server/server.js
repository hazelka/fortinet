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





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/${req.body.userId}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });



// app.post('/upload', upload.array('files'), (req, res) => {
//   // db.run(`INSERT INTO files (file) VALUES ${req.body}`);
//   const userId = req.body.userId;
//   const originalNames = JSON.parse(req.body.originalNames);
//   const editedNames = JSON.parse(req.body.editedNames);
//   const extensions = JSON.parse(req.body.extensions);
//   const numberOfFiles = req.body.numberOfFiles;
//   const sql = 
//     `INSERT INTO files(userId, originalName, editedName, extension, path) VALUES(?, ?, ?, ?, ?)`;
//   for (let i = 0; i < numberOfFiles; i++) {
//     const params = [
//       userId, 
//       originalNames[i], 
//       editedNames[i], 
//       extensions[i], 
//       req.files[i].path
//     ];
//     db.run(sql, params, (err) => {
//       console.log(err);
//       res.status(400).json('Unable to upload files');
//     });
//   }
//   res.json('success');
// })

// app.get('/download', (req, res) => {
//   console.log('Downloading');
//   res.download(__dirname + '/uploads/testing/App.js', 'abc.js', (err) => {
//     if (err) {
//       console.log(err);
//     }
//   })
// })