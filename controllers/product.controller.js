// product.controller.js
const Product = require("../models/product.model");

const addProduct = async (req, res) => {
    try {
        const { brandName, modelNo, description, price, category, stock } = req.body;

        // Validate input data (you might want to add more robust validation)
        if (!brandName || !description || !price || !category || !stock ||!modelNo) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Create a new product instance
        const newProduct = new Product({
            brandName,
            modelNo,
            description,
            price,
            category,
            stock,
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Successfully added product',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { brandName, modelNo, description, price, category, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                brandName,
                modelNo,
                description,
                price,
                category,
                stock,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully updated product',
            data: updatedProduct,
        });
    } catch (error) {
        console.error('Error updating product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully deleted product',
            data: deletedProduct,
        });
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
