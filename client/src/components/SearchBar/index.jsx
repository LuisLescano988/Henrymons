import React from 'react';
import { useState } from 'react';
//import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../actions';
import '../SearchBar/index.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange (e) {
        e.preventDefault();
        setName('')
        setName(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (name.length > 0) {
            dispatch(getPokemonName(name));
            setName('');
            document.getElementById("search").value = ""
        }else{
            alert('¡Write a Pokemon!')
        }          
    }  


    return (
        <div className="search_bar">
            <input id='search' type="text" placeholder='Find a Pokemon...' onChange={(e) => handleInputChange(e)}/>
            <button className='btn_search' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}