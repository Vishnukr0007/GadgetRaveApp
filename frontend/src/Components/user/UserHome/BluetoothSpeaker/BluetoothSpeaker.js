import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CartContext } from '../../../CartContext.jsx';
import './BluetoothSpeaker.css';

function BluetoothSpeaker() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for Snackbar

  // Get the addToCart function from CartContext
  const { addToCart, saveCartToBackend } = useContext(CartContext);

  // Check if user is logged in
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/bluetoothspeakers');
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

  // Handle Add to Cart if not logged in
  const handleAddToCart = (product) => {
    if (!token) {
      navigate('/Userlogin');
    } else {
      addToCart(product);
      saveCartToBackend();
      setSnackbarMessage(`${product.name} has been added to your cart!`); // Set custom message
      setSnackbarOpen(true); // Open the Snackbar
    }
  };

  const handleBuyNow = (product) => {
    if (!token) {
      navigate('/Userlogin');
    } else {
      navigate(`/products/${product._id}`, { state: { product } });
    }
  };

  if (loading) return <Typography variant="body1">Loading...</Typography>;
  if (error) return <Typography variant="body1">{error}</Typography>;
  if (collections.length === 0) return <Typography variant="body1">No products found.</Typography>;

  // Close the Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="bluetooth-speaker-page">
      <Header />

      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Bluetooth Speakers
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Explore our premium range of Bluetooth speakers with exclusive deals.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ px: 4 }}>
        {collections.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', py: 5, bgcolor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
          Free Delivery on all orders!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enjoy fast and free shipping to your doorstep.
        </Typography>
      </Box>

      {/* Snackbar with more colorful, stylish and animated message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionProps={{
          onEntered: () => {
            // Add custom animation logic here if needed
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            bgcolor: 'linear-gradient(45deg, #FF6347, #FF4500)', // Gradient color
            color: '',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: 3,
            '& .MuiAlert-message': {
              fontSize: '1.1rem', // Larger font size
            },
            animation: 'slideUp 0.5s ease-in-out', // Slide up animation
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}

export default BluetoothSpeaker;
