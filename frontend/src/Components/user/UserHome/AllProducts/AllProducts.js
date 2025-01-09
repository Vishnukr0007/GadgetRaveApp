import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Container,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AllProducts() {
  const [collections, setCollections] = useState([]); // State to store collections
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  // Fetch collections from the backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/collections');
        setCollections(response.data); // Set fetched collections to state
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError('Error fetching collections. Please try again.');
        setLoading(false);
      }
    };

    fetchCollections(); // Call the fetch function
  }, []);

  const navigateTo = (collectionId, collectionTitle) => {
    const lowerCaseTitle = collectionTitle.toLowerCase().trim();

    if (lowerCaseTitle.includes('earbuds')) {
      navigate('/Earbuds');
    } else if (lowerCaseTitle.includes('bluetooth')) {
      navigate('/Bluetoothspeakers');
    } else if (lowerCaseTitle.includes('keyboard&mouse')) {
      navigate('/Keyboardmouse');
    } else if (lowerCaseTitle.includes('neckbands')) {
      navigate('/Neckbands');
    } else if (lowerCaseTitle.includes('soundbars')) {
      navigate('/Soundbars');
    } else if (lowerCaseTitle.includes('smartwatches')) {
      navigate('/Smartwatches');
    } else {
      navigate(`/usercollection/${collectionId}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          All Collections
        </Typography>
        <Grid container spacing={4}>
          {collections.map((collection) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
              <Card sx={{ boxShadow: 3, height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={collection.imageUrl}
                  alt={collection.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {collection.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {collection.description || 'Explore our premium range of products in this category.'}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => navigateTo(collection._id, collection.title)}
                  >
                    View More
                  </Button>
                </CardContent>
              </Card>
            
            </Grid>
          ))}
            <Card
          
          sx={{
            minWidth: '300px',
            flexShrink: 0,
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f3f3f3",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:'100px',
            marginTop:'20px',
            cursor: 'pointer',
            '&:hover': {
              transform: "scale(1.05)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <Typography variant="h6" color="primary">
            View All
          </Typography>
        </Card>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default AllProducts;
