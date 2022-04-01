const router = require('express').Router();
const { Pokemon, Type } = require('../db');
const { getAllInfo } = require('../controllers/pokemons');
const axios = require('axios');


router.get("/", async (req, res, next) => {
    const name = req.query.name;
    try {
        const dataPokemons = await getAllInfo();
        //console.log('dataApi 1', dataPokemons);
        if (name) {
            const namePokemon = dataPokemons.filter((e) =>
                e.name.toLowerCase().includes(name.toLowerCase())
            );
            //console.log(namePokemon);
            namePokemon.length ? res.status(200).send(namePokemon) :
                res.status(404).send("Pokemon with this name not found");
        } else {

            const dataPokemons = await getAllInfo();
            //console.log('dataApi 2',dataPokemons)
            res.status(200).json(dataPokemons);
        }
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let pokeTotal = await getAllInfo();
        if (id) {
            let pokeId = pokeTotal.filter(p => p.id == id)
            pokeId.length ?
                res.status(200).json(pokeId) :
                res.status(404).send('Pokemon not found')
        }
    }
    catch (e) {
        console.log(e)
    }
});

router.post('/', async (req, res) => {
    try {
        const { name,
            attack,
            defense,
            speed,
            height,
            weight,
            hp,
            img,
            types }
            = req.body
        let newPokemon = await Pokemon.create({
            name,
            attack,
            defense,
            speed,
            height,
            weight,
            hp,
            img
        })
        let typesDb = await Type.findAll({
            where: { name: types }
        });

        newPokemon.addType(typesDb); // metodo sequelize

        res.status(200).send('¡Pokemon Created!')
    } catch (e) {
        console.log(e)
    }

});


module.exports = router;