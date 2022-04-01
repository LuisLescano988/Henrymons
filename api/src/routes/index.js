const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemon = require('./pokemons');
const type = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemon);
router.use("/types", type);


module.exports = router;