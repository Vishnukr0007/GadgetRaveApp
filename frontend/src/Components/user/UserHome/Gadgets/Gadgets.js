import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Gadgets.css';

function Gadgets() {
  const navigate = useNavigate();

  const AllProductList = () => navigate('/AllProducts');
  const BlueToothSpeakers = () => navigate('/Bluetoothspeakers');
  const EarBuds = () => navigate('/Earbuds');
  const KeyBoardMouse = () => navigate('/Keyboardmouse');
  const NeckBands = () => navigate('/Neckbands');
  const SoundBars = () => navigate('/Soundbars');
  const SmartWatches = () => navigate('/Smartwatches');

  const categories = [
    {
      title: "Bluetooth Speakers",
      image: "https://www.lapcare.com/cdn/shop/files/wbtspeaker.webp?v=1727434584&width=400",
      action: BlueToothSpeakers,
    },
    {
      title: "Earbuds",
      image: "https://www.lapcare.com/cdn/shop/files/tws_1.webp?v=1722497619&width=400",
      action: EarBuds,
    },
    {
      title: "Keyboards & Mouse",
      image: "https://www.lapcare.com/cdn/shop/files/combokm_1.webp?v=1722497619&width=400",
      action: KeyBoardMouse,
    },
    {
      title: "Neckbands",
      image: "https://www.lapcare.com/cdn/shop/files/neckbands_1.webp?v=1722497619&width=400",
      action: NeckBands,
    },
    {
      title: "Soundbars",
      image: "https://www.lapcare.com/cdn/shop/files/soundbar-pc.webp?v=1727434873&width=400",
      action: SoundBars,
    },
    {
      title: "Smartwatches",
      image: "https://www.lapcare.com/cdn/shop/files/Fitso_3_black.jpg?v=1729855823&width=400",
      action: SmartWatches,
    },
  ];

  return (
    <div className="gadget-section">
      {/* Section Header */}
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          padding: 3,
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Popular Categories
      </Typography>

      {/* Horizontal Scroll */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          padding: 3,
          gap: 3,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '4px',
          },
        }}
      >
        {/* "View All" Card */}
        <Card
          onClick={AllProductList}
          sx={{
            minWidth: '300px',
            flexShrink: 0,
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f3f3f3",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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

        {categories.map((category, index) => (
          <Card
            key={index}
            className="gadget-card hover-card"
            onClick={category.action}
            sx={{
              minWidth: '300px',
              flexShrink: 0,
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              '&:hover': { transform: "scale(1.05)", transition: "transform 0.3s ease-in-out" },
            }}
          >
            <CardMedia
              component="img"
              alt={category.title}
              height="200"
              image={category.image}
              sx={{
                borderRadius: "16px 16px 0 0",
              }}
            />
            <CardContent sx={{ textAlign: "center", backgroundColor: "#f9f9f9" }}>
              <Typography variant="h6" color="textPrimary">
                {category.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default Gadgets;
