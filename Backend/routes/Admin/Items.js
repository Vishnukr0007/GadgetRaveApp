const express = require('express');
const router = express.Router();

// Models for all the product categories
const Bluetooth = require('../../Models/Bluetooth');
const Earbud = require('../../Models/Earbud');
const Keyboardmouse = require('../../Models/KeyboadMouse');
const Neckband = require('../../Models/Neckbands');
const Soundbar = require('../../Models/Soundbars');
const Smartwatch = require('../../Models/Smartwatch');

// Search endpoint across multiple collections
router.get('/api/items', async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // Search in multiple collections (Bluetooth, Earbud, Keyboard/Mouse, Neckband, Soundbar, Smartwatch)
    const BluetoothResults = await Bluetooth.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    const EarbudResults = await Earbud.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    const KeyboardmouseResults = await Keyboardmouse.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    const NeckbandResults = await Neckband.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    const SoundbarResults = await Soundbar.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    const SmartwatchResults = await Smartwatch.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    // Combine results from different collections
    const allResults = [
      ...BluetoothResults,
      ...EarbudResults,
      ...KeyboardmouseResults,
      ...NeckbandResults,
      ...SoundbarResults,
      ...SmartwatchResults
    ];

    res.status(200).json(allResults);
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Suggestions endpoint across multiple collections
router.get('/api/items/suggestions', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Fetch suggestions from each collection
    const BluetoothSuggestions = await Bluetooth.find(
      { name: { $regex: query, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    const EarbudSuggestions = await Earbud.find(
      { name: { $regex: query, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    const KeyboardmouseSuggestions = await Keyboardmouse.find(
      { name: { $regex: query, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    const NeckbandSuggestions = await Neckband.find(
      { name: { $regex: query, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    const SoundbarSuggestions = await Soundbar.find(
      { name: { $regex: query, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    const SmartwatchSuggestions = await Smartwatch.find(
      { name: { $regex: query, $options: 'i' } },
      { name: 1 }
    ).limit(5);

    // Combine the suggestions
    const allSuggestions = [
      ...BluetoothSuggestions,
      ...EarbudSuggestions,
      ...KeyboardmouseSuggestions,
      ...NeckbandSuggestions,
      ...SoundbarSuggestions,
      ...SmartwatchSuggestions
    ];

    res.status(200).json(allSuggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/items/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    // Search the product in all collections
    const product =
      (await Bluetooth.findById(productId)) ||
      (await Earbud.findById(productId)) ||
      (await Keyboardmouse.findById(productId)) ||
      (await Neckband.findById(productId)) ||
      (await Soundbar.findById(productId)) ||
      (await Smartwatch.findById(productId));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
