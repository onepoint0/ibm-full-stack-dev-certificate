import { useEffect, useState } from "react";

const UseFetch = (url) => {
    const [data,setData] = useState();

    useEffect(() => {
        console.log('in useEffect in custom UseFetch hook, getting url ', url);
        
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log('error in useFetch hook! ',err));
    },[]);

    return data;
}

export default UseFetch
