import React from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, Container, Box } from '@mui/material';
import './BestSeller.css';

function BestSeller() {
  return (
    <Box
      component="section"
      className="bestseller-section"
      sx={{
        backgroundColor: "#f9f9f9",
        py: 6,
        px: { xs: 3, md: 6 },
      }}
    >
      {/* Section Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          color: "#333",
        }}
      >
        Best Sellers
      </Typography>

      {/* Best Seller Items */}
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Product Cards */}
          {[
            {
              title: "Bluetooth Speaker",
              description: "High-quality Bluetooth speaker with superior sound and modern design.",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXI4Y7UbsmoIp12clzMucKTg9XwnJhMysjA&s",
            },
            {
              title: "Wireless Earbuds",
              description: "Comfortable, high-performance wireless earbuds with long battery life.",
              image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
              title: "Smartwatch",
              description: "Sleek, feature-packed smartwatch for fitness and daily use.",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHNfrDizB5iykeL8vMXhS2fwoKNr7QF_PS3Q&s",
            },
            {
              title: "Gaming Keyboard",
              description: "RGB backlit mechanical keyboard for ultimate gaming experience.",
              image: "https://images.pexels.com/photos/7862584/pexels-photo-7862584.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="seller-card"
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="200"
                  image={item.image}
                  sx={{
                    borderRadius: "16px 16px 0 0",
                  }}
                />
                <CardContent
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    py: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginBottom: 2 }}
                  >
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "8px",
                      px: 4,
                      "&:hover": { backgroundColor: "#004ba0" },
                    }}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default BestSeller;
