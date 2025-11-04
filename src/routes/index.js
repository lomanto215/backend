const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      documentation: '/api-docs',
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products'
    }
  });
});

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;
