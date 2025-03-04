import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <nav className="text-white py-4 shadow-md" style={{ backgroundColor: 'rgb(41, 47, 54)' }}>
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-300">Auth App</Link>
                </h1>
                <ul className="flex space-x-6">
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/login" className="hover:underline">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:underline">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/profile" className="hover:underline">Profile</Link>
                            </li>
                            <li>
                                <button 
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '/login';
                                    }} 
                                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
