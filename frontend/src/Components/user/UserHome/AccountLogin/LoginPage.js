import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Box,
  Paper,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../CartContext.jsx';
import './LoginPage.css';

function LoginPage() {
  const { fetchCart, saveCartToBackend, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const SignUpPage = () => {
    navigate('/UserSignUp');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      const { token, user } = response.data;
  
      // Save token and user details to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
  
      if (token) {
        const userResponse = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(userResponse.data);
        setIsLoggedIn(true);
  
        // Fetch cart after successful login
        const userId = userResponse.data._id;
        if (userId) {
          await fetchCart(userId); // Fetch user-specific cart
        }
      }
  
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };
  

  const handleLogout = async () => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (currentCart.length > 0) {
        await saveCartToBackend(currentCart);
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      setCartItems([]);
      setUserDetails(null);
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserDetails(response.data);
          setIsLoggedIn(true);
          const userId = response.data._id;
          if (userId) {
            fetchCart(userId);
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          setIsLoggedIn(false);
          setUserDetails(null);
          localStorage.removeItem('token');
        });
    }
  }, [fetchCart]);
  

  return (
    <div>
      <Header />
      <div className="login-sec">
        <Container maxWidth="sm" className="mt-5">
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }}>
            <Grid item xs={12}>
              <Card elevation={3} style={{ borderRadius: '12px' }}>
                <CardContent>
                  {!isLoggedIn ? (
                    <>
                      <Typography variant="h4" align="center" gutterBottom>
                        Login
                      </Typography>
                      <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                        Please enter your login and password!
                      </Typography>
                      {error && <Typography color="error" align="center">{error}</Typography>}
                      <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Typography variant="body2" color="textSecondary" align="right">
                        <a href="#!">Forgot password?</a>
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        style={{ marginTop: '16px' }}
                      >
                        Login
                      </Button>
                      <Box display="flex" justifyContent="center" mt={2}>
                        <IconButton color="primary">
                          <FacebookIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <TwitterIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <GoogleIcon />
                        </IconButton>
                      </Box>
                      <Typography align="center" style={{ marginTop: '16px' }}>
                        Don't have an account?{' '}
                        <Button color="secondary" onClick={SignUpPage}>
                          Sign Up
                        </Button>
                      </Typography>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f4f6f9', borderRadius: '10px' }}>
                      <Paper sx={{ padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
                        <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                          Welcome, {userDetails?.firstName || userDetails?.name || 'User'}!
                        </Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                          Email: {userDetails?.email}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ padding: '10px 20px', fontWeight: 'bold', borderRadius: '8px', transition: '0.3s' }}
                            onClick={() => navigate('/my-orders')}
                          >
                            My Orders
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ padding: '10px 20px', fontWeight: 'bold', borderRadius: '8px', transition: '0.3s' }}
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </Box>
                      </Paper>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
