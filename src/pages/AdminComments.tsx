import React, { useState, useEffect } from 'react';

    interface Comment {
      blogTitle: string;
      author: string;
      text: string;
      approved: boolean;
    }

    function AdminComments() {
      const [comments, setComments] = useState<Comment[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [editingComment, setEditingComment] = useState<Comment | null>(null);
      const [editedText, setEditedText] = useState('');

      useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await fetch('/content/comments');
            if (response.ok) {
              const data = await response.json();
              setComments(data);
            } else {
              setError('Failed to fetch comments');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
          } finally {
            setLoading(false);
          }
        };

        fetchComments();
      }, []);

      const handleDelete = async (blogTitle: string, author: string) => {
        try {
          const response = await fetch(`/content/comments/${blogTitle}/${author}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setComments(comments.filter((comment) => comment.blogTitle !== blogTitle || comment.author !== author));
          } else {
            setError('Failed to delete comment');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleApprove = async (blogTitle: string, author: string) => {
        try {
          const commentToApprove = comments.find((comment) => comment.blogTitle === blogTitle && comment.author === author);
          const response = await fetch(`/content/comments/${blogTitle}/${author}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: commentToApprove.text,
              approved: true,
            }),
          });
          if (response.ok) {
            setComments(
              comments.map((comment) =>
                comment.blogTitle === blogTitle && comment.author === author
                  ? { ...comment, approved: true }
                  : comment
              )
            );
          } else {
            setError('Failed to approve comment');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleEdit = (comment: Comment) => {
        setEditingComment(comment);
        setEditedText(comment.text);
      };

      const handleUpdate = async () => {
        try {
          const response = await fetch(`/content/comments/${editingComment.blogTitle}/${editingComment.author}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: editedText,
              approved: editingComment.approved,
            }),
          });
          if (response.ok) {
            setComments(
              comments.map((comment) =>
                comment.blogTitle === editingComment.blogTitle && comment.author === editingComment.author
                  ? { ...comment, text: editedText }
                  : comment
              )
            );
            setEditingComment(null);
            setEditedText('');
          } else {
            setError('Failed to update comment');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleCancelEdit = () => {
        setEditingComment(null);
        setEditedText('');
      };

      return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-accent">Manage Comments</h2>
          {loading ? (
            <p className="text-light-text">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
              <table className="w-full text-light-text">
                <thead>
                  <tr>
                    <th className="text-left">Blog Title</th>
                    <th className="text-left">Author</th>
                    <th className="text-left">Comment</th>
                    <th className="text-left">Approved</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr key={`${comment.blogTitle}-${comment.author}`}>
                      <td>{comment.blogTitle}</td>
                      <td>{comment.author}</td>
                      <td>
                        {editingComment?.blogTitle === comment.blogTitle &&
                        editingComment?.author === comment.author ? (
                          <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                          />
                        ) : (
                          comment.text.substring(0, 100) + '...'
                        )}
                      </td>
                      <td>{comment.approved ? 'Yes' : 'No'}</td>
                      <td className="text-right">
                        {editingComment?.blogTitle === comment.blogTitle &&
                        editingComment?.author === comment.author ? (
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
                            {!comment.approved && (
                              <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => handleApprove(comment.blogTitle, comment.author)}
                              >
                                Approve
                              </button>
                            )}
                            <button
                              className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={() => handleEdit(comment)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDelete(comment.blogTitle, comment.author)}
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

    export default AdminComments;
