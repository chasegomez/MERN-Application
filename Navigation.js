import React from 'react';
import { Link } from 'react-router-dom';


function navLinks() {
    return (
        <nav>
            <span>
                <Link className="App-Nav" to="/">Home</Link>
                <Link className="App-Nav" to="/create-exercise">Create</Link>
            </span>
        </nav>
    );
}

export default navLinks;