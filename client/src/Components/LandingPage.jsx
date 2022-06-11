import React from 'react';
import { Link } from 'react-router-dom';
import landingImg from '../img/pokemon-Landing.jpg'

export default function landingPage () {
    return (
        <div className='landingPage'>
            <img src={landingImg} alt="" />
            <Link to="/pokemons">
                <button>START</button>
            </Link>
        </div>
    )
}