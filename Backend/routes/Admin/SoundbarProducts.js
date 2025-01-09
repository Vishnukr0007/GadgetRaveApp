const express = require('express');
const Soundbars= require('../../Models/Soundbars');
const router = express.Router();

router.post('/api/admin/Soundbars', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
  
    try {
      const newProduct = new Soundbars({
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
  
  // Fetch all products
  router.get('/api/admin/Soundbars', async (req, res) => {
    try {
      const products = await Soundbars.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

  router.put('/api/admin/Soundbars/:id', async (req, res) => {
    try {
      const updatedProduct = await Soundbars.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).send("Server error");
    }
  });
   // PUT (Update) an existing Bluetooth speaker
router.put('/api/admin/Soundbars/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, imageUrl } = req.body;
  
    try {
      const updatedProduct = await Soundbars.findByIdAndUpdate(
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
// DELETE a Bluetooth speaker
router.delete('/api/admin/Soundbars/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProduct = await Soundbars.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  });
  
 


module.exports = router;