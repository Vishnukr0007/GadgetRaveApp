import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'; 
import {  Toolbar,Button, Badge,IconButton,CardContent,TextField, List,Card, ListItem, 
  ListItemText, ListItemAvatar, Avatar, Typography,Grid,CardMedia,Menu,MenuItem, 
  } from '@mui/material';
import { Link } from 'react-router-dom'; // or 'react-router-dom' if you're using React Router
import { ArrowDropDown } from '@mui/icons-material';
import { Add, Remove, Close } from '@mui/icons-material';
import { RiAccountCircleFill } from 'react-icons/ri';
import { FaSearch } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import logo from '../Images/Preview.png'; 
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../CartContext.jsx';
import { debounce } from 'lodash';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const cartRef = useRef(null);
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [anchorElCategories, setAnchorElCategories] = useState(null);
  const [anchorElSupport, setAnchorElSupport] = useState(null);
 
  const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
  const handleCategoryMenuClick = (event) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleSupportMenuClick = (event) => {
    setAnchorElSupport(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElCategories(null);
    setAnchorElSupport(null);
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartRef]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [setCartItems]);
  
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/items?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Create a debounced function using useCallback
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSearchSuggestions([]); // reset suggestions if query is empty
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/items/suggestions?query=${query}`);
        setSearchSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    }, 300),
    [setSearchSuggestions] // Now setSearchSuggestions is explicitly listed as a dependency.
  );
  
  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchSuggestions(value); // Call the debounced function
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSearchSuggestions([]);
    // Navigate to the product's details page with the product ID as a route parameter
    navigate(`/product/${suggestion._id}`);
  };

  const handleResultClick = (result) => {
    navigate(`/product/${result._id}`);
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantities
  
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const LoginPage = () => navigate('/Userlogin');
  const AllProductList = () => navigate('/AllProducts');
  const BlueToothSpeakers = () => navigate('/Bluetoothspeakers');
  const EarBuds = () => navigate('/Earbuds');
  const KeyBoardMouse = () => navigate('/Keyboardmouse');
  const NeckBands = () => navigate('/Neckbands');
  const SoundBars = () => navigate('/Soundbars');
  const SmartWatches = () => navigate('/Smartwatches');

  return (
    <div>
            
      <header className='navbar'>
        <Navbar expand="lg" className="navbar fixed-top custom-navbar" bg="white">
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} alt="Logo" className="logo" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        
  <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'200px' }}>
  
  <Button color="inherit" component={Link} to="/">
    Home
  </Button>
  
  
  <Button 
    onClick={handleCategoryMenuClick} 
    color="inherit" 
    endIcon={<ArrowDropDown />}
  >
    Categories
  </Button>
  
  <Menu
    anchorEl={anchorElCategories}
    open={Boolean(anchorElCategories)}
    onClose={handleCloseMenu}
  >
    <MenuItem onClick={() => { BlueToothSpeakers(); handleCloseMenu(); }}>Bluetooth Speakers</MenuItem>
    <MenuItem onClick={() => { EarBuds(); handleCloseMenu(); }}>Earbuds</MenuItem>
    <MenuItem onClick={() => { KeyBoardMouse(); handleCloseMenu(); }}>Keyboards & Mouse</MenuItem>
    <MenuItem onClick={() => { NeckBands(); handleCloseMenu(); }}>Neckbands</MenuItem>
    <MenuItem onClick={() => { SoundBars(); handleCloseMenu(); }}>Soundbars</MenuItem>
    <MenuItem onClick={() => { SmartWatches(); handleCloseMenu(); }}>SmartWatches</MenuItem>
    <MenuItem onClick={() => { AllProductList(); handleCloseMenu(); }}>All Products</MenuItem>
  </Menu>

  <Button color="inherit" component={Link} to="/justlaunched">
    Just launched
  </Button>
  
  <Button 
    onClick={handleSupportMenuClick} 
    color="inherit" 
    endIcon={<ArrowDropDown />}
  >
    Support
  </Button>
  
  <Menu
    anchorEl={anchorElSupport}
    open={Boolean(anchorElSupport)}
    onClose={handleCloseMenu}
  >
    <MenuItem component={Link} to="/about" onClick={handleCloseMenu}>About</MenuItem>
    <MenuItem component={Link} to="/contact" onClick={handleCloseMenu}>Contact Us</MenuItem>
  </Menu>
</Toolbar>


      <div className="nav-icons">
      <IconButton 
  onClick={toggleSearchBar} 
  color="primary" 
  className="search-btn"
  aria-label="Search"
  sx={{ marginLeft: '150px' }} // Adds left margin
>
  <FaSearch className="icons" />
</IconButton>

                {/* Search Bar */}
                {isSearchVisible && (
                  <div className="search-popup" ref={searchRef} style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px' }}>
                  <TextField
                    type="text"
                    placeholder="Search..."
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{ style: { marginBottom: '16px' } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSearch}
                    style={{ marginBottom: '16px' }}
                  >
                    Search
                  </Button>
                  
                  {searchSuggestions.length > 0 && (
                    <div className="search-suggestions" style={{ marginBottom: '16px' }}>
                      <List>
                        {searchSuggestions.map((suggestion) => (
                          <ListItem button key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
                            <ListItemText primary={suggestion.name} />
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  )}
            
                  <div className="search-results">
                    {searchResults.length > 0 ? (
                      <List>
                        {searchResults.map((result) => (
                          <ListItem
                            button
                            key={result._id}
                            onClick={() => handleResultClick(result)}
                            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                          >
                            <ListItemAvatar>
                              <Avatar src={result.imageUrl} alt={result.name} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                  {result.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" color="textSecondary">
                                  ₹{result.price.toFixed(2)}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="textSecondary" align="center">
                        No results found
                      </Typography>
                    )}
                  </div>
                </div>
                )}

<IconButton onClick={LoginPage} className="cart-button" color="primary">
      <RiAccountCircleFill className="icons" />
    </IconButton>

    <IconButton onClick={toggleCart} className="btns" color="primary">
      <Badge badgeContent={cartItems.length} color="primary" invisible={cartItems.length === 0}>
        <IoCartSharp className="icons" />
      </Badge>
    </IconButton>
    <div className={`cart-popup ${isCartVisible ? 'open' : ''}`} ref={cartRef}>
  <h3>Shopping Cart</h3>
  <div className="cart-items">
    {cartItems.length === 0 ? (
      <Typography variant="body1" align="center">Your cart is empty</Typography>
    ) : (
      cartItems.map((product) => (
        <Card key={product._id} className="cart-item" style={{ margin: '16px 0', padding: '8px', display: 'flex' }}>
          <CardMedia
            component="img"
            src={product.imageUrl}
            alt={product.name}
            style={{ width: 50, height: 50, objectFit: 'cover' }}
          />
          <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="body1">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">
            ₹{product.price}
            </Typography>
            <Grid container alignItems="center" spacing={1} className="quantity-controls">
              <Grid item>
                <IconButton onClick={() => updateQuantity(product._id, product.quantity - 1)} disabled={product.quantity <= 1}>
                  <Remove />
                </IconButton>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  value={product.quantity}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: 1 }}
                  onChange={(e) => updateQuantity(product._id, parseInt(e.target.value) || 1)}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => updateQuantity(product._id, product.quantity + 1)}>
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
          <IconButton onClick={() => removeFromCart(product._id)} style={{ alignSelf: 'center', marginLeft: 'auto' }} color="error">
            <Close />
          </IconButton>
        </Card>
      ))
    )}
  </div>
  {cartItems.length > 0 && (
    <div className="total-amount" sx={{ textAlign: 'center', marginTop: 2 }}>
      <Typography variant="h6" color="textPrimary">
        Total: ₹{totalAmount.toFixed(2)}
      </Typography>
    </div>
  )}
  <div className="cart-actions">
    <Button variant="contained" color="secondary" onClick={toggleCart} className="close-btn">Close</Button>
    {cartItems.length > 0 && (
      <Button variant="contained" color="primary" onClick={handleCheckout} className="checkout-btn" size="large">Checkout</Button>
    )}
  </div>
</div>


              </div>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
