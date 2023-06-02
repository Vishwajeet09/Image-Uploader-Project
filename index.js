const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer storage for uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });



// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));



// Define the route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



// Define the route for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  res.send('Image uploaded successfully.');
});



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
