import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DogForm, CatForm, BirdForm } from '../components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const formatColumnName = (columnName) => {
    const words = columnName.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return words.join(' ');
};

export const Admin = () => {
    const [dogs, setDogs] = useState([]);
    const [cats, setCats] = useState([]);
    const [birds, setBirds] = useState([]);
    const [editingAnimal, setEditingAnimal] = useState(null);
    const [isAddingDog, setIsAddingDog] = useState(false);
    const [isAddingCat, setIsAddingCat] = useState(false);
    const [isAddingBird, setIsAddingBird] = useState(false);
    // eslint-disable-next-line
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDogs();
        fetchCats();
        fetchBirds();
    }, []);

    const fetchDogs = async () => {
        try {
            const response = await axios.get('http://localhost:5500/dogs');
            setDogs(response.data);
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    };

    const fetchCats = async () => {
        try {
            const response = await axios.get('http://localhost:5500/cats');
            setCats(response.data);
        } catch (error) {
            console.error('Error fetching cats:', error);
        }
    };

    const fetchBirds = async () => {
        try {
            const response = await axios.get('http://localhost:5500/birds');
            setBirds(response.data);
        } catch (error) {
            console.error('Error fetching birds:', error);
        }
    };

    const handleDelete = async (type, id) => {
        try {
            await axios.delete(`http://localhost:5500/${type}/${id}`);
            if (type === 'dogs') fetchDogs();
            if (type === 'cats') fetchCats();
            if (type === 'birds') fetchBirds();
        } catch (error) {
            console.error(`Error deleting ${type.slice(0, -1)}:`, error);
        }
    };

    const handleEdit = (type, animal) => {
        setEditingAnimal({ type, ...animal });
        setIsEditing(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const { type, _id, ...updatedData } = editingAnimal;

        try {
            await axios.put(`http://localhost:5500/${type}/update/${_id}`, updatedData);
            setEditingAnimal(null);
            setIsEditing(false);
            if (type === 'dogs') fetchDogs();
            if (type === 'cats') fetchCats();
            if (type === 'birds') fetchBirds();
        } catch (error) {
            console.error(`Error updating ${type.slice(0, -1)}:`, error);
        }
    };

    const handleAddSuccess = () => {
        fetchDogs();
        fetchCats();
        fetchBirds();
    };

    const openAddDogModal = () => {
        setIsAddingDog(true);
    };

    const openAddCatModal = () => {
        setIsAddingCat(true);
    };

    const openAddBirdModal = () => {
        setIsAddingBird(true);
    };

    const closeAddModal = () => {
        setIsAddingDog(false);
        setIsAddingCat(false);
        setIsAddingBird(false);
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setEditingAnimal(null);
    };

    const renderEditForm = () => {
        if (!editingAnimal) return null;

        const { type, ...animal } = editingAnimal;

        return (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-4">Edit {type.slice(0, -1)}</h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(animal).map((key) => (
                                key !== '_id' && (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700">{formatColumnName(key)}</label>
                                        <input
                                            type="text"
                                            value={animal[key]}
                                            onChange={(e) => setEditingAnimal({ ...editingAnimal, [key]: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                        <div>
                            <button type="submit" className="mr-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Update</button>
                            <button onClick={closeEditModal} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderTable = (animals, type) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        {Object.keys(animals[0] || {}).map((key) => (
                            key !== '_id' && key !== '__v' && <th key={key} className="py-2 px-4 border-b">{formatColumnName(key)}</th>
                        ))}
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal._id} className="border-b">
                            {Object.keys(animal).map((key) => (
                                key !== '_id' && key !== '__v' && <td key={key} className="py-2 px-4 border-b">{animal[key]}</td>
                            ))}
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEdit(type, animal)} className="mr-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 flex items-center">
                                    <FaEdit className="mr-1" />
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(type, animal._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 flex items-center">
                                    <FaTrash className="mr-1" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Admin</h1>
            {renderEditForm()}
            {isAddingDog && <DogForm onSuccess={handleAddSuccess} closeModal={closeAddModal} />}
            {isAddingCat && <CatForm onSuccess={handleAddSuccess} closeModal={closeAddModal} />}
            {isAddingBird && <BirdForm onSuccess={handleAddSuccess} closeModal={closeAddModal} />}
            <button onClick={openAddDogModal} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4">Add Dog</button>
            <button onClick={openAddCatModal} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4 ml-2">Add Cat</button>
            <button onClick={openAddBirdModal} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4 ml-2">Add Bird</button>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Dogs</h2>
            {dogs.length > 0 ? renderTable(dogs, 'dogs') : <p className="text-l font-semibold mb-4 dark:text-white">No dogs available</p>}
            <h2 className="text-2xl font-semibold mb-4 mt-8 dark:text-white">Cats</h2>
            {cats.length > 0 ? renderTable(cats, 'cats') : <p className="text-l font-semibold mb-4 dark:text-white">No cats available</p>}
            <h2 className="text-2xl font-semibold mb-4 mt-8 dark:text-white">Birds</h2>
            {birds.length > 0 ? renderTable(birds, 'birds') : <p className="text-l font-semibold mb-4 dark:text-white">No birds available</p>}
        </div>
    );
};

