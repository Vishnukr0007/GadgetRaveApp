# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

        import { FaSearch } from "react-icons/fa";
        import { IoCartSharp } from "react-icons/io5";



     

import Footer from '../Footer/Footer'
import Header from '../Header/Header'



 <div className="product-page">
      <Navbar />

      <div className="container mt-4">
        <h1 className="page-title">Product Management</h1>

        <div className="items-sec">
          <button className="btn btn-primary add-product-btn" onClick={toggleForm}>
            <i className="fas fa-plus me-2"></i> {editingProduct ? "Edit Product" : "Add Product"}
          </button>

          <div className={`slide-form ${showForm ? "show" : ""}`}>
            <div className="form-header">
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button className="btn-close" onClick={toggleForm}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Enter product price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  className="form-control"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-footer">
                <MDBBtn type="submit" color="primary">
                  {editingProduct ? "Update Product" : "Save Product"}
                </MDBBtn>
                <MDBBtn outline color="secondary" onClick={toggleForm}>
                  Cancel
                </MDBBtn>
              </div>
            </form>
          </div>

          <MDBTable responsive className="mt-5">
            <MDBTableHead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: "80px", height: "80px" }}
                      className="rounded"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button size="sm" className="me-2" onClick={() => handleEdit(product)}>
                      <MDBIcon fas icon="edit" className="me-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="btn btn-dark" onClick={() => handleDelete(product._id)}>
                      <MDBIcon fas icon="trash-alt" className="me-1" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>

      <Footer />
    </div>
 
<Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 4,
        }}
      >
        Product Preview
      </Typography>




      <Typography variant="h6" color="primary" sx={{ mt: 4, mb: 2 }}>
                Payment Method
              </Typography>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio />}
                      label={<><LocalAtmIcon /> Cash on Delivery</>}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    />
                    <FormControlLabel
                      value="Credit Card"
                      control={<Radio />}
                      label={<><CreditCardIcon /> Credit Card</>}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    />
                   <FormControlLabel
  value="PayPal"
  control={<Radio />}
  label={<><FaPaypal /> PayPal</>}
  sx={{ display: 'flex', alignItems: 'center' }}
/>


                  </RadioGroup>
                </FormControl>
              </Card>

              {paymentMethod === 'Credit Card' && (
                <Card sx={{ p: 3, mt: 2 }}>
                  <TextField
                    label="Card Number"
                    type="text"
                    value={creditCardDetails.cardNumber}
                    onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Expiration Date (MM/YY)"
                    type="text"
                    value={creditCardDetails.expirationDate}
                    onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expirationDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="CVV"
                    type="text"
                    value={creditCardDetails.cvv}
                    onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Card>
              )}
              <Typography variant="h5" color="primary" sx={{ mt: 4 }}>
                Total Price: ₹{totalPrice.toFixed(2)}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Place Order
                  </Button>
                )}
              </Box>