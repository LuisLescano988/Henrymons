import React from 'react';
import { Link } from 'react-router-dom';
import '../Card/index.css';

export default function Card({ image, name, types, id }) {
    return (
        <div className='card'>
            <div className='card_content'>
                <h4 className='title_name'>NAME</h4>
                <h4 className='name1'>{name}</h4>
                <h4 className='title_type'>TYPES</h4>                
                <h4 className='name1'>{types.map(t => t.name ? t.name + " " : t + " ")}</h4>
                <img className='card_image' src={image} alt='img not found' width="131px" height="140px" />
            <Link className='read_more' to={"/pokemons/" + id}>Stats</Link>
            </div>
        </div>
    );
};