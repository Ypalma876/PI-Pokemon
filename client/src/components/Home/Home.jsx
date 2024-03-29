import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterPokemonsByTypes, filterByOrigin, orderByName, orderByStrength } from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paging from "../Paging/Paging.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import './home.css'

export default function Home () {

    const dispatch = useDispatch(); 
    const allPokemons = useSelector((state) => state.pokemons)
    const [order, setOrder] = useState('');
    const [currentPg, setCurrentPg] = useState(1);
    const [pokemonsXPg, setPokemonsXPg] = useState(12);
    const indexLastPokemon = currentPg * pokemonsXPg; // initially 12
    const indexFirstPokemon = indexLastPokemon - pokemonsXPg; // initially 0
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon)

    const paging = (pageNum) => {
        setCurrentPg(pageNum)
    }

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch])

    // 
    function handleClick (event) {
        event.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterTypes (event) {
        dispatch(filterPokemonsByTypes(event.target.value))
    }

    function handleFilterOrigin (event) {
        dispatch(filterByOrigin(event.target.value))
    }

    function handleSortName (event) {
        event.preventDefault();
        dispatch(orderByName(event.target.value))
        setCurrentPg(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    function handleSortStrength (event) {
        dispatch(orderByStrength(event.target.value))
    }

    if (!allPokemons.length) {
        return (
            <div className="loading">
                <img src="https://c.tenor.com/kodC8PAp4icAAAAi/pikachu-happy.gif" alt="Loading" />
                <h3>Loading...</h3>
            </div>
        )
    }
    else {
        return (
        <div className="home">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/87044f58-c765-43c5-bc51-8613e3ac7ab1/ddew4m7-c69a2c41-518f-48ca-ba35-8ab1895464e0.png" alt="Pokemon!" />

            <div className="search-bar">
                <button onClick={e => {handleClick(e)}}>
                    Show all pokemons
                </button>
                <SearchBar />
                <Link to='/pokemon'>
                <button>Create Pokemon</button>
                </Link>
            </div>
            
            <div className="filter-container">

                <div className="filter">
                    <select onChange={e => handleSortName(e)}>
                        <option defaultValue>Name</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                
                <div className="filter">
                    <select onChange={e => handleFilterTypes(e)}>
                        <option defaultValue>Types</option>
                        <option value="all">all types</option>
                        <option value="normal">normal</option>
                        <option value="fighting">fighting</option>
                        <option value="flying">flying</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="rock">rock</option>
                        <option value="bug">bug</option>
                        <option value="ghost">ghost</option>
                        <option value="steel">steel</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="grass">grass</option>
                        <option value="electric">electric</option>
                        <option value="psychic">psychic</option>
                        <option value="ice">ice</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="fairy">fairy</option>
                        <option value="shadow">shadow</option>
                        <option value="unknown">unknown</option>
                    </select>
                </div>
                
                <div className="filter">
                    <select onChange={e => handleSortStrength(e)}>
                        <option defaultValue>Attack</option>
                        <option value="high">Higher attack</option>
                        <option value="low">Lower attack</option>
                    </select>
                </div>
                
                <div className="filter">
                    <select onChange={e => handleFilterOrigin(e)}>
                        <option defaultValue>Origin</option>
                        <option value="all">All</option>
                        <option value="api">From API</option>
                        <option value="cre">Created</option>
                    </select>
                </div>      
            </div>

            <div className="card-container">
                    { // reviso si hay pokemones y luego con el map voy pasando las props que necesito para la Card por cada pokemon
                        currentPokemons?.length > 0 ?
                        currentPokemons?.map(e => {
                            return (
                                <Link to = {'/pokemon/'+e.id}  >
                                    <div>
                                        <Card name={e.name} image={e.image} types={e.types}/>
                                    </div>
                                </Link>
                            )})
                        : null                    
                    }
                </div>
            
            <div className="page">
                <Paging 
                    pokemonsXPg={pokemonsXPg}
                    allPokemons={allPokemons.length}
                    paging={paging}
                />
            </div>
    

        </div>
    )
    }
}