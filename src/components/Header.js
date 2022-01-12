import React from 'react';
import "./header.css";
import img from "../imagen/rick-and-morty-1.jpg"
export default function Header() {
    return(
        <header className='header'>
            <h1 className='titulo'>Rick and morty</h1>
            <img src={img} alt='Imagen de rick and morthy' className='imagenRick' />
        </header>
    )
}