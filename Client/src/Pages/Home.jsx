import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for routing and useNavigate for programmatic navigation
import base64 from 'base-64';

const Home = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

    useEffect(() => {
        const fetchUsername = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const username = await getUsernameFromToken(token);
                setUsername(username || '');
            } else {
                setUsername('');
            }
        };

        fetchUsername();
    }, []);

    const getUsernameFromToken = async (token) => {
        try {
            if (!token) {
                throw new Error('Token not found');
            }
            const [, payload] = token.split('.');
            const decodedPayload = base64.decode(payload);
            const payloadObject = JSON.parse(decodedPayload);
            return payloadObject.username;
        } catch (error) {
            console.error('Error decoding token:', error);
            return '';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setUsername(''); // Reset username to reflect logged-out state
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-blue-600 text-white p-12 text-center">
                <h2 className="text-3xl font-bold mb-2">Hello, Myself Shirish, A Backend Developer and Lokking for Oppurtunity</h2>

            </header>

        </div>
    );
};

export default Home;
