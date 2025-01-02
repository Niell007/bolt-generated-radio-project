import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function AdminLogin() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate = useNavigate();

      const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };

      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
          const response = await fetch('/users/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
            const data = await response.json();
            // Assuming the backend returns a JWT token upon successful authentication
            localStorage.setItem('adminToken', data.token);
            navigate('/admin');
          } else {
            setError('Invalid username or password');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      return (
        <div className="container mx-auto p-4">
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-accent">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-2 text-light-text">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-light-text">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                />
              </div>
              <button
                type="submit"
                className="bg-purple-accent text-white p-2 rounded-md"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      );
    }

    export default AdminLogin;
