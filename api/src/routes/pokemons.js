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
            console.log(listPokemons)
        } else {
            // no utilizo el where porque todos los pokemones no están solo en la DB
            const pokemon = listPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (Object.keys(pokemon).length === 0) res.status(404).send('The entered pokemon does not exist')
            res.status(200).send(pokemon)
        }

    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pokemonByID = await getPokemonByID(id);
        res.status(200).send(pokemonByID)
    } catch (error) {
        res.status(404).send({ error: error.message });
    } 
})

router.post('/', async (req, res) => {
    const { 
        name, 
        life, 
        strenght, 
        defense, 
        speed, 
        height, 
        weight, 
        image,
        types } = req.body;

    if (!name) return res.status(404).send('Debe introducir un nombre');

    try {
        // creo el pokemon
        const pokemon = await Pokemon.create(
            name,
            life,
            strenght,
            defense,
            speed,
            height,
            weight,
            image
        );

        // busco el tipo en la DB
        let typeDB = await Type.findAll({
            where: {
                name: {
                    [Op.in]: types
                }    
            }
        })

        //agrego los tipos al pokemon creado
        await pokemon.addType(typeDB);

        res.status(201).send('Pokemon created successfully');
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

module.exports = router;