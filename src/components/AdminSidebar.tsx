import React from 'react';
    import { NavLink } from 'react-router-dom';

    function AdminSidebar() {
      return (
        <div className="bg-purple-secondary p-4 rounded-lg shadow-lg h-screen">
          <h2 className="text-xl font-bold mb-4 text-light-text">Admin Panel</h2>
          <ul className="text-light-text">
            <li>
              <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/blogs" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/comments" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Comments
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/media" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Media
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? 'text-purple-light' : 'hover:text-purple-light')}>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }

    export default AdminSidebar;
