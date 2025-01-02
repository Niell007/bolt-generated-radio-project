import React, { useState } from 'react';

    function CreateBlogForm() {
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [message, setMessage] = useState('');

      const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
      };

      const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.trim() === '' || content.trim() === '') {
          setMessage('Please enter both title and content.');
          return;
        }

        try {
          const response = await fetch('/content/blogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
          });

          if (response.ok) {
            setMessage('Blog created successfully!');
            setTitle('');
            setContent('');
          } else {
            setMessage('Failed to create blog.');
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred.');
        }
      };

      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Create New Blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 text-light-text">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block mb-2 text-light-text">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-accent text-white p-2 rounded-md"
            >
              Create Blog
            </button>
            {message && <p className="mt-2 text-light-text">{message}</p>}
          </form>
        </div>
      );
    }

    export default CreateBlogForm;
