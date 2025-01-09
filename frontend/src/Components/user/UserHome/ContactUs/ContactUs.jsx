import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
        <div>
            <Header/>
        </div>
    <Container sx={{ my: 5 }}>
      {/* Contact Details & Google Map */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Reach out to us for any queries, support, or feedback.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Email:
                </Typography>
                <Typography variant="body1">info@yourwebsite.com</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Phone:
                </Typography>
                <Typography variant="body1">+1 234 567 890</Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Address:
                </Typography>
                <Typography variant="body1">
                  123 Main Street, City, Country
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Our Location
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '300px',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.921889408823!2d144.95373631568087!3d-37.8162797426216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43c946fa21%3A0x16e27f3a21e57ab8!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1694590723651!5m2!1sen!2sau"
              style={{
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Get in Touch
        </Typography>
        <Card sx={{ boxShadow: 3, p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, display: 'block', marginLeft: 'auto' }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
    <div>
        <Footer/>
    </div>
    </div>
  );
};

export default ContactUs;
