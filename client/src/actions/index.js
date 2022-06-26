import axios from 'axios';

export function getPokemons () {
    return async function(dispatch) {

        // traigo la info de pokemons del back
        let json = await axios.get('http://localhost:3001/pokemons')

        try {
            return dispatch({
                type: 'GET_POKEMONS',
                payload: json.data
            })
        } catch (error) {
             
        } 
    }
}

export function getNamePokemons (name) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch ({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTypes () {
    return async function (dispatch) {
        let json = axios.get('http://localhost:3001/types')

        return dispatch ({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function postPokemon (payload) {
    return async function (dispatch) {
        let json = axios.post('http://localhost:3001/pokemons', payload)
        return json;
    }
}

export function filterPokemonsByTypes (payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    } 
}

export function filterByOrigin (payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByStrength (payload) {
    return {
        type: 'ORDER_BY_STRENGTH',
        payload
    }
}