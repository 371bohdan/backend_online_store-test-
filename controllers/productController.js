const Product = require('../models/product');
const supabase = require('@supabase/supabase-js');
require('dotenv').config();

// Ініціалізація Supabase
const supabaseClient = supabase.createClient(process.env.SUPABASE_URL, 
    process.env.SUPABASE_KEY);

// Створення нового товару
exports.createProduct = async (req, res) => {
    try {
        const { index, description, price } = req.body;
        const file = req.file; // Малюнок з req.file (через multer)

        // Завантаження малюнка до Supabase
        const { data, error } = await supabaseClient.storage
            .from('product-images') // Назва bucket у Supabase
            .upload(`products/${file.originalname}`, file.buffer, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        const imageUrl = `${supabaseClient.storage.from('product-images').getPublicUrl(data.path).data.publicUrl}`;

        const newProduct = new Product({
            imageUrl,
            index,
            description,
            price,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Отримання всіх товарів
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
