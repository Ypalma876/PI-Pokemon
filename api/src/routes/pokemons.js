const { Router } = require('express');
const { allPokemons, getPokemonByID } = require('./utils/getPokemons.js');
const { Pokemon, Type } = require('../db.js');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;

    try {
        const listPokemons = await allPokemons();
        if (!name) {
            res.status(200).send(listPokemons);
            
        } else {
            // no utilizo el where porque todos los pokemones no están solo en la DB
            const pokemon = listPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (pokemon.name.length === 0) res.status(404).send('The entered pokemon does not exist');
            res.status(200).send(pokemon);
        }

    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const pokemonByID = await getPokemonByID(id);
    pokemonByID.length?
    res.status(200).send(pokemonByID) :
    res.status(404).send('Pokemon does not exist')
})

router.post('/', async (req, res) => {
    let {
        name,
        types,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createdInDB
       } = req.body
       
    try {
       let pokemonCreated = await Pokemon.create ({
           name,
           hp,
           attack,
           defense,
           speed,
           height,
           weight,
           image,
           createdInDB
       })
   
       let typesDB = await Type.findAll({  where: { name : types } })
       
       pokemonCreated.addType(typesDB)
       res.send('pokemon creado')
   
   
   } catch (error){
       res.status(400).json({ error: error})
   }
})

module.exports = router;