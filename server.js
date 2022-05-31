// Loads express
const express = require("express")

// create an instance of express
const app = express();
const PORT = 3000;

//Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!'); 
})








app.listen(PORT , () => {
    console.log(`Server is runninng on port: ${PORT}`);
});