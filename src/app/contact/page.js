// src/app/contact/page.js
"use client"; // Required for forms and state in Next.js App Router

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to connect to the server.' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-gray-600">Have a project in mind or just want to say hi? Send me a message!</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border">
        {status.success ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-lg text-center font-medium">
            Thanks for reaching out! I'll get back to you as soon as possible.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                required rows="5" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            
            {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
            
            <button 
              type="submit" disabled={status.loading}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}