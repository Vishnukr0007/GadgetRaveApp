import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllCollections.css';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  Grid,
  IconButton,
  Modal,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AllCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', imageUrl: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  const navigate = useNavigate();

  // Fetch collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/collections');
        setCollections(response.data);
      } catch (err) {
        setError('Error fetching collections. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Handle delete
  const handleDelete = async (collectionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/collections/${collectionId}`);
      setCollections(collections.filter((collection) => collection._id !== collectionId));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Error deleting collection.');
    }
  };

  // Handle edit
  const handleEditClick = (collection) => {
    setEditingCollectionId(collection._id);
    setEditFormData({ title: collection.title, imageUrl: collection.imageUrl });
  };

  // Save edit
  const handleSave = async (collectionId) => {
    try {
      const updatedCollection = {
        title: editFormData.title,
        imageUrl: editFormData.imageUrl,
      };
      await axios.put(`http://localhost:5000/api/collections/${collectionId}`, updatedCollection);
      setCollections(
        collections.map((collection) =>
          collection._id === collectionId ? { ...collection, ...updatedCollection } : collection
        )
      );
      setEditingCollectionId(null);
    } catch (err) {
      setError('Error updating collection.');
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingCollectionId(null);
  };

  // Handle card click
  const handleCardClick = (collectionId, collectionTitle) => {
    const lowerCaseTitle = collectionTitle.toLowerCase().trim();
    if (lowerCaseTitle.includes('earbuds')) {
      navigate('/earbuditems');
    } else if (lowerCaseTitle.includes('bluetooth')) {
      navigate('/bluetooth');
    } else if (lowerCaseTitle.includes('keyboard&mouse')) {
      navigate('/keyboardmouseitems');
    } else if (lowerCaseTitle.includes('neckbands')) {
      navigate('/neckbandsitems');
    } else if (lowerCaseTitle.includes('soundbars')) {
      navigate('/soundbarsitems');
    } else if (lowerCaseTitle.includes('smartwatches')) {
      navigate('/smartwatchitems');
    } else {
      navigate(`/collection/${collectionId}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mx="auto" p={3} maxWidth="600px">
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (collections.length === 0) {
    return (
      <Box mx="auto" p={3} textAlign="center">
        <Typography variant="h5" color="textSecondary">
          No collections found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: "50px" }}>
      {collections.map((collection) => (
        <Grid item xs={12} sm={6} md={4} key={collection._id}>
          <Card
            onClick={() => handleCardClick(collection._id, collection.title)}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={collection.imageUrl || 'https://via.placeholder.com/150'}
              alt={collection.title}
            />
            <CardContent>
              {editingCollectionId === collection._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    placeholder="Edit title"
                    className="form-control"
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    value={editFormData.imageUrl}
                    onChange={(e) => setEditFormData({ ...editFormData, imageUrl: e.target.value })}
                    placeholder="Edit image URL"
                    className="form-control mt-2"
                  />
                  <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={() => handleSave(collection._id)}>
                      Save
                    </Button>
                    <Button variant="text" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography variant="h6">{collection.title}</Typography>
              )}
            </CardContent>
            <CardActions>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(collection);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setCollectionToDelete(collection);
                  setShowDeleteModal(true);
                }}
              >
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="delete-modal-title"
      >
        <Box p={3} mx="auto" my="20%" textAlign="center" maxWidth="400px" bgcolor="white" borderRadius="8px">
          <Typography id="delete-modal-title" variant="h6">
            Confirm Delete
          </Typography>
          <Typography>Are you sure you want to delete "{collectionToDelete?.title}"?</Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(collectionToDelete._id)}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
            <Button variant="text" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}

export default AllCollections;
