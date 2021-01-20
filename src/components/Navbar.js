
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        
        <Link to="/">
        <h2><FontAwesomeIcon icon={faFilm}/> Movie Finder</h2>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar