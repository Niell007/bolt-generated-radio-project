import React, { useState, useEffect } from 'react';

    interface MediaFile {
      name: string;
      url: string;
    }

    function AdminMedia() {
      const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [newFile, setNewFile] = useState<File | null>(null);

      useEffect(() => {
        const fetchMediaFiles = async () => {
          try {
            const response = await fetch('/files');
            if (response.ok) {
              const data = await response.json();
              setMediaFiles(data);
            } else {
              setError('Failed to fetch media files');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
          } finally {
            setLoading(false);
          }
        };

        fetchMediaFiles();
      }, []);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setNewFile(event.target.files[0]);
        }
      };

      const handleUpload = async () => {
        if (!newFile) {
          setError('Please select a file to upload');
          return;
        }

        try {
          const formData = new FormData();
          formData.append('file', newFile);

          const response = await fetch('/files/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setMediaFiles([...mediaFiles, { name: newFile.name, url: data.url }]);
            setNewFile(null);
          } else {
            setError('Failed to upload file');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      const handleDelete = async (name: string) => {
        try {
          const response = await fetch(`/files/${name}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setMediaFiles(mediaFiles.filter((file) => file.name !== name));
          } else {
            setError('Failed to delete file');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-accent">Manage Media</h2>
          <div className="mb-4">
            <input type="file" onChange={handleFileChange} className="mb-2" />
            <button
              className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
          {loading ? (
            <p className="text-light-text">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
              <table className="w-full text-light-text">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Preview</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaFiles.map((file) => (
                    <tr key={file.name}>
                      <td>{file.name}</td>
                      <td>
                        <img src={file.url} alt={file.name} className="h-16" />
                      </td>
                      <td className="text-right">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(file.name)}
                        >
                          Delete
                        </button>
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

    export default AdminMedia;
