import React from "react";

const Card = ({ image, name, types }) => {
    return (
        <div>
            <img src={image} alt="not found" />
            <h3>{name}</h3>
            <div>{types.map(e => <h4>{e}</h4>)}
            </div>
        </div>
    )
}

export default Card;