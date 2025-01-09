import React from 'react';
import { Grid, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Home, Mail, Phone, Print } from '@mui/icons-material';
import './Footer.css';

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#0d0d0d', color: 'white', padding: '40px 0' }} className="footer-section">
      {/* Social Media Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #333',
          paddingBottom: 2,
          px: 4,
        }}
      >
        <Typography variant="body2" sx={{ color: '#aaa', display: { xs: 'none', lg: 'block' } }}>
          Follow us on social media:
        </Typography>
        <Box>
          <IconButton href="https://www.facebook.com" sx={{ color: '#aaa', '&:hover': { color: '#4267B2' } }}>
            <Facebook />
          </IconButton>
          <IconButton href="https://www.twitter.com" sx={{ color: '#aaa', '&:hover': { color: '#1DA1F2' } }}>
            <Twitter />
          </IconButton>
          <IconButton href="https://www.instagram.com" sx={{ color: '#aaa', '&:hover': { color: '#C13584' } }}>
            <Instagram />
          </IconButton>
          <IconButton href="https://www.linkedin.com" sx={{ color: '#aaa', '&:hover': { color: '#0077B5' } }}>
            <LinkedIn />
          </IconButton>
        </Box>
      </Box>

      {/* Footer Content */}
      <Grid container spacing={4} sx={{ mt: 5, px: 4 }}>
        {/* Company Info */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
            Gadget Rave
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            Discover cutting-edge technology and premium gadgets at unbeatable prices. Your one-stop destination for the latest in innovation.
          </Typography>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
            Products
          </Typography>
          {['Bluetooth Speakers', 'Smart Watches', 'Earbuds', 'Soundbars'].map((product) => (
            <Typography variant="body2" sx={{ color: '#aaa', marginBottom: 1 }}>
              <a href={`/${product.replace(' ', '').toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {product}
              </a>
            </Typography>
          ))}
        </Grid>

        {/* Useful Links Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
            Useful Links
          </Typography>
          {['About Us', 'Contact Us', 'Privacy Policy', 'Customer Support'].map((link) => (
            <Typography variant="body2" sx={{ color: '#aaa', marginBottom: 1 }}>
              <a href={`/${link.replace(' ', '').toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {link}
              </a>
            </Typography>
          ))}
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Home sx={{ mr: 1 }} /> 123 Tech Street, Silicon Valley, CA, USA
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Mail sx={{ mr: 1 }} /> info@gadgetrave.com
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Phone sx={{ mr: 1 }} /> +1 234 567 890
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Print sx={{ mr: 1 }} /> +1 234 567 891
          </Typography>
        </Grid>
      </Grid>

      {/* Subscribe Section */}
      <Box sx={{ mt: 5, textAlign: 'center', px: 4 }}>
        <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
          Subscribe to our newsletter
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            label="Enter your email"
            fullWidth
            sx={{
              maxWidth: 300,
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#888',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
            }}
          />
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>
            Subscribe
          </Button>
        </Box>
      </Box>

      {/* Copyright Section */}
      <Box
        sx={{
          textAlign: 'center',
          mt: 5,
          padding: 2,
          borderTop: '1px solid #333',
          px: 4,
        }}
      >
        <Typography variant="body2" sx={{ color: '#aaa' }}>
          © {new Date().getFullYear()} Gadget Rave: 
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            gadgetrave.com
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
