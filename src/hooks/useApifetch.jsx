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
                let traer = await fetch(link);
                let data = await traer.json();
                setNextPage(data.info.next);
                setBackPage(data.info.prev || "");
                setPersonaje(data.results)
            } catch (error) {
                console.log(error)
            } 
        }
        getData(url);
        
        return () => setPersonaje([])
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
        if(data === "") setUrl("https://rickandmortyapi.com/api/character?page=1")
        if(data == "male" || data == "female" || data == "genderless" || data == "unknown") {
            setUrl(`https://rickandmortyapi.com/api/character/?gender=${data}`);
        } 
    }
    

  return {
    loadLess, 
    loadMore, 
    personaje, 
    nextPage, 
    backPage, 
    loading,
    handleGender,
    handleSearch
  }
}

export default useApifetch