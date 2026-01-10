const express = require('express')
const router = express.Router();
const crypto = require('crypto'); 
const { MongoClient } = require('mongodb');
const { url_bd, url_search } = require('../controllers/userController.js')

function generateReduceUrl(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < length; i++) {
    const index = bytes[i] % characters.length;
    result += characters[index];
  }
  return result;
}

async function generateUniqueReduceUrl(collection, length) {
  let reduce_url;
  while (true) {
    reduce_url = generateReduceUrl(length);
    const exists = await collection.findOne({ reduce_url });
    if (!exists) break;
  }
  return reduce_url;
}

router.post('/reduce', async (req, res) => {
  const collection = 'reduces';
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Вы не ввели URL для сокращения' });
  }
  const reduce_url = await generateUniqueReduceUrl(collection, 6);
  const result = await url_bd(reduce_url, url, req, res);
})

module.exports = router;