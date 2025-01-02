import React from 'react';
    import RadioPlayer from '../components/RadioPlayer';
    import Chatbot from '../components/Chatbot';
    import Comments from '../components/Comments';

    function Home() {
      return (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <RadioPlayer />
            </div>
            <div>
              <Chatbot />
            </div>
          </div>
          <div className="mt-4">
            {/* Placeholder for blog title, replace with actual data */}
            <Comments blogTitle="example-blog" />
          </div>
        </div>
      );
    }

    export default Home;
