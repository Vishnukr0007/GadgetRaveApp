import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Box,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

function Orders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (location.state && location.state.order) {
      setOrders([location.state.order]);
    } else {
      axios
        .get('http://localhost:5000/api/orders')
        .then((response) => setOrders(response.data))
        .catch((error) => console.error('Error fetching orders:', error));
    }
  }, [location.state]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Validate the newStatus before making the API call
      const validStatuses = ['OrderPlaced', 'Shipped', 'Delivered', 'Cancelled'];
      if (!validStatuses.includes(newStatus)) {
        console.error('Invalid status:', newStatus);
        return;
      }
  
      console.log(`Updating order ${orderId} to status: ${newStatus}`);
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
      
      // Update the local state on success
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      console.log('Order status updated successfully:', response.data);
    } catch (error) {
      // Log the full error response for debugging
      console.error('Error updating order status:', error.response?.data || error.message);
  
      // Notify the user of the error
      setSnackbar({
        open: true,
        message: `Failed to update order status: ${error.response?.data?.message || 'Unknown error'}`,
        severity: 'error',
      });
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Container>
      
      {orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order._id} sx={{ my: 4, boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Order ID: {order._id}</Typography>
                  <Typography variant="body1">
                    <strong>Total: </strong>₹{order.totalPrice}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address: </strong>
                    {order.address.firstName} {order.address.lastName},{' '}
                    {order.address.streetAddress}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Payment Method: </strong>
                    {order.paymentMethod}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Select
                    value={order.status || 'OrderPlaced'}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    fullWidth
                    sx={{ maxWidth: '200px' }}
                    disabled={loading}
                  >
                    <MenuItem value="OrderPlaced">OrderPlaced</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              {/* Order Details Table */}
              <Box sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Avatar
                            src={item.imageUrl || '/placeholder.jpg'}
                            alt={item.name}
                            sx={{ width: 56, height: 56 }}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" align="center">
          No orders found.
        </Typography>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Orders;
