import React from 'react';
import Button from './Button';
import Card from './Card'
import Form from './Form';
import "./main.css";
import Loader from "./Loader"
import useApifetch from '../hooks/useApifetch';

export default function Main() {
    let {
        loadLess, 
        loadMore, 
        personaje, 
        nextPage, 
        backPage,
        loading,
        handleSearch, 
        handleGender
    } = useApifetch();
    return(
        <main className='main'>
            <Form handleSearch={handleSearch} handleGender={handleGender}/>
            <section className='seccionCard'>
                {personaje.length === 0 
                    ? loading && <Loader /> 
                    : (personaje.map(el => 
                        <Card key={el.id} el={el}
                        />
                        
                    ))
                }
            </section>
            
            <Button loadLess={loadLess} loadMore={loadMore} backPage={backPage} nextPage={nextPage} />
        </main>
    )
}