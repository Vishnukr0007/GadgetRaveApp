import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { Facebook, Twitter, Google } from "@mui/icons-material";

function AdLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in (adminToken exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/AdminHome"); // Redirect to admin dashboard if logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      // If login successful, store token and admin name in localStorage
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", username);

      // Redirect to admin dashboard
      navigate("/admin/AdminHome");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "whitesmoke",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Please enter your username and password!
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "25px",
                textTransform: "uppercase",
              }}
            >
              Login
            </Button>
          </Box>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            <Grid item>
              <IconButton color="primary">
                <Facebook />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary">
                <Twitter />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary">
                <Google />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdLoginPage;
