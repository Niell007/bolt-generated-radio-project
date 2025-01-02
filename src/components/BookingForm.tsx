import React, { useState } from 'react';

    function BookingForm() {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });

      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Booking Form Data:', formData);
        // Here you would typically send the data to your backend
      };

      return (
        <div className="bg-dark-bg p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-accent">Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-light-text">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-light-text">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-light-text">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border border-purple-accent rounded-md text-light-text bg-purple-secondary"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-accent text-white p-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }

    export default BookingForm;
