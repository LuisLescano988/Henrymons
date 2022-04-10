import React from 'react';
import { Link } from 'react-router-dom';
import '../Card/index.css';

export default function Card({ image, name, types, id/*, weight*/ }) {
    return (
        <div className='card'>
            <div className='card_content'>
                <h5 className='title_name'>NAME</h5>
                <h2 className='name1'>{name}</h2>
                <h4 className='title_types'>TYPES</h4>                
                <h2 className='name1'>{types.map(t => t.name ? t.name + " " : t + " ")}</h2>
                <img className='card_image' src={image} alt='img not found' width="170px" height="180px" />
            <Link className='read_more' to={"/pokemons/" + id}>Read More</Link>
            </div>
        </div>
    );
};