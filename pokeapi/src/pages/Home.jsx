import React, { use } from 'react'
import Header from '../component/Header';
import Feed from '../component/Feed';
import { useEffect, useState } from 'react';
import LoadingScreen from '../component/LoadingScreen';
const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(() => {
        const storedOffset = sessionStorage.getItem('offset');
        return storedOffset ? parseInt(storedOffset, 10) : 0;
    });

    const [loading, setLoading] = useState(true);

    function handleNextPage() {
        const newOffset = offset + 50;
        setOffset(newOffset);
        sessionStorage.setItem('offset', newOffset.toString());
    }

    function handlePreviousPage() {
        const newOffset = offset <= 50 ? 0 : offset - 50;
        setOffset(newOffset);
        sessionStorage.setItem('offset', newOffset.toString());
    }

    useEffect(() => {
        async function fetchPokemons() {
            const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`;
            const res = await fetch(apiUrl);
            const datsa = await res.json();

            setPokemons(datsa.results);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }

        fetchPokemons();
    }, [offset]);

    useEffect(() => {
        setLoading(true);
    }, [offset]);

    return (
        <div className='Home maxWidth'>
            {loading && <LoadingScreen />}
            {!loading && (
                <>
                    <Header />
                    <Feed pokemons={pokemons} />
                    <div className="pagination">
                        <button onClick={handlePreviousPage} className='btn'>Previous</button>
                        <button onClick={handleNextPage} className='btn'>Next</button>
                    </div>
                </>
            )}
        </div>
    )
};

export default Home;