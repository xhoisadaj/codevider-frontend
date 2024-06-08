import { useEffect, useRef, useState } from 'react';
import { AnimalCard } from '../components';
import { useFetch } from '../hooks/useFetch';
import { useSearch } from '../hooks/useSearch';
import Loader from '../components/Loader'; // Import the loader component

export const AnimalList = ({ apiPath }) => {
    const { data: animals, error } = useFetch(apiPath);
    const { queryTerm, searchResults, searchError, handleSearch, handleReset } = useSearch(apiPath);
    const [displayedAnimals, setDisplayedAnimals] = useState([]);
    const [displayedError, setDisplayedError] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Initial loading state

    const searchInputRef = useRef(null);

  // Inside the useEffect hook for fetching data
    useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching data
    handleReset();

    // When data is fetched successfully, set isLoading to false
    if (animals.length > 0 || searchResults.length > 0) {
        setIsLoading(false);
    }
    }, [apiPath, handleReset, animals.length, searchResults.length]);



    useEffect(() => {
        const displayedData = queryTerm ? searchResults : animals;
        const nextIndex = showMore ? displayedAnimals.length + 9 : 9;
        setDisplayedAnimals(displayedData.slice(0, nextIndex)); // Show first 9 animals initially or more if showMore is true
        setDisplayedError(queryTerm ? searchError : error);
    }, [queryTerm, searchResults, animals, searchError, error, showMore, displayedAnimals.length]);

    const handleSearchAndClearInput = (event) => {
        handleSearch(event);
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
    };

    const handleToggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };

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
                {isLoading ? ( // Render loader if data is loading
                    <Loader />
                ) : (
                    <>
                        {displayedError && <p className="text-red-500">{displayedError}</p>}
                        <div className='flex justify-center flex-wrap'>
                        {displayedAnimals.map((animal, index) => (
    <AnimalCard key={index} apiPath={apiPath} animal={animal} />
))}


                        </div>
                        {animals.length > 9 && (
                            <div className="flex justify-center mt-4">
                                <button onClick={handleToggleShowMore} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    {showMore ? 'Show Less' : 'Show More'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};
