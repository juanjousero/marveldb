import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { url, searchParams} from '../App';
import { comicsEndpoint } from './Comics';

import { Hero } from './Hero';
import { BackArrow } from './BackArrow';

export function ComicDetail () {
    const { id } = useParams();
    const [comic, setComic] = useState({});
    const [comicImage, setComicImage] = useState('');
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        const fetchingComic = async () => {
            const comicRaw = await fetch(`${url}${comicsEndpoint}/${id}${searchParams}`);
            const comicResponse = await comicRaw.json();

            setComic(comicResponse.data.results[0]);
            setComicImage(`${comicResponse.data.results[0].thumbnail.path}.${comicResponse.data.results[0].thumbnail.extension}`);
        }

        fetchingComic();
    }, []);

    useEffect(() => {
        const fetchingCharacters = async() => {
            const charactersListRaw = await fetch(`${comic.characters.collectionURI}${searchParams}`);
            const charactersList = await charactersListRaw.json();

            setCharacters(charactersList.data.results);
        }

        fetchingCharacters();
    }, [comic])

    return (
        <div className='comic-detail'>
            {comic.title === undefined
                ? <h1 className='loading'>Loading...</h1>
                : <>
                    <div className='comic-data'>
                        <h5>Marvel Comic</h5>
                        <h2>{comic.title}</h2>
                        {comic.pageCount === 0
                            ? <h3>Pages: Unknown</h3>
                            : <h3>Pages: {comic.pageCount}</h3>
                        }
                        {comic.upc === ''
                            ? <h3>UPC: Unknown</h3>
                            : <h3>UPC: {comic.upc}</h3>
                        }
                        <Link to='/comics'>
                            <BackArrow />
                        </Link>
                    </div>
                    <div className='comic-image'>
                        <img src={comicImage} alt={comic.title}/>
                    </div>
                    {characters[0] === undefined
                        ? <h1 className='loading loading-characters'>Loading characters...</h1>
                        : <div className='characters-comics-div'>
                            <ul>
                                {characters.map((character) => <Hero key={character.id}
                                                                     id={character.id}
                                                                     name={character.name}
                                                                     images={character.thumbnail}/>)}
                            </ul>
                        </div>
                    }
                  </>
            }

        </div>
    )
}