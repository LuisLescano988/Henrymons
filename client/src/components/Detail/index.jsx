import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, /*cleanDetails*/ } from '../../actions';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import './index.css'

export default function Detail (props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const pokesito = useSelector(state=>state.details);    

    useEffect(() => {
        dispatch(getDetails(id))
    }, [id, dispatch]);    

    // function cleanSubmit (e) {
    //     e.preventDefault();
    //     dispatch(cleanDetails())
    //     navigate('/home')
    // }

    return (
        <div>
            {
                Object.keys(pokesito).length?
                <div className='details_container'>                   
                    <div className='left_details'>
                        <h1 className='name1'>NAME <br /> {pokesito.name.toUpperCase()}</h1>
                        <img src={pokesito.image} alt="pokemon" width='304px' height='360px' />
                    </div>
                        <div className="right_details">
                        <h4>TYPES: {pokesito.types.map(t => t.name?t.name + " ":t + ' ')}</h4>
                        <h4>HP: {pokesito.hp}</h4>
                        <h4>ATTACK: {pokesito.attack}</h4>
                        <h4>DEFENSE: {pokesito.defense}</h4>
                        <h4>SPEED: {pokesito.speed}</h4>
                        <h4>HEIGHT: {pokesito.height}</h4>
                        <h4>WEIGHT: {pokesito.weight}</h4>
                        <h3 className='id1'>ID <br /> {pokesito.id}</h3>
                    </div>
                    <div className="btn">
                        <Link to = '/home'>
                            <button /*onClick={(e) => cleanSubmit(e)}*/ className='btn_home'>Return to Home</button>    
                        </Link>
                    </div>
                </div>
                :
                <div className="loading_container">
                        <h1 className="loading_title">Loading...</h1>
                        <h4 className="please_w">Please wait</h4>
                </div>
            }
            
        </div>
    )
}