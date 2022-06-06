// Loads express
const express = require("express")
//import the dataBase
const getData = require("./models/pokemon");
//call getData
const pokemon = getData;
require('dotenv').config()
const mongoose = require('mongoose')
const PokemonModel = require('./Models/PokemonModel')

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
app.use(express.urlencoded({extended: false}))

//Setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!'); 
})

//  '/pokemon' route   
app.get("/pokemon", async (req, res) => {

    try {
      // fetch data from the db
      const pokemons = await PokemonModel.find();
  
      res.render("Index", {
        pageTitle: "Pokemon",
        pageHeader: "See All The Pokemon!",
        pokemonData: pokemons,
      });
    } catch (error) {
        console.log(error);
    }
  });        



app.get('/pokemon/new', (req, res) => {
    res.render("new", {
        pageTitle: "New Pokemon",
        pageHeader: "Create a new Pokemon"
    })
})

//* POST REQUEST HANDLER
app.post('/pokemon', async (req, res) => {
    const newPokemon = req.body // create a newPokemon variable
    // add a img property to the object
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}`
    
    console.log(newPokemon);

    //* Save the new pokemon to the db
    await PokemonModel.create(newPokemon, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.redirect('/pokemon')
        console.log(result);
    })

})
app.get("/pokemon/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const pokemon = await PokemonModel.findById(req.params.id)
        console.log('POKEMON FOUND!', pokemon);
  
      res.render("Show", {
          pageTitle: "Details",
          pageHeader: " Gotta Catch 'Em All ",
          pokemon: pokemon,
        });
  
    } catch (error) {
        console.log(error)
    }
  
    
  });



//* LISTENER
app.listen(PORT , () => {
    console.log(`Server is runninng on port: ${PORT}`);
});
mongoose.connect(process.env.MONGODB_URI) //CONNECTS TO MONGODB
console.log('MongoDB conected!')




// https://pokemondb.net/sprites
