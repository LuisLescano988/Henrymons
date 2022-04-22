const router = require('express').Router();
const { Pokemon, Type } = require('../db');
const { getAllInfo } = require('../controllers/pokemons');
const axios = require('axios');


router.get("/", async (req, res, next) => {
    const name = req.query.name;
    try {
        const dataPokemons = await getAllInfo();
        if (name) {
            const namePokemon = dataPokemons.filter((e) =>
                e.name.toLowerCase() === name.toLowerCase()
            );
            namePokemon.length ? res.status(200).send(namePokemon) :
                res.status(404).send("Pokemon with this name not found");
        } else {
            const dataPokemons = await getAllInfo();
            res.status(200).json(dataPokemons);
        }
    } catch (err) {
        next(err);
    }
});

// const id = req.params.id;
// let pokeTotal = await getAllInfo();
// if (id) {
//     let pokeId = pokeTotal.filter(p => p.id == id)
//     pokeId.length ?
//         res.status(200).json(pokeId) :
//         res.status(404).send('Pokemon not found')
// }

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (id.length > 6) {
            let pokemonId = await Pokemon.findByPk(id, {
                include:Type,                
            })            
                if(pokemonId)return res.status(200).send([pokemonId]);
        } else {
            let findApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(function (...responses) {
                    let filteredId = responses.map((pokemon) => {
                        return {
                            name: pokemon.data.name,
                            types: pokemon.data.types.map((t) => t.type),
                            image: pokemon.data.sprites.front_default,
                            id: pokemon.data.id,
                            height: pokemon.data.height,
                            weight: pokemon.data.weight,
                            hp: pokemon.data.stats[0].base_stat,
                            attack: pokemon.data.stats[1].base_stat,
                            defense: pokemon.data.stats[2].base_stat,
                            speed: pokemon.data.stats[3].base_stat,
                        };
                    });

                    res.send(filteredId);
                });
        }
    } catch (error) {
        console.log(error);
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
        if (name) {
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

            newPokemon.addType(typesDb);

            res.status(200).send('¡Pokemon Created!')
        } else { res.status(400).send('Faltaron datos para crear el pokemon!') }
    } catch (e) {
        console.log(e)
    }

});

router.delete("/deleted/:id", (req, res) => {
    const { id } = req.params;
    try {
        Pokemon.findByPk(id).then((r) => r.destroy());
        res.send(200, "Pokemon eliminado con éxito");
    } catch (err) {
        res.send("entré al catch del get /deleted/:id", err);
    }
});


module.exports = router;