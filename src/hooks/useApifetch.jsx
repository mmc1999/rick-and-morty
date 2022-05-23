import React, {useState, useEffect} from 'react'

const useApifetch = () => {
    const [nextPage, setNextPage] = useState("");
    const [backPage, setBackPage] = useState("");
    const [personaje, setPersonaje] = useState([]);
    const [url, setUrl] = useState("https://rickandmortyapi.com/api/character?page=1");
    const controller = new AbortController();
    const [loading, setLoading] = useState(false)

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
    }, [url]);

    const loadMore = () => setUrl(nextPage)
    
    const loadLess = () => setUrl(backPage);

    const handleSearch = (data) => {
        if(data === "") return
        setLoading(true)
        setTimeout(() => {
            console.log("no viene nada");
            setLoading(false);
            controller.abort();
        }, 4000);
        
        
        //esto lo hago para en la api pasarle el nombre con espacios
        let nombrePersonaje = new URLSearchParams(data).toString();
        nombrePersonaje = nombrePersonaje.slice(0, nombrePersonaje.length - 1);

        let urlOriginal=`https://rickandmortyapi.com/api/character?name=${nombrePersonaje}`;
        setUrl(urlOriginal);
    }
    const handleGender = (data) => {
        if(data === "nada") setUrl("https://rickandmortyapi.com/api/character?page=1")
        if(data == "male" || data == "female" || data == "genderless" || data == "unknown") {
            setUrl(`https://rickandmortyapi.com/api/character/?gender=${data}`);
        } 
    }

  return {
    handleGender, handleSearch, loadLess, loadMore, personaje, nextPage, backPage, loading
  }
}

export default useApifetch