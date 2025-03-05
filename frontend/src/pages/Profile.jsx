import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { debounce } from 'lodash';
import Cookies from 'js-cookie';

const Profile = ({setIsAuthenticated}) => {
    const [form] = Form.useForm(); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const authToken = Cookies.get('auth_token');

    console.log({authToken})

    useEffect(() => {
        axios.get('http://localhost:3000/auth/home', {
            headers: { Authorization: `Bearer ${authToken}` }
        })
        .then(response => {
            const userData = { 
                username: response.data.user.username, 
                email: response.data.user.email 
            };
            form.setFieldsValue(userData); 
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            message.error("Failed to load user data.");
        });
    }, [form]);

    const handleUpdate = debounce(async (values) => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:3000/auth/profile', values, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (response.status === 200) {
                message.success("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            message.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    }, 500);

     const handleLogout = () => {
            Cookies.remove('auth_token', { path: '/' });
            setIsAuthenticated(false); // Remove cookie globally
            navigate('/login'); // Redirect to login page
        };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="shadow-lg px-8 py-5 border w-80 bg-white rounded-md">
                <h2 className="text-lg font-bold mb-4 text-center text-gray-900">Edit Profile</h2>
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                    >
                        <Input placeholder="Enter Username" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Enter a valid email' }
                        ]}
                    >
                        <Input placeholder="Enter Email" />
                    </Form.Item>
                    <Form.Item
                        label="New Password (optional)"
                        name="password"
                    >
                        <Input.Password placeholder="Enter New Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full text-white"
                            style={{ backgroundColor: 'rgb(41, 47, 54)', border: 'none' }}
                            loading={loading}
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center">
                    <Button 
                        danger 
                        type="link" 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
