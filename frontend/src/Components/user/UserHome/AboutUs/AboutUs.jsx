import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AboutUs = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: '50vh',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTkzNnwwfDF8c2VhcmNofDd8fGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNjM3MTM1MjM5&ixlib=rb-1.2.1&q=80&w=1500)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
        </Box>

        <Container sx={{ my: 5 }}>
          {/* Mission & Vision Section */}
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Our Mission & Vision
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            We strive to deliver exceptional products and services to our customers, empowering
            them to achieve their goals while staying true to our core values of quality,
            integrity, and innovation.
          </Typography>

          {/* Quote Section */}
          <Box
            sx={{
              my: 5,
              py: 3,
              px: 2,
              backgroundColor: '#f9f9f9',
              borderLeft: '4px solid #1976d2',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              "The best way to predict the future is to create it."
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              - Peter Drucker
            </Typography>
          </Box>

          {/* Team Section */}
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'John Doe',
                role: 'CEO & Founder',
                image:
                  'https://images.pexels.com/photos/6592361/pexels-photo-6592361.jpeg?auto=compress&cs=tinysrgb&w=500',
              },
              {
                name: 'Jane Smith',
                role: 'Head of Marketing',
                image:
                  'https://images.pexels.com/photos/7679178/pexels-photo-7679178.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                name: 'Samuel Green',
                role: 'Lead Developer',
                image:
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTkzNnwwfDF8c2VhcmNofDd8fGRldmVsb3BlcnxlbnwwfHx8fDE2MzcxMzUyMzk&ixlib=rb-1.2.1&q=80&w=500',
              },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
