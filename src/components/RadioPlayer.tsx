import React from 'react';

    function RadioPlayer() {
      return (
        <div className="bg-purple-accent text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Online Radio</h2>
          <audio controls className="w-full">
            <source src="#" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Now Playing</h3>
            <p>Track Name - Artist</p>
          </div>
        </div>
      );
    }

    export default RadioPlayer;
