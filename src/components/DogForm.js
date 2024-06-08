import React, { useState } from 'react';
import axios from 'axios';

export const DogForm = ({ onSuccess, closeModal }) => {
    const [formData, setFormData] = useState({
        name: '',
        breed_group: '',
        size: '',
        lifespan: '', 
        origin: '',
        temperament: '',
        colors: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5500/dogs/add`, formData);
            onSuccess();
            closeModal();
        } catch (error) {
            console.error('Error adding dog:', error);
        }
    };
    const handleCancel = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Add Dog</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 md:pr-2">
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full">
                                    <label>Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div className="w-full">
                                    <label>Size:</label>
                                    <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 md:pl-2">
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full">
                                    <label>Breed Group:</label>
                                    <input type="text" name="breed_group" value={formData.breed_group} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div className="w-full">
                                    <label>Lifespan:</label>
                                    <input type="text" name="lifespan" value={formData.lifespan} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 md:pr-2">
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full">
                                    <label>Origin:</label>
                                    <input type="text" name="origin" value={formData.origin} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div className="w-full">
                                    <label>Colors:</label>
                                    <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 md:pl-2">
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full">
                                    <label>Temperament:</label>
                                    <input type="text" name="temperament" value={formData.temperament} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div className="w-full">
                                    <label>Description:</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Image:</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ml-2">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};
