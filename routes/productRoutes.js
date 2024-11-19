const express = require('express');
const multer = require('multer'); // Для обробки завантаження файлів
const productController = require('../controllers/productController');

const router = express.Router();
const upload = multer(); // Ініціалізація Multer без збереження файлів на диску

// POST-запит для створення товару
router.post('/api/products', upload.single('image'), productController.createProduct);

module.exports = router;