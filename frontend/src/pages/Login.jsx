import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { debounce } from 'lodash'; 
import Cookies from 'js-cookie';

const Login = ({ setIsAuthenticated }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = debounce(async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values);
            if (response.status === 201) {
                Cookies.set('auth_token', response.data.token, { expires: 3, path: '/' });
                setIsAuthenticated(true);
                message.success('Login successful');
                navigate('/');
            }
        } catch (err) {
            message.error('Login failed. Please check your credentials.');
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }, 500);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="shadow-lg px-8 py-5 border w-80 bg-white rounded-md">
                <h2 className="text-lg font-bold mb-4 text-center text-gray-900">Login</h2>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Enter a valid email' }
                        ]}
                    >
                        <Input placeholder="Enter Email" className="border-gray-300 focus:border-gray-500" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password placeholder="Enter Password" className="border-gray-300 focus:border-gray-500" />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full text-white"
                            style={{ backgroundColor: 'rgb(41, 47, 54)', border: 'none' }}
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                {/* Signup Link */}
                <div className="text-center">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-blue-500">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
