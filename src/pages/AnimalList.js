import { useEffect, useRef } from 'react';
import { AnimalCard } from '../components';
import { useFetch } from '../hooks/useFetch';
import { useSearch } from '../hooks/useSearch';

export const AnimalList = ({ apiPath }) => {
    const { data: animals, error } = useFetch(apiPath);
    const { queryTerm, searchResults, searchError, handleSearch, handleReset } = useSearch(apiPath);

    const searchInputRef = useRef(null);

    useEffect(() => {
        handleReset();
    }, [apiPath, handleReset]);

    const handleSearchAndClearInput = (event) => {
        handleSearch(event);
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
    };

    const displayedAnimals = queryTerm ? searchResults : animals;
    const displayedError = queryTerm ? searchError : error;

    return (
        <main>
            <section>
                <form onSubmit={handleSearchAndClearInput} className="flex items-center">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        ref={searchInputRef}
                        className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        autoComplete="off"
                    />
                    <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
                    {queryTerm && (
                        <button type="button" onClick={handleReset} className="ml-2 p-2 bg-gray-500 text-white rounded">
                            Reset
                        </button>
                    )}
                </form>
            </section>
            <section className='max-w-7xl mx-auto py-7'>
                {displayedError && <p className="text-red-500">{displayedError}</p>}
                <div className='flex justify-center flex-wrap'>
                    {displayedAnimals.map((animal) => (
                        <AnimalCard key={animal.id} apiPath={apiPath} animal={animal} />
                    ))}
                </div>
            </section>
        </main>
    );
};
