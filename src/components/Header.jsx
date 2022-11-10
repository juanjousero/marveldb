import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <img className='marvel-logo' 
                src='/marvel-logo.svg'
                alt='Marvel logo with the text Marvel Studios'/>
            <nav>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/characters' className='nav-link'>Characters</Link>
                <Link to='/comics' className='nav-link'>Comics</Link>
                <Link to='/about' className='nav-link'>About</Link>
            </nav>
            <div className='search-div'>
                <img src='/search.svg' 
                     className='search-logo'
                     alt='search logo with magnifying glass shape'/>
                <img src='/dashboard.svg'
                     className='dashboard-logo'
                     alt='dashboard logo, four squares with different shapes'/>
                <img src='/user.svg'
                     className='user-logo'
                     alt='user-logo'/>
            </div>
        </header>
    )
}