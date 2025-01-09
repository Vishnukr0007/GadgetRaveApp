import React, { useState } from 'react';
import axios from 'axios';
import './CreateCollection.css'
function CreateCollection() {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    
  });

  const [message, setMessage] = useState(''); // For success or error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send POST request to backend API to create collection
      const response = await axios.post('http://localhost:5000/api/admin/collection', formData);

      // Display success message and clear the form
      setMessage({ type: 'success', response, text: 'Collection created successfully!' });
      setFormData({
        title: '',
        imageUrl: '',
      
      });
    } catch (error) {
      // Display error message
      const errorMsg = error.response?.data?.message || 'Error creating collection. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-5">
      <h2>Create New Collection</h2>
      {/* Form to create new collection */}
      <form onSubmit={handleSubmit} className='col-md-8 bg-white p-3'>
        {/* Title Input */}
        <div className="form-group mb-3">
          <label htmlFor="title">Collection Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter collection title"
            required
          />
        </div>

        {/* Image URL Input */}
        <div className="form-group mb-3">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

       

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Collection'}
        </button>
      </form>

      {/* Display Success/Error Messages */}
      {message && (
        <div className={`alert mt-3 ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message.text}
        </div>
      )}

      {/* Display Image Preview if imageUrl is provided */}
      {formData.imageUrl && (
        <div className="image-preview mt-4">
          <h5>Image Preview:</h5>
          <img
            src={formData.imageUrl}
            alt="Collection Preview"
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', padding: '10px' }}
          />
        </div>
      )}
    </div>
  );
}

export default CreateCollection;
