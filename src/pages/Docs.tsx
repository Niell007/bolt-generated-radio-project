import React from 'react';

    function Docs() {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-purple-accent">Documentation</h1>

          {/* Environment Setup Guide */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Environment Setup Guide</h2>
            <p className="text-light-text">
              To set up the development environment, you'll need to have Node.js and npm installed on your machine. You'll also need a Cloudflare account to use Cloudflare Workers and KV storage.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Installation Steps</h3>
            <ol className="list-decimal list-inside text-light-text">
              <li>Install Node.js and npm from <a href="https://nodejs.org/" className="text-purple-accent" target="_blank" rel="noopener noreferrer">https://nodejs.org/</a>.</li>
              <li>Clone the project repository: <code className="bg-gray-700 p-1 rounded">git clone [repository URL]</code></li>
              <li>Navigate to the project directory: <code className="bg-gray-700 p-1 rounded">cd [project directory]</code></li>
              <li>Install the dependencies: <code className="bg-gray-700 p-1 rounded">npm install</code></li>
              <li>Create a Cloudflare account and install the Wrangler CLI: <code className="bg-gray-700 p-1 rounded">npm install -g wrangler</code></li>
              <li>Authenticate Wrangler with your Cloudflare account: <code className="bg-gray-700 p-1 rounded">wrangler login</code></li>
            </ol>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Configuration</h3>
            <p className="text-light-text">
              Configure your Cloudflare Workers and KV storage by updating the <code className="bg-gray-700 p-1 rounded">wrangler.toml</code> file with your account ID and KV namespace bindings. You'll also need to set up the AI bindings for Workers AI.
            </p>
          </div>

          {/* Project Initialization Guide */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Project Initialization Guide</h2>
            <p className="text-light-text">
              After setting up the environment, initialize the project by running the following commands:
            </p>
            <ol className="list-decimal list-inside text-light-text">
              <li>Start the development server: <code className="bg-gray-700 p-1 rounded">npm run dev</code></li>
              <li>This will start the Vite development server, and you can view the application in your browser at <code className="bg-gray-700 p-1 rounded">http://localhost:3000</code>.</li>
              <li>To start the Cloudflare Workers development server, run: <code className="bg-gray-700 p-1 rounded">npm run pages:dev</code></li>
              <li>This will start the Wrangler development server, and you can test the Workers and KV storage functionalities.</li>
            </ol>
          </div>

          {/* Component Development Guide */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Component Development Guide</h2>
            <p className="text-light-text">
              This section provides an overview of the main React components in the application and their functionalities.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Components</h3>
            <ul className="list-disc list-inside text-light-text">
              <li>
                <strong className="text-purple-accent">RadioPlayer</strong>: Displays the online radio player. It allows users to play and control the radio stream.
              </li>
              <li>
                <strong className="text-purple-accent">Chatbot</strong>: Integrates a chatbot using Workers AI to generate responses to user messages.
              </li>
              <li>
                <strong className="text-purple-accent">Comments</strong>: Displays comments for a specific blog post and allows users to post new comments. It also analyzes the sentiment of comments using Workers AI.
              </li>
              <li>
                <strong className="text-purple-accent">BlogList</strong>: Fetches and displays a list of blogs from KV storage.
              </li>
              <li>
                <strong className="text-purple-accent">BookingForm</strong>: Allows users to book appointments.
              </li>
              <li>
                <strong className="text-purple-accent">Gallery</strong>: Displays a gallery of images.
              </li>
              <li>
                <strong className="text-purple-accent">About</strong>: Provides information about the online radio station.
              </li>
              <li>
                <strong className="text-purple-accent">AdminPanel</strong>: Allows administrators to manage content and users.
              </li>
              <li>
                <strong className="text-purple-accent">UserPanel</strong>: Allows users to manage their profiles.
              </li>
              <li>
                <strong className="text-purple-accent">Navbar</strong>: Provides navigation links to different sections of the application.
              </li>
              <li>
                <strong className="text-purple-accent">Search</strong>: Allows users to search the site content using Workers AI.
              </li>
              <li>
                <strong className="text-purple-accent">CreateBlogForm</strong>: Allows administrators to create new blog posts.
              </li>
            </ul>
          </div>

          {/* Integration Steps */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Integration Steps</h2>
            <p className="text-light-text">
              This section provides detailed instructions on how to integrate the frontend with the Cloudflare Workers backend.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">API Endpoints Overview</h3>
            <p className="text-light-text">
              The Cloudflare Worker exposes the following API endpoints:
            </p>
            <ul className="list-disc list-inside text-light-text">
              <li>
                <code className="bg-gray-700 p-1 rounded">/ai/translate</code>: Translates text using the specified target language.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/ai/summarize</code>: Generates a summary of the provided text.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/ai/sentiment</code>: Analyzes the sentiment of the provided text.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/ai/search</code>: Performs a search query using Workers AI.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/ai/generate-content</code>: Generates content based on the provided prompt.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/ai/process-data</code>: Processes data using Workers AI.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/files/upload</code>: Uploads a file and its metadata.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/files/:filename</code>: Retrieves a file and its metadata.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/users/create</code>: Creates a new user.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/users/:username</code>: Retrieves user data.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/content/blogs</code>: Creates a new blog.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/content/blogs/:title</code>: Retrieves a blog.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/content/comments</code>: Creates a new comment.
              </li>
              <li>
                <code className="bg-gray-700 p-1 rounded">/content/comments/:blogTitle/:author</code>: Retrieves a comment.
              </li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Frontend Integration</h3>
            <p className="text-light-text">
              To make API calls from the React components to the Cloudflare Worker endpoints, use the <code className="bg-gray-700 p-1 rounded">fetch</code> API. For example, to fetch the list of blogs, you can use the following code in your component:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-javascript">
                {`
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
                `}
              </code>
            </pre>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Authentication and Authorization</h3>
            <p className="text-light-text">
              To handle user authentication, you can use JWT (JSON Web Tokens). When a user logs in, generate a JWT and store it in the user's browser (e.g., in local storage or a cookie). For subsequent requests, include the JWT in the <code className="bg-gray-700 p-1 rounded">Authorization</code> header.
            </p>
            <p className="text-light-text">
              For role-based access control, you can include the user's role in the JWT payload. In your Cloudflare Worker, verify the JWT and check the user's role before allowing access to protected resources or operations.
            </p>
          </div>

          {/* Deployment Procedures */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Deployment Procedures</h2>
            <p className="text-light-text">
              This section provides a step-by-step guide on how to deploy the application to Cloudflare Pages.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Build the Frontend</h3>
            <p className="text-light-text">
              Before deploying, you need to build the React frontend for production. Run the following command in the project directory:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-bash">
                npm run build
              </code>
            </pre>
            <p className="text-light-text">
              This will create a <code className="bg-gray-700 p-1 rounded">dist</code> directory with the production-ready files.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Deploy to Cloudflare Pages</h3>
            <p className="text-light-text">
              To deploy the application to Cloudflare Pages, use the Wrangler CLI. Run the following command in the project directory:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-bash">
                npm run pages:deploy
              </code>
            </pre>
            <p className="text-light-text">
              This will upload the contents of the <code className="bg-gray-700 p-1 rounded">dist</code> directory to Cloudflare Pages.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Configure the Project</h3>
            <p className="text-light-text">
              After deploying, you may need to configure the project settings in the Cloudflare Pages dashboard:
            </p>
            <ol className="list-decimal list-inside text-light-text">
              <li>Log in to the Cloudflare dashboard and select your account.</li>
              <li>Go to <strong className="text-purple-accent">Workers & Pages</strong> and select your project.</li>
              <li>Go to <strong className="text-purple-accent">Settings</strong> &gt; <strong className="text-purple-accent">Functions</strong> and configure the compatibility date and any environment variables or KV bindings.</li>
              <li>You can also set up custom domains and other settings as needed.</li>
            </ol>
            <p className="text-light-text">
              For more information, refer to the <a href="https://developers.cloudflare.com/pages/" className="text-purple-accent" target="_blank" rel="noopener noreferrer">Cloudflare Pages documentation</a>.
            </p>
          </div>

          {/* Testing Guidelines */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Testing Guidelines</h2>
            <p className="text-light-text">
              This section provides information on how to test the application, including unit testing, integration testing, and user acceptance testing.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Unit Testing</h3>
            <p className="text-light-text">
              Unit tests are used to test individual components or functions in isolation. You can use a testing framework like <a href="https://jestjs.io/" className="text-purple-accent" target="_blank" rel="noopener noreferrer">Jest</a> along with a testing library like <a href="https://testing-library.com/docs/react-testing-library/intro/" className="text-purple-accent" target="_blank" rel="noopener noreferrer">React Testing Library</a> to write unit tests for your React components.
            </p>
            <p className="text-light-text">
              Example of a simple unit test for a React component:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-javascript">
                {`
  import { render, screen } from '@testing-library/react';
  import App from './App';

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
                `}
              </code>
            </pre>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Integration Testing</h3>
            <p className="text-light-text">
              Integration tests are used to test the interaction between different parts of the application. You can use the same testing tools as for unit testing, but the focus is on testing multiple components working together.
            </p>
            <p className="text-light-text">
              Example of an integration test for the interaction between the frontend and the Cloudflare Worker:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-javascript">
                {`
  import { render, screen, waitFor } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import App from './App';

  test('fetches and displays blogs', async () => {
    render(<App />);
    
    // Wait for the blogs to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Latest Blogs')).toBeInTheDocument();
    });

    // Check if a blog title is displayed
    expect(screen.getByText('Blog Title 1')).toBeInTheDocument();
  });
                `}
              </code>
            </pre>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">User Acceptance Testing (UAT)</h3>
            <p className="text-light-text">
              User Acceptance Testing is performed to ensure that the application meets the requirements and is acceptable to the end-users. This typically involves manual testing of the application's features and workflows.
            </p>
            <p className="text-light-text">
              Here are some example UAT scenarios for the online radio station application:
            </p>
            <ul className="list-disc list-inside text-light-text">
              <li>Verify that the radio player can play and pause the stream.</li>
              <li>Test the chatbot's ability to respond to user messages.</li>
              <li>Verify that users can post comments on blog posts.</li>
              <li>Test the search functionality to ensure it returns relevant results.</li>
              <li>Verify that the admin can create and manage blog posts.</li>
            </ul>
          </div>

          {/* Code Snippets */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Code Snippets</h2>
            <p className="text-light-text">
              This section provides useful code snippets for common tasks and functionalities in the application.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Fetching Data from Cloudflare Worker</h3>
            <p className="text-light-text">
              You can use the <code className="bg-gray-700 p-1 rounded">fetch</code> API to make requests to your Cloudflare Worker endpoints. Here's an example of how to fetch a list of blogs:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-javascript">
                {`
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
                `}
              </code>
            </pre>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Handling Form Input Changes</h3>
            <p className="text-light-text">
              Here's an example of how to handle input changes in a form using React's <code className="bg-gray-700 p-1 rounded">useState</code> hook:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-javascript">
                {`
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // ...

  <input
    type="text"
    value={inputValue}
    onChange={handleInputChange}
  />
                `}
              </code>
            </pre>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Using Cloudflare Workers AI</h3>
            <p className="text-light-text">
              Here's an example of how to use the Cloudflare Workers AI to generate a response in the chatbot:
            </p>
            <pre className="bg-gray-700 p-2 rounded text-light-text">
              <code className="language-javascript">
                {`
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: newMessage };
    setMessages([...messages, userMessage]);
    setNewMessage('');

    try {
      const response = await fetch('/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: newMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { sender: 'bot', text: data.result };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error('Failed to get bot response');
        const botMessage = {
          sender: 'bot',
          text: 'Sorry, I could not process your request.',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const botMessage = {
        sender: 'bot',
        text: 'Sorry, an error occurred.',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };
                `}
              </code>
            </pre>
          </div>

          {/* Troubleshooting Guide */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg  mb-8">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Troubleshooting Guide</h2>
            <p className="text-light-text">
              This section provides solutions to common issues that you may encounter while developing or using the application.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Failed to Fetch Data</h3>
            <p className="text-light-text">
              If you encounter issues with fetching data from the Cloudflare Worker, check the following:
            </p>
            <ul className="list-disc list-inside text-light-text">
              <li>Ensure that the Cloudflare Worker is running and properly deployed.</li>
              <li>Check the browser's developer console for any error messages related to the fetch request.</li>
              <li>Verify that the API endpoint URL is correct and matches the route defined in the Cloudflare Worker.</li>
              <li>Check if there are any issues with CORS (Cross-Origin Resource Sharing) that may be blocking the request.</li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Error: "Module not found"</h3>
            <p className="text-light-text">
              If you see an error message indicating that a module cannot be found, try the following steps:
            </p>
            <ul className="list-disc list-inside text-light-text">
              <li>Ensure that you have installed all the required dependencies by running <code className="bg-gray-700 p-1 rounded">npm install</code>.</li>
              <li>Check if there are any typos in the import statements or file paths.</li>
              <li>
                If you are using a third-party library, make sure it is included in your <code className="bg-gray-700 p-1 rounded">package.json</code> and properly installed.
              </li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Application Not Updating After Deployment</h3>
            <p className="text-light-text">
              If the application does not reflect the latest changes after deployment, try the following:
            </p>
            <ul className="list-disc list-inside text-light-text">
              <li>Clear your browser cache or perform a hard refresh (Ctrl+Shift+R or Cmd+Shift+R).</li>
              <li>Ensure that the latest version of your code is deployed to Cloudflare Pages.</li>
              <li>Check if there are any caching mechanisms in place that may be serving outdated content.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-light-text">Best Practices</h2>
            <p className="text-light-text">
              This section provides recommendations for coding standards, security considerations, and performance optimization when working with the application.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Coding Standards</h3>
            <ul className="list-disc list-inside text-light-text">
              <li>Follow the <a href="https://react.dev/learn" className="text-purple-accent" target="_blank" rel="noopener noreferrer">React documentation</a> and best practices for writing React components.</li>
              <li>Use meaningful variable and function names to improve code readability.</li>
              <li>Keep components small and focused on a single responsibility.</li>
              <li>Use comments to explain complex logic or decisions.</li>
              <li>Format your code consistently using a tool like <a href="https://prettier.io/" className="text-purple-accent" target="_blank" rel="noopener noreferrer">Prettier</a>.</li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Security Considerations</h3>
            <ul className="list-disc list-inside text-light-text">
              <li>Sanitize user inputs to prevent Cross-Site Scripting (XSS) attacks.</li>
              <li>
                Use HTTPS to encrypt data transmitted between the client and the server.
              </li>
              <li>
                Store sensitive information, such as API keys and secrets, in environment variables and do not commit them to version control.
              </li>
              <li>
                Regularly update dependencies to patch known security vulnerabilities.
              </li>
              <li>
                Implement proper authentication and authorization mechanisms to protect sensitive data and functionality.
              </li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2 text-light-text">Performance Optimization</h3>
            <ul className="list-disc list-inside text-light-text">
              <li>
                Optimize the size of static assets (images, CSS, JavaScript) to reduce page load times.
              </li>
              <li>
                Use lazy loading for components and images that are not immediately visible on the screen.
              </li>
              <li>
                Leverage browser caching to reduce the number of requests to the server.
              </li>
              <li>
                Minimize the use of large JavaScript libraries and frameworks if they are not necessary.
              </li>
              <li>
                Monitor the application's performance using tools like <a href="https://pagespeed.web.dev/" className="text-purple-accent" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a> and <a href="https://developer.chrome.com/docs/devtools" className="text-purple-accent" target="_blank" rel="noopener noreferrer">Chrome DevTools</a>.
              </li>
            </ul>
          </div>
        </div>
      );
    }

    export default Docs;
