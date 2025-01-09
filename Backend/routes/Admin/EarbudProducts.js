const express = require('express');
const Earbud = require('../../Models/Earbud');
const router = express.Router();

// POST: Add a new Earbud product
router.post('/api/admin/Earbuds', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    const newProduct = new Earbud({
      name,
      price,
      description,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

// GET: Fetch all Earbud products
router.get('/api/admin/Earbuds', async (req, res) => {
  try {
    const products = await Earbud.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// PUT: Update an existing Earbud product by ID
router.put('/api/admin/Earbuds/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;

  try {
    const updatedProduct = await Earbud.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// DELETE: Delete an Earbud product by ID
router.delete('/api/admin/Earbuds/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Earbud.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});




module.exports = router;
