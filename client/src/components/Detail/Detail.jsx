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
    console.log(pokemon)

    return (
        <div className="detail-container">
            <Link to='/home'>
                <button>Home</button>
            </Link>
            {
                pokemon?.length > 0 ? 
                    <div className="detail">
                        <h1>{pokemon[0].name}</h1>
                        <p>#{pokemon[0].id}</p>
                        <img src={pokemon[0].image} alt= {pokemon[0].name} />
                        <div>
                            {pokemon[0].types?.map((e) => {
                                return ( <h3>{pokemon[0].createdInDB ? e.name : e}</h3> )
                            })}
                        </div>
                        <div className="stats">
                            <p>Hp: {pokemon[0].hp}</p>
                            <p>Attack: {pokemon[0].attack}</p>
                            <p>Defense: {pokemon[0].defense}</p>
                        </div>
                        <div className="stats">
                            <p>Speed: {pokemon[0].speed}</p>
                            <p>Height: {pokemon[0].height} cm</p>
                            <p>Weight: {pokemon[0].weight} g</p>
                        </div>
                    </div> 
                : <div><p>Loading...</p></div>
            }
        </div>
    )
}

export default Detail;