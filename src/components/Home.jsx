export function Home() {
    const pathArr = ['comic002', 'comic003',
    'comic004', 'comic005', 'comic006', 'comic007',
    'comic008', 'comic009', 'comic010', 'comic011',
    'comic012', 'comic013', 'comic014', 'comic015',
    'comic016', 'comic017', 'comic018', 'comic019',
    'comic020', 'comic021', 'comic022', 'comic023'];

    return (
        <div className='home-div'>
            {pathArr.map((image) => <img src={`${image}.png`} 
                                         className={`home-comic ${image}`}/>)}
        </div>
    )
}