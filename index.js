const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');
const cors = require('cors');
const { url_bd, url_search } = require('./controllers/userController.js')
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'reduce';

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

async function connectToDB() {
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
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

app.post('/reduce', async (req, res) => {
  const { db, client } = await connectToDB();
  const collection = db.collection('reduces');
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Вы не ввели URL для сокращения' });
  }
  const reduce_url = await generateUniqueReduceUrl(collection, 6);
  const result = await url_bd(reduce_url, url, req, res);
});

app.get('/:reduce_url', async (req, res) => {
  const { reduce_url } = req.params;
  console.log('Обработка редиректа для:', reduce_url);
  const result = await url_search(reduce_url, req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});