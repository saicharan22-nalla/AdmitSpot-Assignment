const express = require('express');
const { Contact, User } = require('../models');
const authenticateJWT = require('./middleware/authenticateJWT');
const router = express.Router();

// Create new contact
router.post('/contacts', authenticateJWT, async (req, res) => {
  const { name, email, phone, address, timezone } = req.body;
  const contact = await Contact.create({
    name,
    email,
    phone,
    address,
    timezone,
    userId: req.user.id
  });
  res.json(contact);
});

// Get all contacts with filtering and sorting
router.get('/contacts', authenticateJWT, async (req, res) => {
  const contacts = await Contact.findAll({ where: { userId: req.user.id } });
  res.json(contacts);
});

module.exports = router;
