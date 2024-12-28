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
        axios.post(`${process.env.BASE_URL}/register`, input).then(res => {
            // console.log(res.data);
            // if anyone do it in serverside then data have to store in cookie instead of localStorage 
            const userName = res?.data?.data?.user?.name;
            const authToken = res?.data?.data?.token;

            if (userName && authToken) {
                localStorage.setItem('user_name', userName);
                localStorage.setItem('auth_token', authToken);
                window.location.href = '/'
            } else {
                console.error("Response does not contain user or token data.");
            }
        }).catch(err => {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error("An unexpected error occurred:", err);
            }
        });
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
                    {errors.name != undefined ? <p className="custom_validation_massege">{errors.name[0]}</p> : null}
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
                    {errors.phone != undefined ? <p className="custom_validation_massege">{errors.phone[0]}</p> : null}
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
                    {errors.email != undefined ? <p className="custom_validation_massege">{errors.email[0]}</p> : null}
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
                    {errors.password != undefined ? <p className="custom_validation_massege">{errors.password[0]}</p> : null}
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