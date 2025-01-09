const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserLoginSignUpRoute=require('./routes/User/UserLoginSignUp')
const authMiddleware = require('./middleware/authMiddleware');
const adminRegisterRoute = require('./routes/Admin/AdminRegister');
const adminLoginRoute = require('./routes/Admin/AdminLogin');
const authenticateAdminToken = require('./middleware/authenticateAdminToken');
const adminCollectionRoute = require('./routes/Admin/CollectionCreate');
const adminBluetoothRoute=require('./routes/Admin/BluetoothProducts')
const adminEarbudRoute=require('./routes/Admin/EarbudProducts')
const adminKeyboarMouseRoute=require('./routes/Admin/KeyboarMouseProducts')
const adminNeckbandProductsRoute=require('./routes/Admin/NeckbandProducts')
const adminSoundbarProductsRoute=require('./routes/Admin/SoundbarProducts')
const adminSmartwatchProductsRoute=require('./routes/Admin/SmartwatchProducts');
const ProductOrdersRoute=require('./routes/Admin/ProductOrders');
const userordersRoute=require('./routes/User/UserOrders')
const ProductItemsRoute=require('./routes/Admin/Items')
const AdminSearchRoute=require('./routes/Admin/AdminSearch')
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Built-in JSON body parser
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();
// Routes

app.use(UserLoginSignUpRoute)
app.use( adminRegisterRoute);
app.use( adminLoginRoute);
app.use( adminCollectionRoute);
app.use( adminBluetoothRoute);
app.use( adminEarbudRoute);
app.use( adminKeyboarMouseRoute);
app.use( adminNeckbandProductsRoute);
app.use( adminSoundbarProductsRoute);
app.use( adminSmartwatchProductsRoute);
app.use( ProductOrdersRoute);
app.use(userordersRoute)
app.use(ProductItemsRoute)
app.use(AdminSearchRoute)
// Protected user route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Protected admin dashboard route
app.get('/api/admin/dashboard', authenticateAdminToken, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/GADGETRAVE', {
  
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
