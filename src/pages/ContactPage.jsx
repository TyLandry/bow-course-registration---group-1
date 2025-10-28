
import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save message to localStorage for admin to view
    const prevMessages = JSON.parse(localStorage.getItem('submittedMessages') || '[]');
    const newMessage = {
      ...formData,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'New',
      id: Date.now(),
      messagePreview: formData.message.slice(0, 40) + (formData.message.length > 40 ? '...' : ''),
      fullMessage: formData.message,
    };
    localStorage.setItem('submittedMessages', JSON.stringify([newMessage, ...prevMessages]));
    alert('Message sent successfully!');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 lg:gap-6 py-6 lg:py-10 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold">Contact Admin</h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Send your inquiries or messages to the system administrator.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mt-8 lg:mt-20 justify-center w-full max-w-6xl px-4">
        {/* Left section */}
        <div className="flex flex-col self-center max-w-md w-full lg:w-auto">
          <h1 className="text-2xl lg:text-3xl font-bold">Contact the Admin</h1>
          <p className="mt-4">
            Have questions about course registration, technical issues, or need
            assistance with your account? Use this form to send a direct message
            to the system administrator. We'll get back to you as soon as
            possible to help resolve any concerns.
          </p>
        </div>

        {/* Right section */}
        <div className="flex flex-col w-full lg:w-auto">{" "}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block mt-2 font-semibold">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="border border-gray-400 rounded-md px-3 py-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" required />

            <label className="block mt-4 font-semibold">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" className="border border-gray-400 rounded-md px-3 py-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" required />

            <label className="block mt-4 font-semibold">Phone Number (optional)</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" className="border border-gray-400 rounded-md px-3 py-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" />

            <label className="block mt-4 font-semibold">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Enter the subject of your message" className="border border-gray-400 rounded-md px-3 py-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" required />

            <label className="block mt-4 font-semibold">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Type your message here" rows="4" className="border border-gray-400 rounded-md px-3 py-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 resize-vertical" required></textarea>
            <p className="font-extralight text-gray-600 mb-4">
              Please provide as much detail as possible
            </p>

            <div className="flex gap-4 mt-6">
              <button type="submit" className="btn-primary-fill py-2 px-4 text-sm">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
