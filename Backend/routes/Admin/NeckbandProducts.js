const express = require('express');
const Neckbands= require('../../Models/Neckbands');
const router = express.Router();

router.post('/api/admin/Neckbands', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
  
    try {
      const newProduct = new Neckbands({
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
  router.get('/api/admin/Neckbands', async (req, res) => {
    try {
      const products = await Neckbands.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

  router.put('/api/admin/Neckbands/:id', async (req, res) => {
    try {
      const updatedProduct = await Neckbands.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).send("Server error");
    }
  });
   // PUT (Update) an existing Bluetooth speaker
router.put('/api/admin/Neckbands/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, imageUrl } = req.body;
  
    try {
      const updatedProduct = await Neckbands.findByIdAndUpdate(
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
router.delete('/api/admin/Neckbands/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProduct = await Neckbands.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  });
  
  
 


module.exports = router;