const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: []
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: payload,
                allPokemons: payload
            };

        case 'GET_TYPES':
            return {
                ...state,
                types: payload
            };

        case 'FILTER_BY_SOURCE':
            const allPokemons = state.allPokemons;
            const filterSource = payload === 'Created'
                ? allPokemons.filter(el => el.createdInDb)
                : allPokemons.filter(el => !el.createdInDb)
            return {
                ...state,
                pokemons: payload === 'All'
                    ? state.allPokemons : filterSource
            };

        case 'FILTER_BY_TYPES':
            const filterTypes = state.allPokemons;
            const type = payload === "All"
                ? filterTypes.filter((pokemon) => pokemon.types.length > 0)
                : filterTypes.filter(
                    (pokemon) =>
                        pokemon.types &&
                        pokemon.types
                            .map((types) => types.name ? types.name : types)
                            .includes(payload)
                );
            return {
                ...state,
                pokemons: type
            };

        case 'ORDER_BY_NAME':
            let sortedArray = payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                pokemons: sortedArray
            };

        case "ORDER_BY_STRENGTH":
            let orderByStrength =
                payload === "higher-strength"
                    ? state.pokemons.sort((a, b) => {
                        return b.attack - a.attack;
                    })
                    : state.pokemons.sort((a, b) => {
                        return a.attack - b.attack;
                    });
            return {
                ...state,
                pokemons: orderByStrength,
            };

        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemons: payload
            };

        case 'GET_DETAILS':
            return {
                ...state,
                details: payload
            };        

        case 'RESET_DETAILS':
            return {
                ...state,
                details: []
            }

        default:
            return state;
    };
};

export default rootReducer;