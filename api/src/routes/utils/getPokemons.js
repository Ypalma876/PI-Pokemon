const { Pokemon, Type } = require('../../db');
const axios = require('axios')

// get pokemons list from API

const getDataApi = async () => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
    const apiInfo = await apiUrl.data.results
    let pokemons = await Promise.all (

     apiInfo.map(async (e) => {
            if (e.url) {
                const pokemonInfo = await axios.get(`${e.url}`)
                const pokemon = await pokemonInfo.data
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types.map(e => e.type.name),
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    image: pokemon.sprites.other.dream_world.front_default
                }  
            }
        })
    )    
    return pokemons
}

//Get pokemons in DB
const getDataDB = async () => {
    try {
        const pokemonsDB = await Pokemon.findAll( {
            include: {
                model: Type,
                attributes: [ 'name' ],
                through: {
                    attributes: []
                }
            }
        });
        const pokemons = pokemonsDB;
        
        //console.log('listo')

        return pokemons;      

    } catch (error) {
        throw new Error(error)
    }
}

// Join pokemons in DB and API
const allPokemons = async () => {
    try {
        const pokemonsApi = await getDataApi();
        const pokemonsBD = await getDataDB();

        const totalPokemons = pokemonsApi.concat(pokemonsBD);

        console.log('All pokemons together')

        return totalPokemons;
    } catch (error) {
        throw new Error(error)
    }
    
}

// Search pokemon by ID
const getPokemonByID = async (id) => {
    try {
        const pokemonList = await allPokemons();

        if (id) {
            const pokemonByID = pokemonList.filter(p => p.id === id);
            return pokemonByID;
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getDataApi,
    getDataDB,
    allPokemons,
    getPokemonByID
}