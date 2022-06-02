// Loads express
const express = require("express")
//import the dataBase
const getData = require("./models/pokemon");
//call getData
const pokemon = getData;

// create an instance of express
const app = express();
const PORT = 3000;
//Middleware functions
//they update the request as soon as they come in
app.use((req, res, next) => {
    console.log(`Running middleware function!`)
    next(); //got to the next middleware or the response
})

//JSON Middleware
app.use(express.json())
//if we don't need to read data from the url.
app.use(express.urlencoded({extend: false}))

//Setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!'); 
})

//  '/pokemon' route   
app.get("/pokemon", (req, res) => {
    res.render("index", { data: pokemon, pageTitle: "Pokemon Page" })
})





app.listen(PORT , () => {
    console.log(`Server is runninng on port: ${PORT}`);
});




// https://pokemondb.net/sprites
