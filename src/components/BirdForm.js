// BirdForm.js
import React, { useState } from 'react';
import axios from 'axios';

export const BirdForm = ({ onSuccess, closeModal }) => {
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        family: '',
        habitat: '',
        place_of_found: '',
        diet: '',
        description: '',
        wingspan_cm: '',
        weight_kg: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5500/birds/add`, formData);
            onSuccess();
            closeModal();
        } catch (error) {
            console.error('Error adding bird:', error);
        }
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Add Bird</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 md:pr-2">
                            <div className="w-full">
                                <label>Name:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="w-full">
                                <label>Species:</label>
                                <input type="text" name="species" value={formData.species} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 md:pl-2">
                            <div className="w-full">
                                <label>Family:</label>
                                <input type="text" name="family" value={formData.family} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="w-full">
                                <label>Habitat:</label>
                                <input type="text" name="habitat" value={formData.habitat} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 md:pr-2">
                            <div className="w-full">
                                <label>Place of Found:</label>
                                <input type="text" name="place_of_found" value={formData.place_of_found} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="w-full">
                                <label>Diet:</label>
                                <input type="text" name="diet" value={formData.diet} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 md:pl-2">
                            <div className="w-full">
                                <label>Wingspan (cm):</label>
                                <input type="number" name="wingspan_cm" value={formData.wingspan_cm} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="w-full">
                                <label>Weight (kg):</label>
                                <input type="number" name="weight_kg" value={formData.weight_kg} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2"></textarea>
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
