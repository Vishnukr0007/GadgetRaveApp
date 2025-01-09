import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        localStorage.removeItem('token');
        navigate('/Userlogin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/userorders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(
          err.response?.data?.message || 'Failed to fetch orders. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <Header />
        <Container maxWidth="lg" sx={{ my: 5 }}>
          <Typography variant="body1" align="center">
            Loading orders...
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <Container maxWidth="lg" sx={{ my: 5 }}>
          <Typography variant="body1" align="center" color="error">
            {error}
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          My Orders
        </Typography>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Box key={order._id} sx={{ mb: 5, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order ID: {order._id}
              </Typography>
              <Typography variant="body1">
                <strong>Total:</strong> ₹{order.totalPrice}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {order.address.firstName} {order.address.lastName},
                {order.address.streetAddress}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Image</TableCell>
                      <TableCell>Item Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.cartItems.map((item) => (
                      <TableRow key={item.id || item._id || `${item.name}-${item.price}`}>
                        <TableCell>
                          <img
                            src={item.imageUrl && item.imageUrl.trim() !== '' ? item.imageUrl : '/placeholder.jpg'}
                            alt={item.name || 'Product'}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: 'cover',
                              borderRadius: 4,
                            }}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">₹{item.price}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Track Order
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Timeline
                  position="left"
                  sx={{
                    flexDirection: 'row',
                    padding: 0,
                    overflowX: 'auto',
                    width: '100%',
                  }}
                >
                  {['OrderPlaced', 'Shipped', 'Delivered', 'Cancelled'].map((step, index, array) => (
                    <TimelineItem
                      key={step}
                      sx={{
                        flex: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '120px',
                      }}
                    >
                      <TimelineSeparator>
                        <TimelineDot color={step === (order.status || 'OrderPlaced') ? 'primary' : 'grey'} />
                        {index < array.length - 1 && (
                          <TimelineConnector
                            sx={{
                              height: '2px',
                              backgroundColor:
                                step === (order.status || 'OrderPlaced') ? 'primary.main' : 'grey.500',
                              width: '100px',
                            }}
                          />
                        )}
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          mt: 1,
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          color={step === (order.status || 'OrderPlaced') ? 'primary' : 'textSecondary'}
                        >
                          {step}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>
            </Box>
          ))
        ) : (
          <Typography align="center">No orders found.</Typography>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default MyOrders;