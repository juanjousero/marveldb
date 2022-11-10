export function BackButton({onClick, offset}) {
    return (
        <div className='button-div'>
            {offset === 0
                ? <button disabled className='change-page-button previous-button disabled'></button>
                : <button onClick={onClick} className='change-page-button previous-button'></button>
            }
        </div>
    )
}

export function ForwardButton({onClick, offset}) {
    return (
        <div className='button-div'>
        {offset === 2000 
            ? <button disabled className='change-page-button previous-button disabled'></button> 
            : <button onClick={onClick} className='change-page-button next-button'></button>
        }
    </div>
    )
}