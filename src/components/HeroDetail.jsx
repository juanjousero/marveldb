import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { url, endpoint, searchParams } from '../App';
import { Comic } from './Comic';
import { BackArrow } from './BackArrow';

export function HeroDetail () {
    const { id } = useParams();
    const [hero, setHero] = useState({});
    const [heroImagePath, setHeroImagePath] = useState('');
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchingHero = async () => {
            try {
                const fetchedCharacter = await fetch(`${url}${endpoint}/${id}${searchParams}`);
                const response = await fetchedCharacter.json();
                setHero(response.data.results[0]);
                setHeroImagePath(`${response.data.results[0].thumbnail.path}.${response.data.results[0].thumbnail.extension}`);
            } catch (err) {
                console.error(err)
            }
        }

        const fetchingComics = async () => {
            try {
                const fetchedComics = await fetch(`${url}${endpoint}/${id}/comics${searchParams}`);
                const response = await fetchedComics.json();
                setComics(response.data.results);
            } catch (err) {
                console.error(err);
            }
        }
        
        fetchingHero();
        fetchingComics();
    }, []);

    return (
        <div className="hero-detail">
            {hero.name === undefined 
                ? <h1 className='loading'>Loading...</h1>
                : <>
                    <div className='hero-data'>
                        <h5>Marvel Character</h5>
                        <h2>{hero.name.toUpperCase()}</h2>
                        {hero.description !== '' 
                            ? <h3>{hero.description}</h3>
                            : <h3>{hero.name} is a character from Marvel Universe who has appeared in the following comics</h3>}
                        <Link to='/characters'>
                            <BackArrow />
                        </Link>
                    </div>
                    <div className='hero-image'>
                        <img src={heroImagePath} loading="lazy"/>
                    </div>
                    <h1 className='name-rotated'>{hero.name}</h1>
                    {comics[0] === undefined
                        ? <h1 className='loading loading-comics'>Loading comics...</h1>
                        : <div className='comics-div'>
                            <ul>
                                {comics.map((comic) => <Comic props={comic}/>)}
                            </ul>
                          </div>
                    }
                  </>
            }
        </div>
    )
}