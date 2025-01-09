import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import { FaHome, FaBoxes, FaShoppingCart, FaUsers } from "react-icons/fa";
import AllCollections from "../AllCollections/AllCollections";
import CreateCollection from "../CreateCollection/CreateCollection";
import Users from "../Users/Users";
import Orders from "../Orders/Orders";

function Adminbody() {
  const [selectedSection, setSelectedSection] = useState("All Collections");

  const renderContent = () => {
    switch (selectedSection) {
      case "Home":
        return <AllCollections />;
      case "Create Collection":
        return <CreateCollection />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      default:
        return <AllCollections />;
    }
  };

  const menuItems = [
    { text: "Home", icon: <FaHome />, value: "All Collections" },
    { text: "Create Collection", icon: <FaBoxes />, value: "Create Collection" },
    { text: "Orders", icon: <FaShoppingCart />, value: "Orders" },
    { text: "Users", icon: <FaUsers />, value: "Users" },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
    >
      {/* Navbar Placeholder */}
      <Box
        sx={{
          height: 64, // Example height for navbar
          backgroundColor: "#1e293b",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Admin Dashboard Navbar</Typography>
      </Box>

      {/* Main Content */}
      <Box display="flex" flex={1}>
        {/* Left-side navigation with Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            "& .MuiDrawer-paper": {
              width: 240,
              backgroundColor: "#1e293b",
              color: "#fff",
              boxShadow: "4px 0px 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box
            p={2}
            sx={{
              textAlign: "center",
              borderBottom: "1px solid #334155",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#38bdf8" }}
            >
              Admin Panel
            </Typography>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => setSelectedSection(item.value)}
                sx={{
                  "&:hover": { backgroundColor: "#334155" },
                  backgroundColor:
                    selectedSection === item.value ? "#334155" : "inherit",
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Right-side content area */}
        <Box flex={1} p={3} sx={{ overflowY: "auto" }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              padding: 3,
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1e293b",
              }}
            >
              {selectedSection}
            </Typography>
            {renderContent()}
          </Box>
        </Box>
      </Box>

    </Box>
  );
}

export default Adminbody;
