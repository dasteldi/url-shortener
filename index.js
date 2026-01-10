const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');
const cors = require('cors');
const { url_bd, url_search } = require('./controllers/userController.js')
const router = require('./routes/index.js')

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router); 

app.get('/:reduce_url', async (req, res) => {
  const { reduce_url } = req.params;
  console.log('Обработка редиректа для:', reduce_url);
  const result = await url_search(reduce_url, req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});