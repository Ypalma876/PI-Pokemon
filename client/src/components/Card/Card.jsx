import React from "react";
import './Card.css'

const Card = ({ image, name, types }) => {
    return (
        <div className="card-container">
            <div className="card">
                <h1>{name}</h1>
                <div className="types">{types?.map(e => <h3>{e}</h3>)}</div>
                <img src={image} alt="not found" />
            </div>
            
        </div>
    )
}

export default Card;