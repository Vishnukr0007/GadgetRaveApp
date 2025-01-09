import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Done } from '@mui/icons-material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { FaPaypal } from 'react-icons/fa';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import axios from 'axios';
import { CartContext } from '../../../CartContext';
import './ProductBuy.css';

function ProductBuy() {
  const location = useLocation();
  const { product: locationProduct } = location.state || {}; // Product from "Buy Now"
  const navigate = useNavigate();
  const { cartItems, setCartItems, clearCart } = useContext(CartContext);
  const isSingleProduct = !!locationProduct;
  

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    email: '',
    phone: '',
  });

  

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [product] = useState(locationProduct || null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false); // For showing a loading spinner
  const [openDialog, setOpenDialog] = useState(false); // For order success dialog

  useEffect(() => {
    if (isSingleProduct && product) {
      setTotalPrice(Number(product.price) * quantity);
    } else if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      );
      setTotalPrice(total);
    }
  }, [cartItems, product, quantity, isSingleProduct]);

  const handleCartItemQuantityChange = (index, newQuantity) => {
    const validQuantity = Math.max(1, parseInt(newQuantity) || 1);
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = validQuantity;
    setCartItems(updatedCartItems);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading spinner

    const orderData = {
      address,
      paymentMethod,
      cartItems: isSingleProduct
        ? [{
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            imageUrl: product.imageUrl,
          }]
        : cartItems,
      totalPrice,
      orderStatus: 'OrderPlaced', // Default status
      creditCardDetails: paymentMethod === 'Credit Card' ? creditCardDetails : null, // Only send credit card details if selected
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to place an order.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        setOrderPlaced(true);
        setCartItems([]); // Clear the cart
        clearCart(); // Ensure cart context is cleared
        setOpenDialog(true); // Open success dialog
        setTimeout(() => navigate('/my-orders'), 2000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order. Please try again.');
    } finally {
      setLoading(false);
    }
};


  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value !== 'Credit Card') {
      setCreditCardDetails({ cardNumber: '', expirationDate: '', cvv: '' }); // Reset credit card details
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog when the user clicks 'OK'
  };
  

 

  return (
    <div className="product-buy-page" style={{ backgroundColor: '#f4f6f9' }}>
      <Header />
  
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Typography variant="h4" color="primary" gutterBottom>
              {isSingleProduct ? 'Product Details' : 'Cart Items'}
            </Typography>
            {isSingleProduct ? (
              product ? (
                <Card sx={{ display: 'flex' }}>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item md={8}>
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2">Price: ₹{product.price}</Typography>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          fullWidth
                          margin="normal"
                          inputProps={{ min: 1 }}
                        />
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ) : (
                <Typography>No product selected.</Typography>
              )
            ) : cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <Card key={index} sx={{ mb: 3, display: 'flex' }}>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <img src={item.imageUrl || '/placeholder.jpg'} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item md={8}>
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2">Price: ₹{item.price}</Typography>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleCartItemQuantityChange(index, e.target.value)}
                          fullWidth
                          margin="normal"
                          inputProps={{ min: 1 }}
                        />
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <Typography>No items to display.</Typography>
            )}
          </Grid>

          <Grid item md={6}>
            <Typography variant="h4" color="primary" gutterBottom>
              Delivery Information
            </Typography>
            <form onSubmit={handlePlaceOrder}>
              <TextField
                label="First Name"
                type="text"
                value={address.firstName}
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Last Name"
                type="text"
                value={address.lastName}
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Street Address"
                type="text"
                value={address.streetAddress}
                onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                type="email"
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Phone"
                type="text"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              
              <Typography variant="h6" color="primary" sx={{ mt: 4, mb: 2 }}>
                Payment Method
              </Typography>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio />}
                      label={<><LocalAtmIcon /> Cash on Delivery</>}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    />
                    <FormControlLabel
                      value="Credit Card"
                      control={<Radio />}
                      label={<><CreditCardIcon /> Credit Card</>}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    />
                   <FormControlLabel
  value="PayPal"
  control={<Radio />}
  label={<><FaPaypal /> PayPal</>}
  sx={{ display: 'flex', alignItems: 'center' }}
/>


                  </RadioGroup>
                </FormControl>
              </Card>

              {paymentMethod === 'Credit Card' && (
                <Card sx={{ p: 3, mt: 2 }}>
                  <TextField
                    label="Card Number"
                    type="text"
                    value={creditCardDetails.cardNumber}
                    onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                  />
                  
                  <TextField
                    label="Expiration Date (MM/YY)"
                    type="text"
                    value={creditCardDetails.expirationDate}
                    onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expirationDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="CVV"
                    type="text"
                    value={creditCardDetails.cvv}
                    onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Card>
              )}
              <Typography variant="h5" color="primary" sx={{ mt: 4 }}>
                Total Price: ₹{totalPrice.toFixed(2)}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Place Order
                  </Button>
                )}
              </Box>

              {orderPlaced && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Done sx={{ color: 'green' }} />
                  <Typography variant="h6" sx={{ ml: 1, color: 'green' }}>
                    Order Placed Successfully!
                  </Typography>
                </Box>
              )}
            </form>
          </Grid>
        </Grid>
      </Container>

      {/* Success Dialog */}
      <Dialog
  open={openDialog}
  onClose={handleDialogClose}
  PaperProps={{
    sx: {
      borderRadius: 3, // Rounded corners
      padding: 2, // Add spacing around content
      backgroundColor: '#f4f9f4', // Light greenish background
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
      maxWidth: 400,
    },
  }}
>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mt: -5, // Negative margin to position icon above the dialog
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: '#4caf50', // Success green background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Add depth
      }}
    >
      <Done sx={{ color: 'white', fontSize: 40 }} />
    </Box>
  </Box>
  <DialogTitle
    sx={{
      textAlign: 'center',
      mt: 2,
      fontWeight: 'bold',
      color: '#2e7d32',
    }}
  >
    Order Placed Successfully!
  </DialogTitle>
  <DialogContent>
    <Typography
      variant="body1"
      sx={{
        textAlign: 'center',
        color: '#555',
        marginBottom: 2,
      }}
    >
      Thank you for your purchase. Your order has been placed successfully and will be processed shortly.
    </Typography>
  </DialogContent>
  <DialogActions
    sx={{
      justifyContent: 'center',
    }}
  >
    <Button
      onClick={handleDialogClose}
      variant="contained"
      color="success"
      sx={{
        px: 4, // Horizontal padding for larger button
        borderRadius: 2, // Rounded button
      }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>


      <Footer />
    </div>
  );
}

export default ProductBuy;
