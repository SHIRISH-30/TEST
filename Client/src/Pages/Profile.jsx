import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to login if token is not found
                    return;
                }

                const username = await getUsernameFromToken(token);
                setUsername(username || '');

                const userData = await axios.get(`/api/user/${username}`);
                const role = userData.data.role;

                if (role === 'truck driver') {
                    navigate('/truckForm');
                } else if (role === 'recruiter') {
                    navigate('/recruiterForm');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/user/${username}/updaterole`, { role: selectedOption });
            console.log(response.data);

            if (selectedOption === "recruiter") {
                navigate('/recruiterForm');
            } else if (selectedOption === "truck driver") {
                navigate('/truckForm');
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const getUsernameFromToken = async (token) => {
        try {
            if (!token) {
                throw new Error('Token not found');
            }
            const [, payload] = token.split('.');
            const decodedPayload = atob(payload);
            const payloadObject = JSON.parse(decodedPayload);
            return payloadObject.username;
        } catch (error) {
            console.error('Error decoding token:', error);
            return '';
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow container mx-auto mt-8">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <p className="mb-2 font-bold">What are you?</p>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-blue-600"
                                        value="truck driver"
                                        checked={selectedOption === "truck driver"}
                                        onChange={handleOptionChange}
                                    />
                                    <span className="ml-2">Truck Driver</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-blue-600"
                                        value="recruiter"
                                        checked={selectedOption === "recruiter"}
                                        onChange={handleOptionChange}
                                    />
                                    <span className="ml-2">Recruiter from a Company</span>
                                </label>
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
