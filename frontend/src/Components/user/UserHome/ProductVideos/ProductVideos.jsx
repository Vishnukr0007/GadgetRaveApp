import React from 'react';
import { Grid, Box, Container, Typography } from '@mui/material';

function ProductVideos() {
  const videos = [
    {
      videoUrl: "https://videos.pexels.com/video-files/8037770/8037770-sd_640_360_24fps.mp4", // Smartphone animation
    },
    {
      videoUrl: "https://videos.pexels.com/video-files/9130473/9130473-sd_360_640_30fps.mp4", // Wireless headphones animation
    },
    {
      videoUrl: "https://videos.pexels.com/video-files/5636815/5636815-uhd_2560_1440_30fps.mp4", // Laptop animation
    },
    {
      videoUrl: "https://videos.pexels.com/video-files/4384188/4384188-sd_640_360_30fps.mp4", // Smartwatch animation
    },
    {
      videoUrl: "https://videos.pexels.com/video-files/11537353/11537353-sd_640_360_30fps.mp4", // Smartwatch animation
    },
    {
      videoUrl: "https://videos.pexels.com/video-files/4982734/4982734-sd_640_360_25fps.mp4", // Smartwatch animation
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 6,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 4,
        }}
      >
        Product Preview
      </Typography>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  component="video"
                  src={video.videoUrl}
                  alt={`Video ${index + 1}`}
                  autoPlay
                  loop
                  muted
                  sx={{
                    width: "300px", // Set a fixed width
                    height: "200px", // Set a fixed height
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    mb: 2,
                    objectFit: "cover", // Ensures the video fits nicely within the defined dimensions
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductVideos;
