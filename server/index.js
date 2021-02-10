const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public/`));

  app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
