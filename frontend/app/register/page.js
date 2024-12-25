import Link from 'next/link';
import React from 'react';

const register = () => {
    return (
        <div className='auth_card shadow-lg'>
            <div className='auth_card_header'>
                <img src={'./logo.png'} className={'img-fluid'} alt="logo"/>
                <h1>Register</h1>
            </div>
            <div className='auth_card_body mx-3'>
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className='fas fa-user-pen'></i></span>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter fullname"
                        className="form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                </div>
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className='fas fa-phone'></i></span>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone"
                        className="form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                </div>
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className='fas fa-at'></i></span>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        className="form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                </div>
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className='fas fa-lock'></i></span>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        className="form-control w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
                    />
                    <span className="input-group-text"><i className='fas fa-eye'></i></span>
                </div>
            </div>
            <div className='text-center'>
                <div className="btn btn-success mb-3 mt-3 w-50">Register</div>
            </div>
            <div className='auth_card_footer'>
                <Link href={'/'}><i className='fa-solid fa-fingerprint'></i> Forgot password?</Link>
                <Link href={'/login'}><i className='fa-solid fa-user-tie'></i> Login here</Link>
            </div>
        </div>
    );
};

export default register;