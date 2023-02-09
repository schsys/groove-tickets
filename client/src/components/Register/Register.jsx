import React from 'react'
import Signup from './Signup'
import './Register.css';
import Login from './Login';

export default function Register() {
  return (
    <div className='register_page_container'>
        <Signup />
        <div className="sections_separation_div"></div>
        <Login />
    </div>
  )
}
