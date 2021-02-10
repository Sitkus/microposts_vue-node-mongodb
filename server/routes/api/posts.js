const express = require('express');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();

  res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  const validDescription =
    typeof req.body.description === 'string' && req.body.description.length > 0 && req.body.description.length < 100;

  if (validDescription) {
    await posts.insertOne({
      description: req.body.description,
      createdAt: new Date()
    });

    res.status(201).send();
  } else {
    res.status(400).send({ message: 'Please insert description' });
  }
});

router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  const properId = ObjectID.isValid(req.params.id);

  if (properId) {
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });

    res.status(200).send({ message: 'Post deleted successfully' });
  } else {
    res.status(400).send({ message: 'Incorrect ID provided' });
  }
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://lukas:sitkus@posts.l2cvf.mongodb.net/microposts-vue-node?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db('microposts-vue-node').collection('posts');
}

module.exports = router;
