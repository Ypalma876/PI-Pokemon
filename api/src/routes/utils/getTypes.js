const axios = require('axios');
const { Type } = require('../../db');

const getTypes = async () => {
    try {
        // traigo los tipos de la API
        const typesApi = await axios.get('https://pokeapi.co/api/v2/type')

        // guardo solo los nombres 
        let types = typesApi.data.results.map(e => e.name)

        // los busco en la base de datos y si no están, los creo
        types.forEach(e => {
            Type.findOrCreate({
                where: {name: e}
            })
        });

        const allTypes = await Type.findAll()
        return allTypes;
        
    } catch (error) {


        throw new Error(error)
    }
}

module.exports = getTypes;