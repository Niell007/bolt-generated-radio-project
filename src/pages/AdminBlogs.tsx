import React, { useState, useEffect } from 'react';

    interface Blog {
      title: string;
      content: string;
    }

    function AdminBlogs() {
      const [blogs, setBlogs] = useState<Blog[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [showCreateForm, setShowCreateForm] = useState(false);
      const [newBlogTitle, setNewBlogTitle] = useState('');
      const [newBlogContent, setNewBlogContent] = useState('');
      const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
      const [editedContent, setEditedContent] = useState('');

      useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await fetch('/content/blogs');
            if (response.ok) {
              const data = await response.json();
              const blogsArray = Object.values(data);
              setBlogs(blogsArray);
            } else {
              setError('Failed to fetch blogs');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
          } finally {
            setLoading(false);
          }
        };
    
        fetchBlogs();
      }, []);

      const handleDelete = async (title: string) => {
        try {
          const response = await fetch(`/content/blogs/${title}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setBlogs(blogs.filter((blog) => blog.title !== title));
          } else {
            setError('Failed to delete blog');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleCreate = async () => {
        try {
          const response = await fetch('/content/blogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newBlogTitle, content: newBlogContent }),
          });
          if (response.ok) {
            setBlogs([...blogs, { title: newBlogTitle, content: newBlogContent }]);
            setNewBlogTitle('');
            setNewBlogContent('');
            setShowCreateForm(false);
          } else {
            setError('Failed to create blog');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setEditedContent(blog.content);
      };

      const handleUpdate = async () => {
        try {
          const response = await fetch(`/content/blogs/${editingBlog.title}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: editedContent }),
          });
          if (response.ok) {
            setBlogs(
              blogs.map((blog) =>
                blog.title === editingBlog.title ? { ...blog, content: editedContent } : blog
              )
            );
            setEditingBlog(null);
            setEditedContent('');
          } else {
            setError('Failed to update blog');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleCancelEdit = () => {
        setEditingBlog(null);
        setEditedContent('');
      };

      return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-accent">Manage Blogs</h2>
          <button
            className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create New Blog'}
          </button>
          {showCreateForm && (
            <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold mb-2 text-light-text">Create New Blog</h3>
              <div className="mb-4">
                <label htmlFor="newBlogTitle" className="block mb-2 text-light-text">
                  Title
                </label>
                <input
                  type="text"
                  id="newBlogTitle"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newBlogContent" className="block mb-2 text-light-text">
                  Content
                </label>
                <textarea
                  id="newBlogContent"
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
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
                    <th className="text-left">Title</th>
                    <th className="text-left">Content</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.title}>
                      <td>{editingBlog?.title === blog.title ? (
                        <input
                          type="text"
                          value={blog.title}
                          disabled
                          className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                        />
                      ) : (
                        blog.title
                      )}</td>
                      <td>
                        {editingBlog?.title === blog.title ? (
                          <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                          />
                        ) : (
                          blog.content.substring(0, 100) + '...'
                        )}
                      </td>
                      <td className="text-right">
                        {editingBlog?.title === blog.title ? (
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
                              onClick={() => handleEdit(blog)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDelete(blog.title)}
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

    export default AdminBlogs;
