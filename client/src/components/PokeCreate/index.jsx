import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPokemon } from '../../actions';
import './index.css';


export default function CreatePokemon() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const existingPokemons = useSelector(state => state.pokemons)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [active, setActive] = useState(false)

    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: []
    });

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            types: input.types.includes(e.target.value)?
            [...input.types]:
            [...input.types, e.target.value]
        })
        setErrors(validate({
            ...input,
            types: [...input.types, e.target.value]
        }))
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(t => t !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name) {
            return alert("*Name is required ")
        }
        else if (typeof input.name !== 'string' || input.name.length < 2) {
            return alert('*Pokemon name is invalid')
        }
        else if (existingPokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
            return alert(`*Pokemon named -${input.name}- already exists`)
        }
        else if (!input.hp) {
            return alert("*HP is required")
        } else if (input.hp < 0 || input.hp > 255) {
            return alert("*HP can't be negative or greater than 255 points")
        }
        else if (!input.attack) {
            return alert("*Attack is required")
        } else if (input.attack < 0 || input.attack > 255) {
            return alert("*Attack can't be negative or greater than 255 points")
        }
        else if (!input.defense) {
            return alert("*Defense is required")
        } else if (input.defense < 0 || input.defense > 255) {
            return alert("*Defense can't be negative or greater than 255 points")
        }
        else if (!input.speed) {
            return alert("*Speed is required")
        } else if (input.speed < 0 || input.speed > 255) {
            return alert("*Speed can't be negative or greater than 255 points")
        }
        else if (!input.height) {
            return alert("*Height is required")
        } else if (input.height < 0 || input.height > 255) {
            return alert("*Height can't be negative or greater than 255 points")
        }
        else if (!input.weight) {
            return alert("*Weight is required")
        } else if (input.weight < 0 || input.weight > 255) {
            return alert("*Weight can't be negative or greater than 255 points")
        }
        dispatch(postPokemon(input));
        alert('¡Pokemon Created!')
        navigate('/home')
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            image: "",
            types: []
        })
    }

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "*Insert Name";
        }
        else if (typeof input.name !== 'string' ||
            input.name.length < 1 ||
            input.name.length > 15 ||
            input.name.includes("1") ||
            input.name.includes("2") ||
            input.name.includes("3") ||
            input.name.includes("4") ||
            input.name.includes("5") ||
            input.name.includes("6") ||
            input.name.includes("7") ||
            input.name.includes("8") ||
            input.name.includes("9") ||
            input.name.includes("0") ||
            input.name.includes(" ")) {
            errors.name = '*Write without numers or blank space';
        }
        else if (existingPokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
            errors.name = `*Pokemon named -${input.name}- already exists`;
        }
        else if (!input.hp) {
            errors.hp = "*Insert HP"
        } else if (input.hp < 0 || input.hp > 255) {
            errors.hp = "*Can't use negative or greater than 255 points"
        }
        else if (!input.attack) {
            errors.attack = "*Insert Attack"
        } else if (input.attack < 0 || input.attack > 255) {
            errors.attack = "*Can't use negative or greater than 255 points"
        }
        else if (!input.defense) {
            errors.defense = "*Insert Defense"
        } else if (input.defense < 0 || input.defense > 255) {
            errors.defense = "*Can't use negative or greater than 255 points"
        }
        else if (!input.speed) {
            errors.speed = "*Insert Speed"
        } else if (input.speed < 0 || input.speed > 255) {
            errors.speed = "*Can't use negative or greater than 255 points"
        }
        else if (!input.height) {
            errors.height = "*Insert Height"
        } else if (input.height < 0 || input.height > 255) {
            errors.height = "*Can't use negative or greater than 255 points"
        }
        else if (!input.weight) {
            errors.weight = "*Insert Weight"
        }
        else if (input.weight < 0 || input.weight > 255) {
            errors.weight = "*Can't use negative or greater than 255 points"
        }
        else if (!errors.name) {
            setActive(true)
        }

        return errors;

    };

    return (
        <div className='container_all'>
            <h1>Catch Your Own Pokemon!</h1>
            <Link to="/home" className='btn_home'>
                Back Home
            </Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={input.name} name='name' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.name && (
                                <p className='error'>{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>HP: </label>
                        <input type="number" value={input.hp} name='hp' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.hp && (
                                <p className='error'>{errors.hp}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Attack: </label>
                        <input type="number" value={input.attack} name='attack' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.attack && (
                                <p className='error'>{errors.attack}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Defense: </label>
                        <input type="number" value={input.defense} name='defense' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.defense && (
                                <p className='error'>{errors.defense}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Speed: </label>
                        <input type="number" value={input.speed} name='speed' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.speed && (
                                <p className='error'>{errors.speed}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Height: </label>
                        <input type="number" value={input.height} name='height' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.height && (
                                <p className='error'>{errors.height}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input type="number" value={input.weight} name='weight' onChange={(e) => handleChange(e)} className='input_form' />
                        {
                            errors.weight && (
                                <p className='error'>{errors.weight}</p>
                            )
                        }
                    </div>

                    <div className='type_container'>
                        <label>Types: </label>
                        <select name="types" onChange={(e) => handleSelect(e)}>
                            {
                                types.map((t) => (
                                    <option value={t.name} key={t.id}>{t.name}</option>
                                ))
                            }
                        </select>
                        
                        {input.types.map(t =>
                            <div className="list_types" key={t}>
                                <p className='type'>- {t}</p>
                                <button className='btn_x' value={t} onClick={() => handleDelete(t)}>x</button>
                            </div>
                        )}

                    </div>
                </div>
                <button type='submit' className='btn_create' disabled={!active}>Click here to catch Him/Her</button>
            </form>
        </div>
    )

}