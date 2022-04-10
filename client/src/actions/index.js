import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        });
    };
};


export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function getTypes() {
    return async function (distpach) {
        try {
            const allTypes = await axios.get("http://localhost:3001/types");
            return distpach({
                type: 'GET_TYPES',
                payload: allTypes.data
            })
        } catch (error) {
            return (error)
        }
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/pokemons', payload);
        return info;
    }
}

export function filterByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByStrength(payload) {
    return {
        type: "ORDER_BY_STRENGTH",
        payload,
    };
};

export function getPokemonName(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/pokemons?name=' + payload);
            return dispatch({
                type: 'GET_POKEMON_NAME',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
            return dispatch({
                type: 'GET_POKEMON_NAME',
                payload: []
            })
        }
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let pokemon = await axios.get('http://localhost:3001/pokemons/'+id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: pokemon.data[0]
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function cleanDetails() {
    return ({
        type: 'CLEAN_DETAILS',
        
    })
}

// export function showWeight () {
//     return ({
//         type: 'SHOW_WEIGHT',
//         payload: []
//     })
// }
