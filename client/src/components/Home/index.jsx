import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, filterBySource, orderByName, orderByStrength, getTypes, filterByTypes,/*, showWeight*/ 
cleanDetails} from "../../actions";
import Pagination from "../Pagination";
import Card from "../Card";
import SearchBar from "../SearchBar";
import loading from '../images/loading.gif'
import '../Home/index.css';


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [/*order*/, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    const poks = useSelector(state=>state.pokemons)

    useEffect(() => {
        dispatch(cleanDetails())
        
        !poks.length&&dispatch(getPokemons());
    }, [dispatch]);

    const types = useSelector((state) => state.types);
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterBySource(e) {
        dispatch(filterBySource(e.target.value))
    }

    function handleFilterByTypes(e) {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value));
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleOrderByStrength(e) {
        e.preventDefault();
        dispatch(orderByStrength(e.target.value));
        setCurrentPage(1);
        setOrder(`Oredenado ${e.target.value}`);
    }

    // function handleWeight(e) {
    //     // e.preventDefault();
    //     console.log('handleWeight')
    //     dispatch(showWeight(e))
    // }

    return (
        <div>
            <div className="top_nav">
                <h1 className="home_title">Poke App</h1>
            </div>

            <div className="top_nav">
                <Link className="link_create" to="/pokemons">Create a Pokemon Here</Link>
                <button className="btn_reload" onClick={(e) => { handleClick(e) }}>Reset Pokemons!</button>
                <SearchBar />

            </div>

            <div className="filters">
                <select onChange={e => handleOrderByName(e)} defaultValue='Order By Name'>
                    <option disabled>Order By Name</option>
                    <option value="asc">From A to Z</option>
                    <option value="desc">From Z to A</option>
                </select>

                <select onChange={e => handleOrderByStrength(e)} defaultValue='Order By Strength'>
                    <option disabled>Order By Strength</option>
                    <option value="lower-strength">Lower Strength</option>
                    <option value="higher-strength">Higher Strength</option>
                </select>

                <select onChange={(e) => handleFilterBySource(e)} defaultValue='Filter By Source'>
                    <option disabled>Filter By Source</option>
                    <option value="All">All</option>
                    <option value="Api">Api</option>
                    <option value="Created">Created</option>
                </select>

                <select onChange={(e) => handleFilterByTypes(e)} defaultValue='Filter By Type'>
                    <option disabled>Filter By Type</option>
                    <option value="All">All Types</option>
                    {types.map((types) => (
                        <option value={types.name} key={types.id}>
                            {types.name}
                        </option>
                    ))}
                </select>

                {/* <div>
                    <button onClick={(e) => handleWeight(e)}> Button </button>
                </div> */}
            </div>

            <Pagination
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
            />

            <div className="cards">
                {currentPokemons.length > 0 ? currentPokemons.map((p) => {
                    return (
                        <Card
                            image={p.image}
                            name={p.name}
                            hp={p.hp}
                            attack={p.attack}
                            defense={p.defense}
                            speed={p.speed}
                            height={p.height}
                            weight={p.weight}
                            types={p.types}
                            id={p.id}
                            key={p.id}
                        />
                    );
                }) : <div className="loading_container">
                    <img src={loading} className='loading' alt="loading please wait" />
                    <br />
                    <h1 className="loading_title">Loading...</h1>
                    <h4 className="please_reload">Wait till Pikachu loads the page!</h4>
                </div>
                }
            </div>
        </div>
    )
};
