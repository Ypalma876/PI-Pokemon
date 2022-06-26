import React from "react";

const Paging = ({ pokemonsXPg, allPokemons, paging }) => {
    const pageNums = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsXPg); i++) {
        pageNums.push(i)
    }

    return (
        <nav>
            <ul>
                {
                    pageNums && pageNums.map(num => {
                        <li key={num}>
                            <button onClick={() => paging(num)}>{num}</button>
                        </li>  
                    })
                }
            </ul>
        </nav>
    )
}

export default Paging;