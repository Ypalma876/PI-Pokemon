import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions/index";
import './SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNamePokemons(name))
        setName('')
    }

    return (
        <div>
            <input className="input"
                type="text"
                placeholder="Search a pokemon..." 
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onSubmit={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;