"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { use, useState } from 'react';

const register = () => {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);
    const handleInput = (e) => {
        setErrors([]);
        setInput(prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register', input).then(res => {
            console.log(res.data);
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors);
            }
        })
    }
    return (
        <div className='auth_card shadow-lg'>
            <div className='auth_card_header'>
                <img src={'./logo.png'} className={'img-fluid'} alt="logo"/>
                <h1>Register</h1>
            </div>
            <div className='auth_card_body mx-3'>
                <div className="input-group mt-4">
                    <span className="input-group-text"><i className='fas fa-user-pen'></i></span>
                    <input
                        type="text"
                        id="name"
                        onChange={handleInput}
                        name="name"
                        value={input.name}
                        placeholder="Enter fullname"
                        className={`form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent ${errors.name ? 'is-invalid' : ''}`}
                    />
                    <p className="custom_validation_massege">{errors.name != undefined ? errors.name[0] : ''} <br/></p>
                </div>
                <div className="input-group mt-4">
                    <span className="input-group-text"><i className='fas fa-phone'></i></span>
                    <input
                        type="text"
                        id="phone"
                        onChange={handleInput}
                        name="phone"
                        value={input.phone}
                        placeholder="Enter phone"
                        className={`form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent ${errors.phone ? 'is-invalid' : ''}`}
                    />
                    <p className="custom_validation_massege">{errors.phone != undefined ? errors.phone[0] : ''} <br/></p>
                </div>
                <div className="input-group mt-4">
                    <span className="input-group-text"><i className='fas fa-at'></i></span>
                    <input
                        type="text"
                        id="email"
                        onChange={handleInput}
                        name="email"
                        value={input.email}
                        placeholder="Enter email"
                        className={`form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <p className="custom_validation_massege">{errors.email != undefined ? errors.email[0] : ''} <br/></p>
                </div>
                <div className="input-group mt-4">
                    <span className="input-group-text"><i className='fas fa-lock'></i></span>
                    <input
                        type="password"
                        id="password"
                        onChange={handleInput}
                        name="password"
                        value={input.password}
                        placeholder="Enter password"
                        className={`form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <span className="input-group-text"><i className='fas fa-eye'></i></span>
                    <p className="custom_validation_massege">{errors.password != undefined ? errors.password[0] : ''} <br/></p>
                </div>
            </div>
            <div className='text-center'>
                <button onClick={handleSubmit} className="btn btn-success mb-3 mt-3 w-50">Register</button>
            </div>
            <div className='auth_card_footer'>
                <Link href={'/'}><i className='fa-solid fa-fingerprint'></i> Forgot password?</Link>
                <Link href={'/login'}><i className='fa-solid fa-user-tie'></i> Login here</Link>
            </div>
        </div>
    );
};

export default register;