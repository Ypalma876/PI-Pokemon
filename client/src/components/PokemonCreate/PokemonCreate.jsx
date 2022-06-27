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
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: ''
    })

    const validate = (input) => {
        let errors = {}
        let search = pokemons.find(e => e.name.toLowerCase() === input.name.toLowerCase());
        
        if (search) errors.name = 'There is already a pokemon with that name'
        if (!input.name) errors.name = 'A name is required';
        if (!input.types) errors.types = 'At least one type is required' 
        if (input.hp > 255 || input.hp < 1) errors.hp = 'Hp must be a value between 1 and 255'
        if (input.attack > 190 || input.attack < 1) errors.attack = 'Attack must be a value between 1 and 190'
        if (input.defense > 255 || input.defense < 1) errors.defense = 'Defense must be a value between 1 and 255'
        if (input.speed > 255 || input.speed < 1) errors.speed = 'Speed must be a value between 1 and 255'
        if (input.height > 20 || input.height < 0.1) errors.height = 'Height must be a value between 1 and 255'
        if (input.weight > 1000 || input.weight < 1) errors.weight = 'Weight must be a value between 1 and 1000'
        if (input.types.length === 2) errors.types = 'No more than two pokemons can be chosen'
    
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
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
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
                        />
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
                    <div className="labels">
                        <select onChange={(e) => handleSelect(e)}>
                            {types.map((type) => {
                                <option value={type.name}>{type.name}</option>
                            })}
                        </select>
                        {errors.types && (
                            <p>{errors.types}</p>
                        )}
                    </div>
                    {input.types.map(el => {
                        <div>
                            <p>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                        </div>
                    })}
                    <button type="submit">Create Pokemon</button>
                </form>
            </div>

        </div>
    )
}

export default PokemonCreate;