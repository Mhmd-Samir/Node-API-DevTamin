const express = require("express");
const router = express.Router();

const Product = require("../models/productModels");
const User = require("../models/userModels")

const {createProducts, createUsers, readProducts,
       readUsers, readUsersById, readUsersByName,
       updateProductById, updateProductByName, deleteProduct} = require("../controllers/productController")

// // 1. To Create a Data

// router.post('/product', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// })

router.post('/productCreate', createProducts)


// // 2. To Create a Data

router.post('/userCreate', createUsers)





// // 1.To Read or Find a Data

router.get('/productRead', readProducts)


// // 2.To Read or Find a Data

router.get('/userRead', readUsers)




// // 1.To fetch data using ID - find using params (URL) type 

// router.get('/products/:id', async(req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);
//     }
//     catch(error) {
//         console.log(error.message);
//         res.status(500).json({message : error.message});
//     }
// })


// // 2.To fetch data using ID - find using json format type

router.get('/userId', readUsersById)



// // 2.To find the data using First Name - in json format type

router.get('/userName', readUsersByName);




// // 1.To Update a Product using ID

router.put('/products/:id', updateProductById)


// // 2.To Update a Username using ID 

router.put('/userUpdateId', updateProductByName)




// // 1.To Find Data and delete using ID

router.delete('/products/:id', deleteProduct)

module.exports = router;