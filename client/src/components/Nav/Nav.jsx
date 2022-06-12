import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './Nav.css';

export default function Nav () {
    return (
        <div>
            <nav>
                <div>
                    <Link to={'/pokemons'}>
                        <li className="home">Home</li>
                    </Link>
                    <Link to={'/create'}>
                        <li className="create">Create your Pokemon!</li>
                    </Link> 
                </div>
                <div>
                    <SearchBar />
                </div>
            </nav>
        </div>
    )
}