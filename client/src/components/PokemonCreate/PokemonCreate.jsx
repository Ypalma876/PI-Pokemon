import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../actions/index";
import './Create.css'

const PokemonCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types);

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

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
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
                    <div className="labels">
                        <label>Attack:</label>
                        <input 
                            type="number"
                            value={input.attack}
                            name='attack'
                            onChange={(e) => handleChange(e)}
                        />
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
                    <div className="labels">
                        <label>Speed:</label>
                        <input 
                            type="number" 
                            value={input.speed}
                            name='speed'
                            onChange={(e) => handleChange(e)}
                        />
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
                    <div className="labels">
                        <label>Weight:</label>
                        <input 
                            type="number" 
                            value={input.weight}
                            name='weight'
                            onChange={(e) => handleChange(e)}
                        />
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
                    </div>
                    <button type="submit">Create Pokemon</button>
                </form>
            </div>

        </div>
    )
}

export default PokemonCreate;