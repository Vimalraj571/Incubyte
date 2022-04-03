const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db =  require('./queries');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.get('/', (req, res) => {
  res.send('TEST');
});

app.get('/words', db.getWords);
// app.post('/word', db.postWord);
// app.get('/word/:id', db.getWord);
// app.put('/word/:id', db.editWord);
// app.delete('/word/:id', db.deleteWord);


// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})