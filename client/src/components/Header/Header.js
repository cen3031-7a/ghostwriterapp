import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            {/* Logo */}
            <div className='header-logo'>

                <a target='_blank' rel='noopener noreferrer' href='/'>
                    <img src='http://www.transparentpng.com/thumb/ghost/qImZcm-ghost-comictransparent-picture.png' id="logo-image" />
                </a>

                <Link id="logo-link" to="/">
			    Ghost Writer
                </Link>

            </div>
            <div className="navbar">

                <div id="pages" align="left">
                    <Link id="homepage" to='/Home'>Home</Link>
                    <Link id="aboutpage" to='/about'>About</Link>
                    <Link id="questionpage" to='/Questions'>Questions</Link>
                </div>

                <div id="account" align="right">
                    <a href='/Account'>
                        <img src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' id="account-image"/>
                    </a>
                    <a href='/'>
                        <button type="button" id="sign-out">Sign Out</button>
                    </a>
                </div>

            </div>
            {/* Page Links */}
            {/* <div className="header-right">
                <Link className="header-link" to='/Register'>Sign in</Link>
                <Link className="header-link" to='/projects'>Projects</Link>
                <a className="header-link" target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar">
                    Events
                </a>
                <a className="header-link" target='_blank' rel="noopener noreferrer" href="https://github.com/ufosc/club-resources">
                    Resources
                </a>
                <Link className="header-link" to="/about">About</Link>
            </div> */}
        </div>
    )
}

export default Header;
