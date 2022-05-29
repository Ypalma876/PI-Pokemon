const { Router } = require('express');
const Pokemon = require('./pokemons.js');
//const Type = '';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(' /pokemons', Pokemon);
//router.use('/types', Type)


module.exports = router;
