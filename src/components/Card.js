import React from 'react';
import "./card.css";

export default function Card({el}) {
    let {
        name, 
        image, 
        species, 
        status, 
        gender, 
        location
    } = el
    return(
        <div className='divCard'>
            {image=="" 
                ? "No tiene imagen" 
                : <img src={image} alt={"Imagen de " + name} className='imagenDelPersonaje' />
            }
            <section className='seccionSinImagen'>
                <div className='nombreYId'>
                    <p className='nombre'>{name}</p>
                </div>
                <div className='caracteristicas'>
                    <p className='pCarac'><span className='spanCarac'>Especie:</span> {species}</p>
                    <p className='pCarac'><span className='spanCarac'>Estatus:</span> {status}</p>
                    <p className='pCarac'><span className='spanCarac'>Genero:</span> {gender}</p>
                    <p className='pCarac'><span className='spanCarac'>Lugar:</span> {location.name}</p>
                </div>
            </section>
            
        </div>
    )
}