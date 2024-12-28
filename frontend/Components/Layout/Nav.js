import Link from 'next/link';
import React from 'react';

const Nav = () => {
    const handelSidebarToggle = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_name');
        window.location.href = '/login ';
    }
    
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg_nav">
            
            <Link className="navbar-brand ps-3" href="/">
                <img src={'logo.png'} className={'img-fluid'} alt={'logo'} />
            </Link>
            
            <button onClick={handelSidebarToggle} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            
            <ul className="navbar-nav ms-auto me-3 me-lg-4 align-items-center">
                <p className={'text-white'}>Raihan</p>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" href="#!">Settings</Link></li>
                        <li><Link className="dropdown-item" href="#!">Activity Log</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;