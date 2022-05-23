import React from 'react';
import Button from './Button';
import Card from './Card'
import Form from './Form';
import "./main.css";
import Loader from "./Loader"
import useApifetch from '../hooks/useApifetch';

export default function Main() {
    let {
        handleGender, 
        handleSearch, 
        loadLess, 
        loadMore, 
        personaje, 
        nextPage, 
        backPage,
        loading
    } = useApifetch();
    
    return(
        <main className='main'>
            <Form handleSearch={handleSearch} handleGender={handleGender} />
            <section className='seccionCard'>
                {personaje.length === 0 
                    ? loading && <Loader /> 
                    : (personaje.map(el => 
                        <Card key={el.id} name={el.name} id={el.id} 
                            img={el.image} species={el.species} 
                            status={el.status} gender={el.gender} location={el.location}
                        />
                        
                    ))
                }
            </section>
            
            <Button loadLess={loadLess} loadMore={loadMore} backPage={backPage} nextPage={nextPage} />
        </main>
    )
}