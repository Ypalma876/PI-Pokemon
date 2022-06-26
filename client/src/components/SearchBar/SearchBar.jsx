import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { getNamePokemons } from "../../actions";

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
            <input 
                type="text"
                placeholder="Search..." 
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onSubmit={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;