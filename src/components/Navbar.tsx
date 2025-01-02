import React from 'react';
    import { NavLink } from 'react-router-dom';
    import Search from './Search';

    function Navbar() {
      return (
        <nav className="bg-purple-secondary text-white p-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink to="/user" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                User
              </NavLink>
            </li>
            <li>
              <NavLink to="/docs" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Docs
              </NavLink>
            </li>
          </ul>
          <div className="mt-4">
            <Search />
          </div>
        </nav>
      );
    }

    export default Navbar;
