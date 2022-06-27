import React from "react";
import { Link } from "react-router-dom";
import './landing.css'

export default function LP () {
    return (
        <div className='container'>
            <div>
                <Link to='/home'>
                    <button>START</button>
                </Link>
            </div>
        </div>
    )
}