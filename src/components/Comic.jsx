import { Link } from 'react-router-dom';

export function Comic ({props}) {
    return (
        <li key={props.id} className='comic'>
            <Link to={`/comics/${props.id}`} className='comic-link'>
                <img src={`${props.thumbnail.path}.${props.thumbnail.extension}`} alt={props.title}/>
                <p>{props.title}</p>
            </Link>
        </li>
    )
}