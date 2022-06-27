import React from "react";
import { Link, useParams } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import { useEffect } from "react";
import './detail.css'

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])

    const pokemon = useSelector((state) => state.detail)

    return (
        <div className="detail-container">
            <Link to='/home'>
                <button>Home</button>
            </Link>
            {
                pokemon?.length > 0 ? 
                    <div className="detail">
                        <h1>{pokemon.name}</h1>
                        <img src="{pokemon.image}" alt="img not found" />
                        <div>
                            {pokemon.types.map((e) => {
                                return ( <h3>{pokemon.createdInDB ? e.name : e}</h3> )
                            })}
                        </div>
                        <div className="stats">
                            <p>Hp: {pokemon.hp}</p>
                            <p>Attack: {pokemon.attack}</p>
                            <p>Defense: {pokemon.defense}</p>
                        </div>
                        <div className="stats">
                            <p>Speed: {pokemon.speed}</p>
                            <p>Height: {pokemon.height} cm</p>
                            <p>Weight: {pokemon.weight} g</p>
                        </div>
                    </div> 
                : <div><p>Loading...</p></div>
            }
        </div>
    )
}

export default Detail;