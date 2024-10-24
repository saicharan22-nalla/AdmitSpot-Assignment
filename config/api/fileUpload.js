const multer = require('multer');
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Upload CSV for contact creation
router.post('/contacts/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Save each contact to the database
      for (const contactData of results) {
        await Contact.create(contactData);
      }
      res.status(200).json({ message: 'Contacts uploaded successfully!' });
    });
});

module.exports = router;
