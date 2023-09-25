const express = require("express");
const app = express();
const port = 3002;

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


app.listen(port, () => {
    console.log(`Node API is running on ${port}`);
})



