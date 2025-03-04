import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { debounce } from 'lodash'; // Import Lodash debounce

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle registration (debounced)
    const handleRegister = debounce(async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/auth/register', values);
            if (response.status === 201) {
                message.success('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            message.error('Registration failed. Please try again.');
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }, 500); // 500ms debounce time

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="shadow-lg px-8 py-5 border w-80 bg-white rounded-md">
                <h2 className="text-lg font-bold mb-4 text-center text-gray-900">Register</h2>
                
                <Form layout="vertical" onFinish={handleRegister}>
                    {/* Username Input */}
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                    >
                        <Input placeholder="Enter Username" className="border-gray-300 focus:border-gray-500" />
                    </Form.Item>

                    {/* Email Input */}
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

                    {/* Password Input */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password placeholder="Enter Password" className="border-gray-300 focus:border-gray-500" />
                    </Form.Item>

                    {/* Submit Button with RGB (41, 47, 54) */}
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

                {/* Login Link */}
                <div className="text-center">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-blue-500">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
