import React from "react";
import './paging.css'

const Paging = ({ pokemonsXPg, allPokemons, paging }) => {
    const pageNums = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsXPg); i++) {
        pageNums.push(i)
    }

    return (
        <nav className="paging">
            <ul>
                {
                    pageNums && pageNums.map(num => {
                        return (
                            <li key={num}>
                                <a onClick={() => paging(num)}>{num}</a>
                            </li>  
                        )  
                    })
                }
            </ul>
        </nav>
    )
}

export default Paging;