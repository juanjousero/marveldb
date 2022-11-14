import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <Link to='/'>
                <img className='marvel-logo' 
                     src='/marvel-logo.svg'
                     alt='Marvel logo with the text Marvel Studios'/>
            </Link>
            <nav>
                <Link to='/' 
                      className='nav-link'>Home</Link>
                <Link to='/characters' 
                      className='nav-link'>Characters</Link>
                <Link to='/comics' 
                      className='nav-link'>Comics</Link>
            </nav>
            <Link to='/search'>
                <div className='search-div'>
                    <img src='/search.svg' 
                        className='search-logo'
                        alt='search logo with magnifying glass shape'/>
                </div>
            </Link>
        </header>
    )
}