import { useState, useEffect } from 'react';
import { url, searchParams } from '../App';

import { Comic } from './Comic';
import { BackButton, ForwardButton } from './OffsetButtons';

export const comicsEndpoint = 'v1/public/comics';

export function Comics () {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);

    const previousOffset = () => {
        setOffset((prev) => prev - 20);
    }

    const nextOffset = () => {
        setOffset((prev) => prev + 20);
    }

    useEffect(() => {
        const fetchingComics = async () => {
            const response = await fetch(`${url}${comicsEndpoint}${searchParams}&offset=${offset}&limit=100`);
            const comics = await response.json();
            setComics(comics.data.results);
        }

        fetchingComics();
    }, [offset]);

    return (
        <>
            <div className='comics-list-div'>
                {comics[0] === undefined
                    ? <h1 className='loading loading-comics'>Loading comics...</h1>
                    : <>
                        <ul className='comics-list'>
                            {comics.map((comic) => <Comic props={comic}
                                                        key={comic.id}/>)}
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
        </>
    )
}