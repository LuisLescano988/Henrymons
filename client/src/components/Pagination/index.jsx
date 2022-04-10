import React from 'react';
import '../Pagination/index.css';

export default function Pagination ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i);
    };

    return(
            <nav>
                <ul className="paginado">
                    { pageNumber && 
                    pageNumber.map(number => (
                        <li className="li" key={number}>
                            <button className='paginas' onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
    );
};