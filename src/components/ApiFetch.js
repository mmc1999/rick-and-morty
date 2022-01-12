import React, { useEffect, useState } from 'react';
import Button from './Button';
import Card from './Card'
import Form from './Form';
import "./apiFetch.css";
import Loader from "./Loader"

export default function ApiFetch() {
    const [nextPage, setNextPage] = useState("");
    const [backPage, setBackPage] = useState("");
    const [personaje, setPersonaje] = useState([]);
    const [url, setUrl] = useState("https://rickandmortyapi.com/api/character?page=1");

    useEffect(() => {
        const getData = async (link) => {
            try {
                /*dejo el setPersonaje vacio para que al cargar la siguiente pagina 
                  arranque la pagina vacia y cargue los datos*/ 
                setPersonaje([])
                let traer = await fetch(link);
                let data = await traer.json();
                //console.log(data.info.next);
                setNextPage(data.info.next);
                setBackPage(data.info.prev || "");
                data.results.forEach(json => {
                    let personajes = {
                        id:json.id,
                        name:json.name,
                        image:json.image,
                        species:json.species,
                        status:json.status,
                        gender:json.gender,
                        location:json.location,
                    }
                    setPersonaje(personaje=>[...personaje, personajes]);
                   
                });
                
            } catch (error) {
                console.log(error)
            } 
        }
        getData(url);
    }, [url])


    const loadMore = () => {
        setUrl(nextPage)
    }
    const loadLess = () => {
        setUrl(backPage);
    }

    const handleSearch = (data) => {
        if(data === "") return
        
        
        //esto lo hago para en la api pasarle el nombre con espacios
        let nombrePersonaje = new URLSearchParams(data).toString();
        nombrePersonaje = nombrePersonaje.slice(0, nombrePersonaje.length - 1);

        let urlOriginal=`https://rickandmortyapi.com/api/character?name=${nombrePersonaje}`;
        setUrl(urlOriginal);
    }
    const handleGender = (data) => {
        if(data === "") return
        if(data == "male" || data == "female" || data == "genderless" || data == "unknown") {
            setUrl(`https://rickandmortyapi.com/api/character/?gender=${data}`)
        }
    }
    return(
        <>
            <Form handleSearch={handleSearch} handleGender={handleGender} />
            <section className='seccionCard'>
                {personaje.length === 0 
                    ? (<Loader />) 
                    : (personaje.map(el => 
                        <Card key={el.id} name={el.name} id={el.id} 
                            img={el.image} species={el.species} 
                            status={el.status} gender={el.gender} location={el.location}
                        />
                        
                    ))
                }
            </section>
            
            <Button loadLess={loadLess} loadMore={loadMore} backPage={backPage} nextPage={nextPage} />
        </>
    )
}