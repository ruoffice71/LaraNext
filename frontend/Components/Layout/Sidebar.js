import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion bg_sidebar" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" href="/">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" href="layout-static.html">Static Navigation</Link>
                            <Link className="nav-link" href="layout-sidenav-light.html">Light Sidenav</Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <p className="small">API: Laravel 11</p>
                <p className="small">Frontend: Next.js 15</p>
                <p className="small">Version: 0.0.1-alpha</p>
            </div>
        </nav>
    );
};

export default Sidebar;