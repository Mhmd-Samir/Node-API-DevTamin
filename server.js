const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config()

const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT || 3002;

const app = express();
const router = express.Router();

const productRoutes = require("./routers/ProductRouter")

const errorMiddleWare = require("./middlewares/errorMiddleware")


app.use(express.json());


// routes

app.use('/api', productRoutes);
app.use('/page', router);

app.get('/', (req, res) => {   //router is defined to set a url 
    // throw new Error("fake error");
    res.send("Hello Node API");
})

router.get('/welcome', (req, res) => {
    res.send("Welcome to Node API");
})

app.get('/blog', (req, res) => {
    res.send("This our new blog page ");
})


app.use(errorMiddleWare);



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


