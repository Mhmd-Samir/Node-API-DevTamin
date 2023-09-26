const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3002;
const Product = require("./models/productModels");
const User = require("./models/userModels")


app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send("Hello Node API");
})

app.get('/welcome', (req, res) => {
    res.send("Welcome to Node API");
})

app.get('/blog', (req, res) => {
    res.send("This our new blog page ");
})




// // 1. To Create a Data

// app.post('/product', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// })

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})


// // 2. To Create a Data

app.post()





// // To Find a Data

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})


// // To fetch data using ID

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})


// // To fetch data using Name - It has some errors

// app.get('/products/:name', async(req, res) => {
//     try {
//         const {name} = req.params;
//         const prod = await Product.findOne(name);
//         if (!prod) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(prod);
//     }
//     catch(error) {
//         console.log(error.message);
//         res.status(500).json({message : error.message});
//     }
// })


// // To Update a Product using ID

app.put('/products/:id', async(req, res) => {
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
})



// // To Find Data and delete using ID

app.delete('/products/:id', async(req, res) => {
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
})






// connect mongodb localhost
mongoose.connect("mongodb+srv://root:AdMin23145@cluster0.xezwnsg.mongodb.net/Node_API?retryWrites=true&w=majority")

.then(()=> {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
        console.log(`Node API is running on ${port}`);
    })
})
.catch(err=> console.log("Error :" +err));



