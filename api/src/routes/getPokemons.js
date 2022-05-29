const { Pokemon } = require('../db');


// get pokemons list from API

const getDataApi = async () => {
    try {
            const pokemons = [];
            for (let i = 1; i <= 40; i++) {
                      let pokeDataApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                      let pokemonApi = await pokeDataApi.json()
                  
                        pokemons.push({
                          img: pokemonApi.sprites.other.dream_world.front_default,
                          name: pokemonApi.name,
                          types: pokemonApi.types.map((t) => t.type.name),
                          id: pokemonApi.id,
                          hp: pokemonApi.stats[0].base_stat,
                          strenght: pokemonApi.stats[1].base_stat,
                          defense: pokemonApi.stats[2].base_stat,
                          speed: pokemonApi.stats[5].base_stat,
                          height: pokemonApi.height,
                          weight: pokemonApi.weight
                        }) 
                     
                  }
            //console.log(pokemons)
            return pokemons;
            
    } catch (error) {
        console.log(error)
    }
}

const getDataDB = async () => {
    try {
        const pokemonsDB = await Pokemon.findAll();
        const pokeData = pokemonsDB.json();

        const pokemons = pokeData.map( p => {
            return {
                id: pokeData.ID,
                name: pokeData.name,
                hp: pokeData.life,
                strenght: pokeData.strenght,
                defense: pokeData.defense,
                speed: pokeData.speed,
                height: pokeData.height,
                weight: pokeData.weight,
                img: pokeData.image
            }
        })
        
        //console.log('listo')

        return pokemons;      

    } catch (error) {
        console.log(error)
    }
}

const allPokemons = async () => {
    try {
        const pokemonsApi = await getDataApi();
    const pokemonsBD = await getDataDB();

    const totalPokemons = [...pokemonsApi, ...pokemonsBD];

    console.log('All pokemons together')

    return totalPokemons;
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getDataApi,
    getDataDB,
    allPokemons
}