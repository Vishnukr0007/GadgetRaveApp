import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from '@mui/material';
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      setErrorMessage('You must accept the terms of service');
      return;
    }

    const finalUserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber, // Ensure this is included
      email: userData.email,
      password: userData.password,
      termsAccepted,
    };

    try {
      // Axios POST request to the backend
      const response = await axios.post('http://localhost:5000/api/signup', finalUserData);
      console.log('User registered successfully:', response.data);

      // Redirect to User Home on success
      navigate('/');
    } catch (error) {
      // Handle error
      const errorMsg = error.response?.data?.error || 'There was an error registering the user';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Card sx={{ maxWidth: 500, padding: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Create an account
            </Typography>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={userData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                  />
                }
                label="I agree to the terms of service"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, padding: 1 }}
              >
                Register
              </Button>
            </form>

            <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
              Already have an account?{' '}
              <Button
                color="secondary"
                onClick={() => navigate('/UserLogin')}
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  );
}

export default SignUpPage;
