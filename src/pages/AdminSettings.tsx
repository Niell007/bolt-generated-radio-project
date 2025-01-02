import React, { useState, useEffect } from 'react';

    interface Settings {
      siteTitle: string;
      siteDescription: string;
    }

    function AdminSettings() {
      const [settings, setSettings] = useState<Settings>({ siteTitle: '', siteDescription: '' });
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      useEffect(() => {
        const fetchSettings = async () => {
          try {
            const response = await fetch('/settings');
            if (response.ok) {
              const data = await response.json();
              setSettings(data);
            } else {
              setError('Failed to fetch settings');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
          } finally {
            setLoading(false);
          }
        };

        fetchSettings();
      }, []);

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setSettings({ ...settings, [name]: value });
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
          const response = await fetch('/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
          });

          if (response.ok) {
            setSuccess('Settings updated successfully');
          } else {
            setError('Failed to update settings');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      };

      return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-accent">Manage Settings</h2>
          {loading ? (
            <p className="text-light-text">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="siteTitle" className="block mb-2 text-light-text">
                    Site Title
                  </label>
                  <input
                    type="text"
                    id="siteTitle"
                    name="siteTitle"
                    value={settings.siteTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="siteDescription" className="block mb-2 text-light-text">
                    Site Description
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-purple-accent hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
                >
                  Save Settings
                </button>
                {success && <p className="text-green-500 mt-2">{success}</p>}
              </form>
            </div>
          )}
        </div>
      );
    }

    export default AdminSettings;
