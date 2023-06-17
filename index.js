const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const Client = require("@replit/database");
const client = new Client();


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = new Map();


// user -> {
  // day: {
    // changes: op_count
    // time: ms
//  }

// }
// day -> repl
// key (day) -.> {
// user_id_repl_ID: {
// changes: op_count
// time : ms since the epoch
//}
//}


//
app.get('/api/stats/:user', (req, res) => {
  const user = req.params.user;
  const value = db.get(key);

  if (value) {
    res.json({ value });
  } else {
    res.status(404).json({ error: 'Key not found' });
  }
});

app.post('/api/stats/:user', (req, res) => {
  const { key, value } = req.body;

  if (key && value) {
    db.set(key, value);
    res.status(201).json({ message: 'Created' });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});


app.delete('/api/stats/:user', (req, res) => {
  const key = req.params.key;

  if (db.has(key)) {
    db.delete(key);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Key not found' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await client.set("key", "value");
  let key = await client.get("key");
  console.log(key);
});


