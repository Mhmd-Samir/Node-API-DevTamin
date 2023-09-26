const Product = require("../models/productModels")
const User = require("../models/userModels")


const createProducts = async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
};

const createUsers = async(req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const readProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
};

const readUsers = async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
};

const readUsersById = async(req, res) => {
    try{
        const {id} = req.body;
        const users = await User.findById(id);

        if (!users) {
            return res.status(404).json({ message: 'User not match with the ID' });
        }

        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const readUsersByName = async (req, res) => {
    try {
        const { firstName } = req.body;
        const users = await User.find({firstName});

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with that first name' });
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProductById = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            return res.status(404).json({message : `Cannot find a Product Id of ${id}`})
        }
        res.status(200).json(product);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
};

const updateProductByName = async(req, res) => {
    try{
        const {id} = req.body;
        const user = await User.findByIdAndUpdate(id, req.body);

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message : `Cannot delete a Product with ID of ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};


module.exports = {
    createProducts,
    createUsers,
    readProducts,
    readUsers,
    readUsersById,
    readUsersByName,
    updateProductById,
    updateProductByName,
    deleteProduct
};