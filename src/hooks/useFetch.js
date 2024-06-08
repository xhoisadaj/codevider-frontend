import { useState, useEffect } from 'react';

export const useFetch = (apiPath) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const externalUrl = `https://freetestapi.com/api/v1/${apiPath}?limit=6`;
        const localUrl = `http://localhost:5500/${apiPath}`;

        async function fetchAnimals() {
            try {
                const [externalResponse, localResponse] = await Promise.all([
                    fetch(externalUrl),
                    fetch(localUrl)
                ]);

                const externalData = await externalResponse.json();
                const localData = await localResponse.json();

                const combinedData = [...externalData, ...localData];

                if (combinedData.length === 0) {
                    setError("WE FOUND NOTHING FOR YOU! SEARCH SOMETHING ELSE");
                } else {
                    setError("");
                }
                setData(combinedData);
            } catch (error) {
                console.error("An error occurred while fetching data.", error);
                setError("An error occurred while fetching data.");
            }
        }

        fetchAnimals();
    }, [apiPath]);

    return { data, error };
};
