const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config()

const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT || 3002;

const app = express();
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

app.post('/userCreate', async(req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})





// // 1.To Read or Find a Data

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


// // 2.To Read or Find a Data

app.get('/userRead', async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})




// // 1.To fetch data using ID - find using params (URL) type 

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


// // 2.To fetch data using ID - find using json format type

app.get('/userId', async(req, res) => {
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
})



// // 2.To find the data using First Name - in json format type

app.get('/userName', async (req, res) => {
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
});



// // 2.To find the data using First Name and ID - in json format type

app.get('/userFind', async (req, res) => {
    try {
        const {id, firstName} = req.body;
        const user = await User.findById(id).find({firstName});

        
        // const { firstName } = req.body;
        // const users = await User.find({firstName});

        if (!user) {
            return res.status(404).json({ message: 'User not match with the ID' });
        }

        res.status(200).json(user);
        // res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





// // 1.To Update a Product using ID

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


// // 2.To Update a Username using ID 

app.put('/userUpdateId', async(req, res) => {
    try{
        const {id} = req.body;
        const user = await User.findByIdAndUpdate(id, req.body);

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})




// // 1.To Find Data and delete using ID

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




mongoose.set("strictQuery", false);

// connect mongodb localhost
mongoose.connect(MONGOURL)

.then(()=> {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`Node API is running on ${PORT}`);
    })
})
.catch(err=> console.log("Error :" +err));



