import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
//import "../../index.js";

//var data = this.state.data;

class Header extends Component {
    render() {
        return (
            <div className='header'>
                {/* Logo */}
                <div className='header-logo'>

                    <a href='/'>
                        <img src='http://www.transparentpng.com/thumb/ghost/qImZcm-ghost-comictransparent-picture.png' id="logo-image" />
                    </a>

                    <Link id="logo-link" to="/">
                    Ghost Writer
                    </Link>

                </div>
                <div className="navbar">

                    <div id="pages" align="left">
                        <Link id="homepage" to='/Home'>Home</Link>
                        <Link id="questionpage" to='/Questions'>Questions</Link>
                    </div>

                    <div id="account" align="right">
                        {/* if user logged in */}
                            <Link id="account-link" to="/Account">My Account</Link>
                            <a href='/'>
                                <button type="button" id="sign-out">Sign Out</button>
                            </a>
                    </div>

                </div>
            </div>
        )
    }
}

export default Header;
