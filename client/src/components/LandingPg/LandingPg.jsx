import React from "react";
import { Link } from "react-router-dom";
import './landing.css'

export default function LP () {
    return (
        <div className='container'>
            <div>
                <h2>Welcome</h2>
                <Link to='/home'>
                    <button>START</button>
                </Link>
            </div>
        </div>
    )
}