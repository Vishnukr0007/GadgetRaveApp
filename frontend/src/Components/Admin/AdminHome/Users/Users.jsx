import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "80vh" }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "80vh",
          color: "red",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "firstName", headerName: "First Name", flex: 1, headerAlign: "center", align: "center" },
    { field: "lastName", headerName: "Last Name", flex: 1, headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email Address", flex: 1.5, headerAlign: "center", align: "center" },
    { field: "phone", headerName: "Phone Number", flex: 1, headerAlign: "center", align: "center" },
    { field: "createdAt", headerName: "Date Joined", flex: 1, headerAlign: "center", align: "center" },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phoneNumber,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1e293b",
          mb: 3,
        }}
      >
  
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          autoHeight
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1e293b",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": {
                backgroundColor: "#f3f4f6",
              },
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
              padding: "12px",
            },
            "& .MuiDataGrid-footerCell": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#e2e8f0",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default Users;
