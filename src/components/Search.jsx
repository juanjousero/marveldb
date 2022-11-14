import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { url, endpoint, searchParams } from '../App';
import { comicsEndpoint } from './Comics';

export function Search () {
    const [submitted, setSubmitted] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [isCharacter, setIsCharacter] = useState(false);

    const handleSearch = () => {
        const radioInput = Array.from(document.getElementsByName('input-radio'));
        const droplistInput = document.getElementById('select-list').value;
        const textInput = document.getElementById('text').value;

        // Comprobamos si el filtro elegido es el de comics o el de personajes
        radioInput.map((element) => {
            if (element.checked) {
                if (element.value === 'characters') {
                    setIsCharacter(true);
                } else {
                    setIsCharacter(false);
                }
            }
        })

        // Comprobamos si se ha elegido del desplegable la opción de id o de name
        if (droplistInput === 'id') {
            setId(textInput);
            setSubmitted(true);
        } else if (droplistInput === 'name') {
            setName(textInput);
        }

        // Reseteamos el valor para poder volver a entrar a la página de búsqueda
        setInterval(() => setSubmitted(false), 3000);
    }

    useEffect(() => {
        const fetchingId = async () => {
            if (name !== '') {
                if (isCharacter) {
                    const dataFetched = await fetch(`${url}${endpoint}${searchParams}&name=${name}`);
                    const characterFetched = await dataFetched.json();
                    const id = characterFetched.data.results[0].id;
                    setId(id);
                } else {
                    const dataFetchedRaw = await fetch(`${url}${comicsEndpoint}${searchParams}&title=${name}`);
                    const comicFetched = await dataFetchedRaw.json();
                    const id = comicFetched.data.results[0].id;
                    setId(id);
                }
            } else return

            setSubmitted(true);
        }

        fetchingId();
    }, [name]);


    return (
        <div className='search-page'>
            {!submitted
                ?   <>  
                        <div className='search-hero'></div>
                        <div className='search-div'>
                            <div className='radio-form' id='radio-form' required>
                                <label for='comics-radio'>Comics
                                    <input type='radio' id='comics-radio' name='input-radio' value='comics'/>
                                </label>
                                <label for='characters-radio'>Characters
                                    <input type='radio' id='characters-radio' name='input-radio' value='characters'/>
                                </label>
                            </div>
                            <div className='right-arrow'></div>
                            <div className='datalist-div'>
                                <div className='datalist-form'>
                                    <select id='select-list' name='select-list'>
                                        <option value=''> Select a filter </option>
                                        <option value='id'>ID</option>
                                        <option value='name'>Name/Title</option>
                                    </select>
                                </div>
                            </div>
                            <div className='right-arrow'></div>
                            <input type='text' placeholder='Type here the name or the ID' id='text' required></input>
                            <div className='right-arrow'></div>
                            <button onClick={handleSearch} className='searchButton'>Let's go!</button>
                        </div>            
                    </>
                : isCharacter
                    ? <Navigate to={`/characters/${id}`} />
                    : <Navigate to={`/comics/${id}`} />
            }
        </div>
    )
}