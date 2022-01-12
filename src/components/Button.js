import React from 'react';
import "./button.css"

export default function Button({loadLess, loadMore, backPage, nextPage}) {
    return(
        <div className='divButton'>  
            {
                backPage === ""
                ? <button onClick={loadLess} disabled={true} className='button disabled'>atras</button>
                : <button onClick={loadLess} className='button'>atras</button>
            }
            {
                nextPage === null
                ? <button onClick={loadMore} className='button disabled' disabled>siguiente</button>
                : <button onClick={loadMore} className='button'>siguiente</button>
            }
        </div>    
    )
}