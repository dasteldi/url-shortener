const path = require('path');
const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'reduce';

async function connectToDB() {
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

async function url_bd(reduce_url, url, req, res) {
  const { db, client } = await connectToDB();
  try {
    const collection = db.collection('reduces');
    await collection.insertOne({ url, reduce_url }); 
    const protocol = req.protocol;
    const host = req.get('host');
    const fullShortUrl = `${protocol}://${host}/${reduce_url}`;
    res.json({ shortUrl: fullShortUrl });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  } finally {
    await client.close();
  }
}

module.exports = {
    url_bd
};