import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import Cart Context
import { CartContext } from '../../../CartContext.jsx';

function Smartwatch() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the addToCart function from CartContext
  const { addToCart, saveCartToBackend } = useContext(CartContext);

  // Check if user is logged in
  const token = localStorage.getItem('token'); // Token is used to check login status

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/Smartwatch');
        if (Array.isArray(response.data)) {
          setCollections(response.data);
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching collections. Please try again.');
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // If loading, show loading state
  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  // If there's an error, show error message
  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  // If no products are found, display this message
  if (collections.length === 0) {
    return <Typography variant="body1">No products found.</Typography>;
  }

  // Handle Add to Cart if not logged in
  const handleAddToCart = (product) => {
    if (!token) { // If user is not logged in
      navigate('/Userlogin'); // Redirect to login page
    } else {
      addToCart(product); // If user is logged in, add product to cart
      saveCartToBackend();
    }
  };

  const handleBuyNow = (product) => {
    if (!token) { // If user is not logged in
      navigate('/Userlogin'); // Redirect to login page
    } else {
      // If logged in, you can navigate to the checkout or product details page
      navigate(`/products/${product._id}`, { state: { product } }); // Example: Navigating to checkout page
    }
  };

  return (
    <div className="smartwatch-page">
      <Header />
      
      {/* Page Header Section */}
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Smartwatches
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Explore our premium range of Smartwatches with exclusive deals.
        </Typography>
      </Box>

      {/* Product Listings Section */}
      <Grid container spacing={4} sx={{ px: 4 }}>
        {collections.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                alt={product.name}
                image={product.imageUrl}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {product.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" color="success.main">
                  ₹{product.price}
                  </Typography>
                  {product.originalPrice && (
                    <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                      ₹{product.originalPrice}
                    </Typography>
                  )}
                </Box>
                {product.freeShipping && (
                  <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                    <i className="fas fa-truck me-2"></i> Free Shipping
                  </Typography>
                )}
                {/* Add to Cart and Buy Now Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleBuyNow(product)}
                    startIcon={<i className="fas fa-shopping-cart"></i>}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleAddToCart(product)}
                    startIcon={<i className="fas fa-cart-plus"></i>}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Free Delivery Section */}
      <Box sx={{ textAlign: 'center', py: 5, bgcolor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
          Free Delivery on all orders!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enjoy fast and free shipping to your doorstep.
        </Typography>
      </Box>

      <Footer />
    </div>
  );
}

export default Smartwatch;
