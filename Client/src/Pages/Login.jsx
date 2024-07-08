import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import React Toastify

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        try {
            const response = await axios.post('/api/user/login', {
                username,
                password,
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success('Login Succesfully.');
                navigate('/');
            } else {
                toast.error('Login failed. Please try again.'); // Use toast instead of alert
            }
        } catch (error) {
            toast.error('Login failed. Please try again.'); // Use toast instead of alert
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>LOGIN </h1>
            <div className="w-80 bg-gray-200 rounded-lg p-4 mb-6">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-100 mb-2"
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-100 mb-2"
                    placeholder="Password"
                />
                <button onClick={handleLogin} className="w-full bg-green-500 text-white py-2 rounded-md">
                    LOGIN
                </button>
            </div>
            <div className="flex">
                <a href="#" className="text-gray-600 mr-4">Forgot Password?</a>
                <a href="/register" className="text-green-500">Signup</a>
            </div>
        </div>
    );
}
