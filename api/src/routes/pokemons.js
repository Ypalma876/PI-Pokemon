const { Router } = require('express');
const { allPokemons, getPokemonByID } = require('./utils/getPokemons.js');
const { Pokemon, Type } = require('../db.js');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {

    const name = req.query.name
    let pokemonsTotales = await allPokemons()
    if (name) {
        console.log(pokemonsTotales)
        let pokemonName =  await pokemonsTotales.filter(e => e.name.toLowerCase()===(name.toLowerCase()))
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send('This pokemon does not exist')
    } else {
        res.status(200).send(pokemonsTotales)
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
       res.send('pokemon created successfully')
   
   
   } catch (error){
       res.status(400).json({ error: error})
   }
})

module.exports = router;