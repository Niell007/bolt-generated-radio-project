import React, { useState, useEffect } from 'react';

    interface Blog {
      title: string;
      content: string;
    }

    function BlogList() {
      const [blogs, setBlogs] = useState<Blog[]>([]);

      useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await fetch('/content/blogs');
            if (response.ok) {
              const data = await response.json();
              setBlogs(data);
            } else {
              console.error('Failed to fetch blogs');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };

        fetchBlogs();
      }, []);

      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Latest Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog.title} className="mb-4">
              <h3 className="text-lg font-semibold text-light-text">{blog.title}</h3>
              <p className="text-light-text">{blog.content.substring(0, 100)}...</p>
              <a href={`/blog/${blog.title}`} className="text-purple-accent">
                Read More
              </a>
            </div>
          ))}
        </div>
      );
    }

    export default BlogList;
