import React from 'react';
    import { Outlet, useNavigate } from 'react-router-dom';
    import AdminSidebar from '../components/AdminSidebar';

    function Admin() {
      const navigate = useNavigate();

      // Check if the user is authenticated as an admin
      React.useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
        }
      }, [navigate]);

      return (
        <div className="flex">
          <AdminSidebar />
          <div className="flex-grow p-4">
            <Outlet />
          </div>
        </div>
      );
    }

    export default Admin;
