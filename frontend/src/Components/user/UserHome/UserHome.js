import React, { useState, useEffect } from 'react';
import { Box, Typography} from '@mui/material';
import { styled } from '@mui/system';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import BestSeller from './BestSeller/BestSeller';
import Gadgets from './Gadgets/Gadgets';
import './UserHome.css';
import ProductVideos from './ProductVideos/ProductVideos';


// Styled components for Material-UI
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  maxHeight: '500px',
  display: 'flex',
  justifyContent: 'center',
}));

const SlideImage = styled('img')({
  width: '100%',
  objectFit: 'cover',
});

const TimerBox = styled(Box)({
  position: 'absolute',
  top: '10px',
  right: '20px',
  background: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  borderRadius: '8px',
  padding: '5px 10px',
});

function UserHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState(5);

  // Carousel images
  const slides = [
    'https://www.lapcare.com/cdn/shop/files/diwali_banner_website_1_1.webp?v=1730273385&width=2000',
    'https://www.lapcare.com/cdn/shop/files/diwali_mobity_website_banner.webp?v=1730273384&width=2000',
    'https://www.lapcare.com/cdn/shop/files/diwali_banner_website_bt_speakers_copy_1.webp?v=1729767474&width=2000',
  ];

  // Countdown and slide transition logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 3)); // Reset countdown to 5 seconds
      if (countdown === 1) {
        setCurrentSlide((prev) => (prev + 1) % slides.length); // Move to the next slide
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [countdown, slides.length]);

  return (
    <div>
      <Header />
      {/* Carousel */}
      <CarouselContainer>
        <SlideImage src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
        <TimerBox>
          <Typography variant="body2"> {countdown}s</Typography>
        </TimerBox>
      </CarouselContainer>

      {/* Gadgets Section */}
      <Box mt={4}>
        <Gadgets />
      </Box>

      {/* Best Seller Section */}
      <Box mt={4}>
        <BestSeller />
      </Box>
      {/* Product videos section*/}
      <Box>
        <ProductVideos/>
      </Box>
      

      {/* Footer */}
      <Box mt={4} className="footer">
        <Footer />
        
      </Box>
    </div>
  );
}

export default UserHome;
