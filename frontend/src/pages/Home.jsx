import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { SmileOutlined } from '@ant-design/icons';
const Home = () => {
  const navigate = useNavigate()
  const fetchUser = async () => {
    try {
      
      const authToken = Cookies.get('auth_token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization" : `Bearer ${authToken}`
        }
      })
      if(response.status !== 201) {
        navigate('/login')
      }
    } catch(err){
      navigate('/login')
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <SmileOutlined className="text-blue-500 text-6xl mb-4" />
        <h1 className="text-3xl text-blue-500 font-semibold">Welcome to Auth Home Page</h1>
      </div>
    </div>
  )
}

export default Home