const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const DB = 'music';
const COLL = 'users';

module.exports = async (req, res) => {
  if(!uri){ res.status(500).json({ error: 'MONGO_URI not set' }); return; }
  try {
    // connect on demand
    if(!client.topology || !client.topology.isConnected()) { await client.connect(); }
  } catch(e){
    try{ await client.connect(); }catch(err){ console.error('connect error',err); res.status(500).json({ error: String(err) }); return; }
  }

  const db = client.db(DB);
  const coll = db.collection(COLL);
  if(req.method === 'POST'){
    try{
      const body = req.body && Object.keys(req.body).length ? req.body : JSON.parse(await new Promise(r=>{ let s=''; req.on('data',c=>s+=c); req.on('end',()=>r(s)); }));
      await coll.insertOne(body);
      res.status(200).json({ message: 'ok' });
    }catch(err){ console.error(err); res.status(500).json({ error: String(err) }); }
  } else if(req.method === 'GET'){
    try{
      const docs = await coll.find({}).sort({ _id: -1 }).limit(500).toArray();
      res.status(200).json(docs);
    }catch(err){ console.error(err); res.status(500).json({ error: String(err) }); }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
