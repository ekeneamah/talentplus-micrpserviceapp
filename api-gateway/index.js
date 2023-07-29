const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json());

const authMicroserviceURL = 'http://auth-service:3000';
const productCatalogMicroserviceURL = 'http://product-catalog:3000';
const cartMicroserviceURL = 'http://cart:3000';
const orderProcessingMicroserviceURL = 'http://order-processing:3000';

// Route for user authentication
app.post('/auth/register', async (req, res) => {
  try {
    const response = await axios.post(`${authMicroserviceURL}/register`, req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${authMicroserviceURL}/login`, req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

// Routes for product catalog
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${productCatalogMicroserviceURL}/products`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`${productCatalogMicroserviceURL}/products/${req.params.id}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

// Routes for cart
app.get('/cart/:userId', async (req, res) => {
  try {
    const response = await axios.get(`${cartMicroserviceURL}/cart/${req.params.userId}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.post('/cart/:userId/add', async (req, res) => {
  try {
    const response = await axios.post(`${cartMicroserviceURL}/cart/${req.params.userId}/add`, req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

// Routes for order processing
app.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(`${orderProcessingMicroserviceURL}/orders`, req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(4000, () => {
  console.log('API Gateway is running on http://localhost:4000');
});
