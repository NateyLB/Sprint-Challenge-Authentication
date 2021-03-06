import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props =>{
    return(
        <header className="navContainer">            
            <nav className="nav">
                <section>
                <Link to='/'>
                <p className="btn">Home</p>
                </Link>
                </section>
                <section>
                <Link to='/register'>
                <p className="btn">Register</p>
                </Link>
                </section>
                <section>
                <Link to='/login'>
                <p className="btn">Login</p>
                </Link>
                <Link to='/jokes'>
                <p className="btn">Jokes</p>
                </Link>

                </section>
               

            </nav>
        </header>
    )
}

export default Nav;