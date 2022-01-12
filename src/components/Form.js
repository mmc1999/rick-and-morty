import React, {useState} from 'react';
import "./form.css";

const initialForm = {
    personaje:""
}

export default function Form({handleSearch, handleGender}) {
    const [form, setForm] = useState(initialForm);
    const [genero, setGenero] = useState("");
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleGender(genero);
        handleSearch(form.personaje);
        setForm(initialForm);
    }
    
    return(
        <form className='form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Buscar Personaje' name='personaje' className='estilosGral' onChange={handleChange} />
            <select className='estilosGral' onChange={(e) => setGenero(e.target.value)}>
                <option value="---" defaultValue>Elegir genero</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
            <button className='buttonEnviarForm' type="submit">Enviar</button>
        </form>
    )
}