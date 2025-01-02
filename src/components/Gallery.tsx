import React from 'react';

    const images = [
      'https://raw.githubusercontent.com/Wde-Hosting/soundwave-nectar/main/images/image1.png',
      'https://raw.githubusercontent.com/Wde-Hosting/soundwave-nectar/main/images/image2.png',
      'https://raw.githubusercontent.com/Wde-Hosting/soundwave-nectar/main/images/image3.png',
      'https://raw.githubusercontent.com/Wde-Hosting/soundwave-nectar/main/images/image4.png',
    ];

    function Gallery() {
      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      );
    }

    export default Gallery;
