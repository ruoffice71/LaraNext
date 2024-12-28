"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const handleInput = (e) => {
        setErrors([]);
        setLoginError('');
        setInput(prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError('');
        axios.post(`${process.env.BASE_URL}/login`, input).then(res => {
            console.log(res.data);
            // if anyone do it in serverside then data have to store in cookie instead of localStorage 
            const userName = res?.data?.data?.user?.name;
            const authToken = res?.data?.data?.token;

            if (userName && authToken) {
                localStorage.setItem('user_name', userName);
                localStorage.setItem('auth_token', authToken);
                window.location.href = '/'
            } else {
                console.error("Response does not contain user or token data.");
                setLoginError(res?.data?.status_message);
            }
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
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
                <h1>Login</h1>
            </div>
            <div className='auth_card_body mx-3'>
                <div className="input-group mt-4">
                    <span className="input-group-text"><i className='fas fa-phone'></i></span>
                    <input
                        type="text"
                        id="email_or_phone"
                        onChange={handleInput}
                        name="email_or_phone"
                        value={input.email_or_phone}
                        placeholder="Enter email / phone"
                        className={`form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent ${errors.email_or_phone ? 'is-invalid' : ''}`}
                    />
                    {errors.email_or_phone != undefined ? <p className="custom_validation_massege">{errors.email_or_phone[0]}</p> : null}
                    {loginError != undefined ? <p className="custom_validation_massege">{loginError}</p> : null}
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
                <button onClick={handleSubmit} className="btn btn-success mb-3 mt-3 w-50">
                    {isloading ? <div className="spinner-border spinner-border-sm" role="status"> 
                        <span className="visually-hidden">Loading...</span>
                    </div> : 'Login'}
                </button>
            </div>
            <div className='auth_card_footer'>
                <Link href={'/'}><i className='fa-solid fa-fingerprint'></i> Forgot password?</Link>
                <Link href={'/register'}><i className='fa-solid fa-user-tie'></i> Register here</Link>
            </div>
        </div>
    );
};

export default Login;