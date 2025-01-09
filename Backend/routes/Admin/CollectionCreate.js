const express = require('express');
const Collection = require('../../Models/Collection');
const router = express.Router();

router.post('/api/admin/collection', async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    
    // Create new collection document in MongoDB
    const newCollection = new Collection({ title, imageUrl});
    await newCollection.save();
    
    res.status(201).json({ message: 'Collection created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection' });
  }
});
router.get('/api/collections', async (req, res) => {
  try {
    const collections = await Collection.find(); // Fetch all collections from the database
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections' });
  }
});
router.put('/api/collections/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!collection) return res.status(404).send('Collection not found');
    res.send(collection);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
router.delete('/api/collections/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) return res.status(404).send('Collection not found');
    res.send('Collection deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});


  module.exports = router;

