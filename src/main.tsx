import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    import './index.css';
    import App from './App';
    import Home from './pages/Home';
    import Admin from './pages/Admin';
    import AdminLogin from './pages/AdminLogin';
    import AdminDashboard from './pages/AdminDashboard';
    import AdminBlogs from './pages/AdminBlogs';
    import AdminComments from './pages/AdminComments';
    import AdminUsers from './pages/AdminUsers';
    import AdminMedia from './pages/AdminMedia';
    import AdminSettings from './pages/AdminSettings';
    import Blogs from './pages/Blogs';
    import Bookings from './pages/Bookings';
    import GalleryPage from './pages/GalleryPage';
    import AboutPage from './pages/AboutPage';
    import User from './pages/User';
    import Docs from './pages/Docs';

    const router = createBrowserRouter([
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'admin',
            element: <Admin />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: 'blogs',
                element: <AdminBlogs />,
              },
              {
                path: 'comments',
                element: <AdminComments />,
              },
              {
                path: 'users',
                element: <AdminUsers />,
              },
              {
                path: 'media',
                element: <AdminMedia />,
              },
              {
                path: 'settings',
                element: <AdminSettings />,
              },
            ],
          },
          {
            path: 'admin/login',
            element: <AdminLogin />,
          },
          {
            path: 'blogs',
            element: <Blogs />,
          },
          {
            path: 'bookings',
            element: <Bookings />,
          },
          {
            path: 'gallery',
            element: <GalleryPage />,
          },
          {
            path: 'about',
            element: <AboutPage />,
          },
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'docs',
            element: <Docs />,
          },
        ],
      },
    ]);

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
