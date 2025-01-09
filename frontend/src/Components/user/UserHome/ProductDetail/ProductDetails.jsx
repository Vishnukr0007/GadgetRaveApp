import React, { useEffect, useState,useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './ProductDetails.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CartContext } from '../../../CartContext.jsx';
function ProductDetails() {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for Snackbar
  const navigate = useNavigate(); // Navigation hook for redirections
  const token = localStorage.getItem('token'); // Fetch token from local storage or replace with your auth logic
  const { addToCart, saveCartToBackend } = useContext(CartContext);
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/items/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

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
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false); // Close Snackbar
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div className="product-details-container">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-actions">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleAddToCart(product)}
              sx={{ marginRight: 2 }}
            >
              Add to Cart
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleBuyNow(product)}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ProductDetails;
