import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { debounce } from 'lodash';

const Profile = () => {
    const [form] = Form.useForm(); // Step 1: Create form instance
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/home', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            const userData = { 
                username: response.data.user.username, 
                email: response.data.user.email 
            };
            form.setFieldsValue(userData); // Step 2: Set fetched values in form
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            message.error("Failed to load user data.");
        });
    }, [form]); // Step 3: Re-run when `form` changes

    // Debounced function to handle profile update
    const handleUpdate = debounce(async (values) => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:3000/auth/profile', values, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
    }, 500); // 500ms debounce time

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="shadow-lg px-8 py-5 border w-80 bg-white rounded-md">
                <h2 className="text-lg font-bold mb-4 text-center text-gray-900">Edit Profile</h2>
                
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    {/* Username Input */}
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                    >
                        <Input placeholder="Enter Username" />
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
                        <Input placeholder="Enter Email" />
                    </Form.Item>

                    {/* Password Input */}
                    <Form.Item
                        label="New Password (optional)"
                        name="password"
                    >
                        <Input.Password placeholder="Enter New Password" />
                    </Form.Item>

                    {/* Submit Button */}
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

                {/* Logout Button */}
                <div className="text-center">
                    <Button 
                        danger 
                        type="link" 
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/login');
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
