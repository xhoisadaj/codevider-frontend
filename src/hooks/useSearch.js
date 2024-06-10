import { useState, useCallback } from 'react';

export const useSearch = (apiPath) => {
    const [queryTerm, setQueryTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();
        const query = event.target.search.value;
        
        setQueryTerm(query);

        const externalUrl = `https://freetestapi.com/api/v1/${apiPath}?search=${query}`;
        const localUrl = `http://localhost:5500/${apiPath}?search=${query}`;

        try {
            const [externalResponse, localResponse] = await Promise.all([
                fetch(externalUrl),
                fetch(localUrl)
            ]);

            const externalData = await externalResponse.json();
            const localData = await localResponse.json();

            const combinedData = [...externalData, ...localData];
            

            if (combinedData.length === 0) {
                setSearchError("WE FOUND NOTHING FOR YOU! SEARCH SOMETHING ELSE");
            } else {
                setSearchError("");
            }
            setSearchResults(combinedData);
        } catch (error) {
            
            setSearchError("An error occurred while searching.");
        }
    };

    const handleReset = useCallback(() => {
        
        setQueryTerm("");
        setSearchResults([]);
        setSearchError("");
    }, []);

    return { queryTerm, searchResults, searchError, handleSearch, handleReset };
};
