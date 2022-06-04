const { Type } = require("../db.js");

/////////////////////GET TYPES ///////////////////////////////////

const getTypes = async (req, res) => {
  const typesDB = await Type.findAll();

    if(typesDB.length === 0) {
        try {
            const typesApi = await fetch('https://pokeapi.co/api/v2/type')
            const types = await typesApi.json()
            for(let i=0; i<types.data.results.length; i++){
                await Type.create({name: types.data.results[i].name});
            }
         } catch(error) {
           return res.status(404).send('Ha ocurrido un error')
         }
        } else {
            return res.status(200).json(typesDB);
        }
}
module.exports = getTypes;