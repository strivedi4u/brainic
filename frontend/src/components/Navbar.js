import React from 'react';
import logo from "../assets/images/logo.png";
import "../assets/css/navbar.css";
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "white" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} style={{ borderRadius: '50%', marginLeft: "35px" }} width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;&nbsp;
                        <span style={{ color: "red" }} className="a"><b>Bra</b></span>
                        <span style={{ color: "#2EBF75" }} className="b"><b>inic&nbsp;</b></span>
                        <span style={{ color: "yellow" }} className="c"><b>Exp</b></span>
                        <span style={{ color: "blue" }} className="d"><b>ert</b></span>

                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <li className="d-flex" role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/help">How It's Work</a>
                                </li>
                                <li className="nav-item">

                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
