const { Type } = require('../../db');

const getTypesApi = async () => {
    try {
        const typesDB = await Type.findAll();

        if (!typesDB.lenght) {
            const typeDataApi = await fetch('https://pokeapi.co/api/v2/type')
            const typesApi = await typeDataApi.json()
            for (let i = 0; i < typesApi.results.lenght; i++) {
                await Type.create({name: typesApi.results[i].name});
            }
        } else {
            return typesDB.json()
        }
    } catch (error) {
        throw new Error(error)
    }
}
