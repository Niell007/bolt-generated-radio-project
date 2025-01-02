import React, { useState, useEffect } from 'react';

    interface User {
      username: string;
      password?: string;
      role: string;
    }

    function AdminUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [showCreateForm, setShowCreateForm] = useState(false);
      const [newUsername, setNewUsername] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [newRole, setNewRole] = useState('');
      const [editingUser, setEditingUser] = useState<User | null>(null);
      const [editedPassword, setEditedPassword] = useState('');
      const [editedRole, setEditedRole] = useState('');

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('/users');
            if (response.ok) {
              const data = await response.json();
              setUsers(data);
            } else {
              setError('Failed to fetch users');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
          } finally {
            setLoading(false);
          }
        };

        fetchUsers();
      }, []);

      const handleDelete = async (username: string) => {
        try {
          const response = await fetch(`/users/${username}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setUsers(users.filter((user) => user.username !== username));
          } else {
            setError('Failed to delete user');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleCreate = async () => {
        try {
          const response = await fetch('/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, password: newPassword, role: newRole }),
          });
          if (response.ok) {
            setUsers([...users, { username: newUsername, role: newRole }]);
            setNewUsername('');
            setNewPassword('');
            setNewRole('');
            setShowCreateForm(false);
          } else {
            setError('Failed to create user');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleEdit = (user: User) => {
        setEditingUser(user);
        setEditedPassword('');
        setEditedRole(user.role);
      };

      const handleUpdate = async () => {
        try {
          const response = await fetch(`/users/${editingUser.username}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: editedPassword, role: editedRole }),
          });
          if (response.ok) {
            setUsers(
              users.map((user) =>
                user.username === editingUser.username ? { ...user, password: editedPassword, role: editedRole } : user
              )
            );
            setEditingUser(null);
            setEditedPassword('');
            setEditedRole('');
          } else {
            setError('Failed to update user');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleCancelEdit = () => {
        setEditingUser(null);
        setEditedPassword('');
        setEditedRole('');
      };

      return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-accent">Manage Users</h2>
          <button
            className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create New User'}
          </button>
          {showCreateForm && (
            <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold mb-2 text-light-text">Create New User</h3>
              <div className="mb-4">
                <label htmlFor="newUsername" className="block mb-2 text-light-text">
                  Username
                </label>
                <input
                  type="text"
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-2 text-light-text">
                  Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newRole" className="block mb-2 text-light-text">
                  Role
                </label>
                <input
                  type="text"
                  id="newRole"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                />
              </div>
              <button
                className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          )}
          {loading ? (
            <p className="text-light-text">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
              <table className="w-full text-light-text">
                <thead>
                  <tr>
                    <th className="text-left">Username</th>
                    <th className="text-left">Role</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.username}>
                      <td>{user.username}</td>
                      <td>
                        {editingUser?.username === user.username ? (
                          <input
                            type="text"
                            value={editedRole}
                            onChange={(e) => setEditedRole(e.target.value)}
                            className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                          />
                        ) : (
                          user.role
                        )}
                      </td>
                      <td className="text-right">
                        {editingUser?.username === user.username ? (
                          <>
                            <button
                              className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={handleUpdate}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={() => handleEdit(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDelete(user.username)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    export default AdminUsers;
