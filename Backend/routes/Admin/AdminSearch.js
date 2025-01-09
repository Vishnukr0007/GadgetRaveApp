const express = require('express');
const router = express.Router();
const Collection = require('../../Models/Collection'); // Assuming this is the Mongoose model

/**
 * @route   GET /api/search
 * @desc    Search for items within collections
 * @query   q (string): Search term (required)
 *          page (number): Page number for pagination (optional, default 1)
 *          limit (number): Number of results per page (optional, default 10)
 */
router.get('/search', async (req, res) => {
  const { q: query, page = 1, limit = 10 } = req.query;
  

  // Validate query parameter
  if (!query) {
    return res.status(400).json({ error: 'Search query (q) is required' });
  }

  const parsedPage = Math.max(1, parseInt(page)); // Ensure page is at least 1
  const parsedLimit = Math.max(1, Math.min(100, parseInt(limit))); // Limit results to a max of 100 per page

  try {
    // Find collections with matching items
    const collections = await Collection.find(
      { 'items.name': { $regex: query, $options: 'i' } }, // Case-insensitive search
      { 'items.$': 1 } // Project only the matching item(s)
    )
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    // Flatten and extract matching items
    const suggestions = collections.flatMap((collection) =>
      collection.items
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => item.name)
    );

    // Send results with metadata for pagination
    res.json({
      suggestions,
      page: parsedPage,
      limit: parsedLimit,
      total: suggestions.length,
    });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
