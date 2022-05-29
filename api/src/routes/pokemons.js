const { Router } = require('express');
const { allPokemons } = require('./getPokemons');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;

    try {
        const listPokemons = await allPokemons();
        if (!name) {
            res.status(200).json(listPokemons);
            console.log(listPokemons)
        } else {
            // no utilizo el where porque todos los pokemones no están solo en la DB
            const pokemon = listPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (Object.keys(pokemon).length === 0) res.status(404).send('The entered pokemon does not exist')
            res.status(200).json(pokemon)
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    
})