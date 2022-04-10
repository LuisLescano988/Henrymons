import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing/index.css';


export default function Landing() {
    return (
        <div>
            <br />
            <h1 className='landing_title'>¡Look this Pokedex App!</h1>
            <div className='landing_btn'>CATCH'EM ALL</div>
            <Link to='/home'>
                <div className='container'>
                    <div className='ballContainer'>
                        
                    </div>
                </div>
            </Link>
            <h5 className='footer'>Hi i'm Luis student web developer From Henry! </h5>
        </div>
    );
};

