import React, { useState } from 'react';

    function Search() {
      const [query, setQuery] = useState('');
      const [results, setResults] = useState<string[]>([]);

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (query.trim() === '') return;

        try {
          const response = await fetch('/ai/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
          });

          if (response.ok) {
            const data = await response.json();
            setResults(data.result); // Assuming the results are returned in 'result'
          } else {
            console.error('Failed to get search results');
            setResults(['No results found.']);
          }
        } catch (error) {
          console.error('Error:', error);
          setResults(['An error occurred while searching.']);
        }
      };

      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Search</h2>
          <form onSubmit={handleSubmit} className="flex mb-4">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Enter your search query"
              className="flex-grow p-2 border border-purple-accent rounded-l-md text-light-text bg-purple-secondary"
            />
            <button
              type="submit"
              className="bg-purple-accent text-white p-2 rounded-r-md"
            >
              Search
            </button>
          </form>
          <div>
            {results.map((result, index) => (
              <p key={index} className="text-light-text">
                {result}
              </p>
            ))}
          </div>
        </div>
      );
    }

    export default Search;
