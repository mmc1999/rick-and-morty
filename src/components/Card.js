import React from 'react';
import "./card.css";

export default function Card({name, id, img, species, status, gender, location}) {
    return(
        <div className='divCard'>
            <section className='nombreYId'>
                <p className='nombre'>{name}</p>
                <p className='id'>Id: {id}</p>
            </section>
            <section className='seccionImagen'>
                {img=="" 
                    ? "No tiene imagen" 
                    : <img src={img} alt={"Imagen de " + name} className='imagenDelPersonaje' />
                }
            </section>
            <section className='caracteristicas'>
                <p className='pCarac'><span className='spanCarac'>Especie:</span> {species}</p>
                <p className='pCarac'><span className='spanCarac'>Estatus:</span> {status}</p>
                <p className='pCarac'><span className='spanCarac'>Genero:</span> {gender}</p>
                <p className='pCarac'><span className='spanCarac'>Lugar:</span> {location.name}</p>
            </section>
        </div>
    )
}