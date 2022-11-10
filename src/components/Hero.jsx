import { Link } from 'react-router-dom';

export function Hero ({id, name, images}) {

    return (
        <li className="character-card">
            <Link to={`/characters/${id}`}>
                { images.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' 
                    ? <img src='/marvel-comics.png' alt='marvel-comics logo'/>
                    : <img src={`${images.path}.${images.extension}`}
                           alt={name}/>
                }
                <h1>{name}</h1>
            </Link>
        </li>
    )
}