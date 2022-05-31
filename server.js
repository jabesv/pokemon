// Loads express
const express = require("express")
//import the dataBase
const getData = require("./models/pokemon");
//call getData
const pokemon = getData;

// create an instance of express
const app = express();
const PORT = 3000;

//Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!'); 
})

//  '/pokemon' route
app.get('/pokemon', (req, res) => {
    res.send(pokemon)
})





app.listen(PORT , () => {
    console.log(`Server is runninng on port: ${PORT}`);
});