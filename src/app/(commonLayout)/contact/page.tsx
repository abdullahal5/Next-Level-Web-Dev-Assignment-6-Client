"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Image from "next/image";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-green-400 mb-12 relative">
          Get in Touch
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-400" />
        </h1>

        <div className="bg-background rounded-2xl shadow-2xl overflow-hidden mb-8 border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-semibold text-green-400 mb-6">
                Contact Us
              </h2>
              <p className="text-foreground-600 mb-8">
                We&apos;d love to hear from you. Fill out the form, and soon as
                possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <FaEnvelope className="text-green-400 text-xl" />
                  </div>
                  <span className="text-foreground-700">
                    abdullahalfahin183@gmail.com
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <FaPhone className="text-green-400 text-xl" />
                  </div>
                  <span className="text-foreground-700">+880 1914 049327</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <FaMapMarkerAlt className="text-green-400 text-xl" />
                  </div>
                  <span className="text-foreground-700">Dhaka, Bangladesh</span>
                </div>
              </div>
              <div className="mt-12">
                <Image
                  alt="Contact illustration"
                  className="rounded-lg shadow-md w-full h-[200px] object-cover"
                  height={200}
                  src="https://i.ibb.co.com/Z6rWtjy/plants-gardening-tools-close-up.jpg"
                  width={300}
                />
              </div>
            </div>
            <div className="bg-primary/5 p-8 lg:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground-700 mb-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    required
                    className="block w-full rounded-md border-divider bg-background text-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary py-3 px-4"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground-700 mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    className="block w-full rounded-md border-divider bg-background text-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary py-3 px-4"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground-700 mb-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    className="block w-full rounded-md border-divider bg-background text-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary py-3 px-4"
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-green-400 text-green-400-foreground py-3 px-6 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                  type="submit"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
