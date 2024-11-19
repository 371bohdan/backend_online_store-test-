const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }, // URL малюнка в Supabase
    index: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('products', ProductSchema);