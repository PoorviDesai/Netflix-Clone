const express = require('express');
const path = require('path');

//store our "public" folder path in intial_path variable
let initial_path = path.join(__dirname, "public");

let app = express();
//use "express.static()" method to make "public" folder a static path
app.use(express.static(initial_path));

//get method to setup home route
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})
//this will serve HTML files for routes like "/abc", "/123"
//but not for "abc/ab"
app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})
//this will send 404 message if route is invalid
app.use((req, res) => {
    res.json("404");
})
app.listen(3000, () => {
    console.log("Listening on port 3000....");
})

