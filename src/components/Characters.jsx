import { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { BackButton, ForwardButton } from './OffsetButtons';
import { url, endpoint, searchParams } from '../App';

export function Characters () {
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(340);

    const previousOffset = () => {
        setOffset((prev) => prev - 20);
    }

    const nextOffset = () => {
        setOffset((prev) => prev + 20);
    }

    useEffect(() => {
        const fetched = async () => {
            const fetchedData = await fetch(`${url}${endpoint}${searchParams}&offset=${offset}&limit=100`);
            const response = await fetchedData.json();
            setCharacters(response.data.results);
        }

        fetched();
    }, [offset]);

    return (
        <div className="characters-div">
            { characters[0] === undefined
                ? <h1 className='loading-characters'>
                    <span className='loading-M'>M</span>
                    <span className='loading-A'>A</span>
                    <span className='loading-R'>R</span>
                    <span className='loading-V'>V</span>
                    <span className='loading-E'>E</span>
                    <span className='loading-L'>L</span>
                  </h1>
                : <>
                    <ul className="characters-list">
                        {characters.map((character) => 
                        <>
                            <Hero key={character.id}
                                id={character.id}
                                name={character.name}
                                description={character.description}
                                images={character.thumbnail}
                            />
                        </>
                        )}
                    </ul>
                    <div className='offset-buttons'>
                        <BackButton onClick={previousOffset}
                                    offset={offset}/>
                        <ForwardButton onClick={nextOffset}
                                    offset={offset}/>
                    </div>
                </>
            }
        </div>
    )
}