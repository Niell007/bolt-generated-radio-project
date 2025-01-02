import React, { useState, useEffect } from 'react';

    interface Comment {
      blogTitle: string;
      author: string;
      text: string;
      sentiment?: string;
    }

    function Comments({ blogTitle }: { blogTitle: string }) {
      const [comments, setComments] = useState<Comment[]>([]);
      const [newComment, setNewComment] = useState('');

      useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await fetch(`/content/comments/${blogTitle}`);
            if (response.ok) {
              const data = await response.json();
              setComments(data);
            } else {
              console.error('Failed to fetch comments');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };

        fetchComments();
      }, [blogTitle]);

      useEffect(() => {
        const analyzeSentiment = async () => {
          if (comments.length > 0 && !comments[comments.length - 1].sentiment) {
            const lastComment = comments[comments.length - 1];
            try {
              const response = await fetch('/ai/process-data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: lastComment.text }),
              });

              if (response.ok) {
                const data = await response.json();
                const sentiment = data.result;
                setComments((prevComments) =>
                  prevComments.map((comment) =>
                    comment === lastComment
                      ? { ...comment, sentiment }
                      : comment
                  )
                );
              } else {
                console.error('Failed to analyze sentiment');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }
        };

        analyzeSentiment();
      }, [comments]);

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newComment.trim() === '') return;

        try {
          const response = await fetch('/content/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              blogTitle,
              author: 'You',
              text: newComment,
            }),
          });

          if (response.ok) {
            setComments([
              ...comments,
              { blogTitle, author: 'You', text: newComment, sentiment: undefined },
            ]);
            setNewComment('');
          } else {
            console.error('Failed to post comment');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Comments</h2>
          <div className="overflow-y-auto h-64">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="my-2 p-2 bg-purple-secondary rounded-md text-light-text"
              >
                <p className="font-semibold">
                  {comment.author} {comment.sentiment && `(${comment.sentiment})`}
                </p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={handleInputChange}
              placeholder="Add a comment"
              className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
            />
            <button
              type="submit"
              className="mt-2 bg-purple-accent text-white p-2 rounded-md"
            >
              Post Comment
            </button>
          </form>
        </div>
      );
    }

    export default Comments;
