import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from 'antd';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    
    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!Cookies.get('auth_token'));
        };

        window.addEventListener('storage', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, [setIsAuthenticated]);

    const handleLogout = () => {
        Cookies.remove('auth_token', { path: '/' }); 
        setIsAuthenticated(false); 
        window.location.href = '/login';
    };

    return (
        <nav className="text-white py-4 shadow-md" style={{ backgroundColor: 'rgb(41, 47, 54)' }}>
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-300">AUTH APP</Link>
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
                                <Button 
                                    type="primary" 
                                    danger 
                                    onClick={handleLogout}>
                                    Logout
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
