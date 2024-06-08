import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';

export const AnimalCard = ({ animal, apiPath }) => {
    const { name, origin, image, place_of_found } = animal;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
                    <img
                        className="rounded-t-lg"
                        src={image || 'https://fakeimg.pl/500x500/cc7701'}
                        alt={name || 'Animal'}
                    />
                    <div className="p-5">
                        <Link to="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {name}
                            </h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {apiPath === 'birds' ? place_of_found : origin}
                        </p>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Modal data={animal} apiPath={apiPath} setIsOpen={setIsOpen} />
            )}
        </>
    );
};
