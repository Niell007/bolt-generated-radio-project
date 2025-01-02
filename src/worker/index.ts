import { Ai } from '@cloudflare/ai';
    import { Hono } from 'hono';
    import { cors } from 'hono/cors';
    import { jwt } from 'hono/jwt'

    type Bindings = {
      AI: any;
      AI_MODEL_TRANSLATE: string;
      AI_MODEL_SUMMARIZE: string;
      AI_MODEL_SENTIMENT: string;
      AI_MODEL_SEARCH: string;
      AI_MODEL_GENERATE_CONTENT: string;
      AI_MODEL_PROCESS_DATA: string;
      METADATA_STORAGE: KVNamespace;
      USER_DATA: KVNamespace;
      FILE_STORAGE: KVNamespace;
      JWT_SECRET: string;
    };

    const app = new Hono<{ Bindings: Bindings }>();

    app.use('*', cors());

    app.get('/', (c) => c.text('Welcome to Cloudflare Workers!'));

    // JWT Middleware for Admin Routes
    app.use('/admin/*', async (c, next) => {
      const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
        cookie: 'jwt_token', // Optional: if you want to use cookies
      });
      return jwtMiddleware(c, next);
    });

    // AI Endpoints

    app.post('/ai/translate', async (c) => {
      try {
        const ai = new Ai(c.env.AI);
        const { text, targetLanguage } = await c.req.json();

        const inputs = {
          text,
          target_lang: targetLanguage,
        };

        const response = await ai.run(c.env.AI_MODEL_TRANSLATE, inputs);
        return c.json(response);
      } catch (error) {
        console.error('Error in /ai/translate:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/ai/summarize', async (c) => {
      try {
        const ai = new Ai(c.env.AI);
        const { text } = await c.req.json();

        const inputs = {
          text,
        };

        const response = await ai.run(c.env.AI_MODEL_SUMMARIZE, inputs);
        return c.json(response);
      } catch (error) {
        console.error('Error in /ai/summarize:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/ai/sentiment', async (c) => {
      try {
        const ai = new Ai(c.env.AI);
        const { text } = await c.req.json();

        const inputs = {
          text,
        };

        const response = await ai.run(c.env.AI_MODEL_SENTIMENT, inputs);
        return c.json(response);
      } catch (error) {
        console.error('Error in /ai/sentiment:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/ai/search', async (c) => {
      try {
        const ai = new Ai(c.env.AI);
        const { query } = await c.req.json();

        const inputs = {
          text: query,
        };

        const response = await ai.run(c.env.AI_MODEL_SEARCH, inputs);
        return c.json(response);
      } catch (error) {
        console.error('Error in /ai/search:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/ai/generate-content', async (c) => {
      try {
        const ai = new Ai(c.env.AI);
        const { prompt } = await c.req.json();

        const inputs = {
          text: prompt,
        };

        const response = await ai.run(c.env.AI_MODEL_GENERATE_CONTENT, inputs);
        return c.json(response);
      } catch (error) {
        console.error('Error in /ai/generate-content:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/ai/process-data', async (c) => {
      try {
        const ai = new Ai(c.env.AI);
        const { data } = await c.req.json();

        const inputs = {
          text: data,
        };

        const response = await ai.run(c.env.AI_MODEL_PROCESS_DATA, inputs);
        return c.json(response);
      } catch (error) {
        console.error('Error in /ai/process-data:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    // Content Management Endpoints

    app.post('/content/blogs', async (c) => {
      try {
        const { title, content } = await c.req.json();

        // Validate blog data
        if (!title || !content) {
          return c.json({ error: 'Title and content are required' }, 400);
        }

        // Store blog data in KV storage
        const blogKey = `blogs/${title}`;
        console.log('Storing blog with key:', blogKey);
        await c.env.METADATA_STORAGE.put(blogKey, JSON.stringify({ title, content }));

        return c.json({ message: 'Blog created successfully' });
      } catch (error) {
        console.error('Error in /content/blogs (POST):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.get('/content/blogs/:title', async (c) => {
      try {
        const title = c.req.param('title');

        // Retrieve blog data from KV storage
        const blogKey = `blogs/${title}`;
        console.log('Retrieving blog with key:', blogKey);
        const blog = await c.env.METADATA_STORAGE.get(blogKey);

        if (!blog) {
          return c.json({ error: 'Blog not found' }, 404);
        }

        return c.json(JSON.parse(blog));
      } catch (error) {
        console.error('Error in /content/blogs/:title (GET):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.put('/content/blogs/:title', async (c) => {
      try {
        const title = c.req.param('title');
        const { content } = await c.req.json();

        // Validate blog data
        if (!content) {
          return c.json({ error: 'Content is required' }, 400);
        }

        // Update blog data in KV storage
        const blogKey = `blogs/${title}`;
        console.log('Updating blog with key:', blogKey);
        await c.env.METADATA_STORAGE.put(blogKey, JSON.stringify({ title, content }));

        return c.json({ message: 'Blog updated successfully' });
      } catch (error) {
        console.error('Error in /content/blogs/:title (PUT):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.delete('/content/blogs/:title', async (c) => {
      try {
        const title = c.req.param('title');

        // Delete blog data from KV storage
        const blogKey = `blogs/${title}`;
        console.log('Deleting blog with key:', blogKey);
        await c.env.METADATA_STORAGE.delete(blogKey);

        return c.json({ message: 'Blog deleted successfully' });
      } catch (error) {
        console.error('Error in /content/blogs/:title (DELETE):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/content/comments', async (c) => {
      try {
        const { blogTitle, author, text } = await c.req.json();

        // Validate comment data
        if (!blogTitle || !author || !text) {
          return c.json({ error: 'Blog title, author, and text are required' }, 400);
        }

        // Store comment data in KV storage
        const commentKey = `comments/${blogTitle}/${author}`;
        console.log('Storing comment with key:', commentKey);
        await c.env.METADATA_STORAGE.put(
          commentKey,
          JSON.stringify({ blogTitle, author, text, approved: false }) // Add approved status
        );

        return c.json({ message: 'Comment created successfully' });
      } catch (error) {
        console.error('Error in /content/comments (POST):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.get('/content/comments/:blogTitle/:author', async (c) => {
      try {
        const blogTitle = c.req.param('blogTitle');
        const author = c.req.param('author');

        // Retrieve comment data from KV storage
        const commentKey = `comments/${blogTitle}/${author}`;
        console.log('Retrieving comment with key:', commentKey);
        const comment = await c.env.METADATA_STORAGE.get(commentKey);

        if (!comment) {
          return c.json({ error: 'Comment not found' }, 404);
        }

        return c.json(JSON.parse(comment));
      } catch (error) {
        console.error('Error in /content/comments/:blogTitle/:author (GET):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.put('/content/comments/:blogTitle/:author', async (c) => {
      try {
        const blogTitle = c.req.param('blogTitle');
        const author = c.req.param('author');
        const { text, approved } = await c.req.json();

        // Validate comment data
        if (!text || approved === undefined) {
          return c.json({ error: 'Text and approved status are required' }, 400);
        }

        // Update comment data in KV storage
        const commentKey = `comments/${blogTitle}/${author}`;
        console.log('Updating comment with key:', commentKey);
        await c.env.METADATA_STORAGE.put(
          commentKey,
          JSON.stringify({ blogTitle, author, text, approved })
        );

        return c.json({ message: 'Comment updated successfully' });
      } catch (error) {
        console.error('Error in /content/comments/:blogTitle/:author (PUT):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.delete('/content/comments/:blogTitle/:author', async (c) => {
      try {
        const blogTitle = c.req.param('blogTitle');
        const author = c.req.param('author');

        // Delete comment data from KV storage
        const commentKey = `comments/${blogTitle}/${author}`;
        console.log('Deleting comment with key:', commentKey);
        await c.env.METADATA_STORAGE.delete(commentKey);

        return c.json({ message: 'Comment deleted successfully' });
      } catch (error) {
        console.error('Error in /content/comments/:blogTitle/:author (DELETE):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    // User Management Endpoints

    app.get('/users', async (c) => {
      try {
        // Retrieve all users from KV storage
        console.log('Retrieving all users');
        const users = await c.env.USER_DATA.list();
        const userList = await Promise.all(
          users.keys.map(async (key) => {
            const user = await c.env.USER_DATA.get(key.name);
            return JSON.parse(user);
          })
        );

        return c.json(userList);
      } catch (error) {
        console.error('Error in /users (GET):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.post('/users', async (c) => {
      try {
        const { username, password, role } = await c.req.json();

        // Validate user data
        if (!username || !password || !role) {
          return c.json({ error: 'Username, password, and role are required' }, 400);
        }

        // Store user data in KV storage
        const userKey = `users/${username}`;
        console.log('Storing user with key:', userKey);
        await c.env.USER_DATA.put(userKey, JSON.stringify({ username, password, role }));

        return c.json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error in /users (POST):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.put('/users/:username', async (c) => {
      try {
        const username = c.req.param('username');
        const { password, role } = await c.req.json();

        // Validate user data
        if (!password || !role) {
          return c.json({ error: 'Password and role are required' }, 400);
        }

        // Update user data in KV storage
        const userKey = `users/${username}`;
        console.log('Updating user with key:', userKey);
        await c.env.USER_DATA.put(userKey, JSON.stringify({ username, password, role }));

        return c.json({ message: 'User updated successfully' });
      } catch (error) {
        console.error('Error in /users/:username (PUT):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.delete('/users/:username', async (c) => {
      try {
        const username = c.req.param('username');

        // Delete user data from KV storage
        const userKey = `users/${username}`;
        console.log('Deleting user with key:', userKey);
        await c.env.USER_DATA.delete(userKey);

        return c.json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error in /users/:username (DELETE):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    // File Management Endpoints

    app.post('/files/upload', async (c) => {
      try {
        const formData = await c.req.formData();
        const file = formData.get('file') as unknown as File;

        if (!file) {
          return c.json({ error: 'File is required' }, 400);
        }

        // Store file in KV storage
        const fileKey = `files/${file.name}`;
        console.log('Storing file with key:', fileKey);
        await c.env.FILE_STORAGE.put(fileKey, await file.arrayBuffer());

        return c.json({ message: 'File uploaded successfully', url: `/files/${file.name}` });
      } catch (error) {
        console.error('Error in /files/upload (POST):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.get('/files/:filename', async (c) => {
      try {
        const filename = c.req.param('filename');

        // Retrieve file from KV storage
        const fileKey = `files/${filename}`;
        console.log('Retrieving file with key:', fileKey);
        const file = await c.env.FILE_STORAGE.get(fileKey, { type: 'arrayBuffer' });

        if (!file) {
          return c.json({ error: 'File not found' }, 404);
        }

        return new Response(file, {
          headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${filename}"`,
          },
        });
      } catch (error) {
        console.error('Error in /files/:filename (GET):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.delete('/files/:filename', async (c) => {
      try {
        const filename = c.req.param('filename');

        // Delete file from KV storage
        const fileKey = `files/${filename}`;
        console.log('Deleting file with key:', fileKey);
        await c.env.FILE_STORAGE.delete(fileKey);

        return c.json({ message: 'File deleted successfully' });
      } catch (error) {
        console.error('Error in /files/:filename (DELETE):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.get('/files', async (c) => {
      try {
        // List all files from KV storage
        console.log('Listing all files');
        const files = await c.env.FILE_STORAGE.list();
        const fileList = files.keys.map((key) => ({
          name: key.name.replace('files/', ''),
          url: `/files/${key.name.replace('files/', '')}`,
        }));

        return c.json(fileList);
      } catch (error) {
        console.error('Error in /files (GET):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    // Settings Management Endpoints

    app.get('/settings', async (c) => {
      try {
        // Retrieve settings from KV storage
        const settingsKey = 'settings';
        console.log('Retrieving settings with key:', settingsKey);
        const settings = await c.env.METADATA_STORAGE.get(settingsKey);

        if (!settings) {
          return c.json({ siteTitle: '', siteDescription: '' });
        }

        return c.json(JSON.parse(settings));
      } catch (error) {
        console.error('Error in /settings (GET):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    app.put('/settings', async (c) => {
      try {
        const { siteTitle, siteDescription } = await c.req.json();

        // Validate settings data
        if (!siteTitle || !siteDescription) {
          return c.json({ error: 'Site title and description are required' }, 400);
        }

        // Update settings in KV storage
        const settingsKey = 'settings';
        console.log('Updating settings with key:', settingsKey);
        await c.env.METADATA_STORAGE.put(settingsKey, JSON.stringify({ siteTitle, siteDescription }));

        return c.json({ message: 'Settings updated successfully' });
      } catch (error) {
        console.error('Error in /settings (PUT):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    // Authentication Endpoints
    app.post('/auth/login', async (c) => {
      try {
        const { username, password } = await c.req.json();
    
        // Validate user credentials
        if (!username || !password) {
          return c.json({ error: 'Username and password are required' }, 400);
        }
    
        // Retrieve user data from KV storage
        const userKey = `users/${username}`;
        const user = await c.env.USER_DATA.get(userKey);
    
        if (!user) {
          return c.json({ error: 'Invalid credentials' }, 401);
        }
    
        const userData = JSON.parse(user);
    
        // Check if the user is an admin
        if (userData.role !== 'admin') {
          return c.json({ error: 'Unauthorized' }, 403);
        }
    
        // Verify password (replace this with proper password hashing in production)
        if (password !== userData.password) {
          return c.json({ error: 'Invalid credentials' }, 401);
        }
    
        // Generate JWT
        const secret = c.env.JWT_SECRET;
        const token = await jwt.sign({ username, role: userData.role }, secret);
    
        // Set JWT as HttpOnly cookie (optional)
        c.cookie('jwt_token', token, {
          httpOnly: true,
          secure: true, // Use 'secure' in production
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });
    
        return c.json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error in /auth/login (POST):', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
    });

    export default app;
