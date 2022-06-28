import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../actions/index";
import './Create.css'


const PokemonCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pokemons = useSelector(state => state.pokemons);
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        types: [],
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        image: ''
    })

    const validate = (input) => {
        let errors = {}
        let search = pokemons.find(e => e.name.toLowerCase() === input.name.toLowerCase());
        let regexName = /^[A-Za-z]+$/
        let regexURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        
        if (search) errors.name = 'There is already a pokemon with that name'
        if (!input.name) errors.name = 'A name is required';
        if (!input.name.match(regexName)) errors.name = 'The name must be only letters'
        if (!input.types) errors.types = 'At least one type is required' 
        if (input.hp > 999 || input.hp < 1) errors.hp = 'Hp must be a value between 1 and 999'
        if (input.attack > 999 || input.attack < 1) errors.attack = 'Attack must be a value between 1 and 999'
        if (input.defense > 999 || input.defense < 1) errors.defense = 'Defense must be a value between 1 and 999'
        if (input.speed > 999 || input.speed < 1) errors.speed = 'Speed must be a value between 1 and 999'
        if (input.height > 20 || input.height < 0.1) errors.height = 'Height must be a value between 1 and 20'
        if (input.weight > 1000 || input.weight < 1) errors.weight = 'Weight must be a value between 1 and 1000'
        if (input.types.length === 2) errors.types = 'No more than two pokemons can be chosen'
        if (!input.image.match(regexURL)) errors.image = 'Please enter a valid image URL'
    
        return errors;
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemon(input))
        alert('Pokemon created')
        setInput({ // Para vaciar el input luego de guardado el pokemon
            name: '',
            types: [],
            hp: 1,
            attack: 1,
            defense: 1,
            speed: 1,
            height: 1,
            weight: 1,
            image: ''
        })
        navigate.push('/home') // me redirige al home luego de crear el pokemon
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            types: input.types.filter(t => t !== el)
        })
    }

    useEffect(() => {
        dispatch(getTypes)
    }, []);

    return (
        <div className="create-container">
            <Link to='/home'>
                <button className="home-button">Home</button>
            </Link>
            <h1>Create your pokemon!</h1>

            <div className="create-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="name-pokemon">
                        <label>Name: </label>
                        <input 
                            type= "text" 
                            value= {input.name}
                            name= 'name'
                            onChange={(e) => handleChange(e)}
                            required
                            minLength={1}
                            maxLength={15}
                        />                        
                    </div>
                    <div className="error">
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Hp:</label>
                        <input 
                            type="number"
                            value={input.hp}
                            name= 'hp'
                            onChange={(e) => handleChange(e)}
                        />                        
                    </div>
                    <div className="error">
                        {errors.hp && (
                            <p>{errors.hp}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Attack:</label>
                        <input 
                            type="number"
                            value={input.attack}
                            name='attack'
                            onChange={(e) => handleChange(e)}
                        />                      
                    </div>
                    <div className="error">
                        {errors.attack && (
                            <p>{errors.attack}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Defense:</label>
                        <input 
                            type="number"
                            value={input.defense}
                            name='defense' 
                            onChange={(e) => handleChange(e)}
                        />                      
                    </div>
                    <div className="error">
                        {errors.defense && (
                            <p>{errors.defense}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Speed:</label>
                        <input 
                            type="number" 
                            value={input.speed}
                            name='speed'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="error">
                        {errors.speed && (
                            <p>{errors.speed}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Height:</label>
                        <input 
                            type="number" 
                            value={input.height}
                            name='height'
                            onChange={(e) => handleChange(e)}
                        />
                        
                    </div> 
                    <div className="error">
                        {errors.height && (
                            <p>{errors.height}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Weight:</label>
                        <input 
                            type="number" 
                            value={input.weight}
                            name='weight'
                            onChange={(e) => handleChange(e)}
                        />
                    </div> 
                    <div className="error">
                        {errors.weight && (
                            <p>{errors.weight}</p>
                        )}
                    </div>

                    <div className="labels">
                        <label>Image:</label>
                        <input 
                            type="text" 
                            value={input.image}
                            name='image'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="error">
                        {errors.image && (
                            <p>{errors.image}</p>
                        )}
                    </div>

                    <div className="labels">
                        <select onChange={(e) => handleSelect(e)}>
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
                        {errors.types && (
                            <p>{errors.types}</p>
                        )}
                    </div>
                    <div>
                        {input.types.map(el => {
                        <div>
                            <p>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                        </div>
                    })}
                    </div>

                    <div className="submit-button">
                        { Object.keys(errors).length === 0 ? 
                            <button type="submit">Create Pokemon</button> :
                            <button type="submit" disabled>Create Pokemon</button>
                        }
                    </div>
                    
                    
                    
                </form>
            </div>

        </div>
    )
}

export default PokemonCreate;