import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function Earbuds() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setFormData({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
      });
      setEditingProduct(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description.length !== 200) {
      alert("Description must be exactly 200 characters long.");
      return;
    }
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/admin/Earbuds/${editingProduct._id}`, formData);
        alert("Product updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/admin/Earbuds", formData);
        alert("Product added successfully");
      }
      fetchProducts();
      toggleForm();
    } catch (error) {
      console.error("There was an error submitting the product!", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/Earbuds");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/Earbuds/${productId}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ padding: "70px" }}>
        <Typography variant="h3" align="center" gutterBottom>
          Earbuds
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Explore the latest wireless sound technology
        </Typography>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleForm}
          >
            {editingProduct ? "Edit Product" : "Add Product"}
          </Button>
        </Box>

        {/* Form Modal */}
        <Modal open={showForm} onClose={toggleForm}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Product Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                margin="normal"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                inputProps={{ maxLength: 200 }}
                helperText={`Characters: ${formData.description.length}/200`}
              />
              <TextField
                label="Image URL"
                name="imageUrl"
                fullWidth
                margin="normal"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
              />
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                  {editingProduct ? "Update Product" : "Save Product"}
                </Button>
                <Button variant="outlined" onClick={toggleForm}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>

        {/* Products Table */}
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.description}
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(product)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(product._id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Box>
   
  );
}

export default Earbuds;
