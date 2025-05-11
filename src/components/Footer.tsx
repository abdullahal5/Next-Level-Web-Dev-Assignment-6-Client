/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { BsInstagram, BsMailbox, BsPhone } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { CiMapPin } from "react-icons/ci";

import { TwitterIcon } from "./icons";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 mt-20 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Green Thumb Gardens</h3>
            <p className="text-gray-700 dark:text-green-100">
              Cultivating beauty and sustainability in every garden. Join us in
              our mission to make the world a greener place, one plant at a
              time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:text-green-600 dark:hover:text-green-300 transition-colors"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-600 dark:hover:text-green-300 transition-colors"
                  href="/imagegallery"
                >
                  Image gallery
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-600 dark:hover:text-green-300 transition-colors"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CiMapPin className="w-5 h-5 mr-2" />
                <span>123 Garden Street, Green City, 12345</span>
              </li>
              <li className="flex items-center">
                <BsPhone className="w-5 h-5 mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <BsMailbox className="w-5 h-5 mr-2" />
                <span>info@greenthumbgardens.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Join Our Newsletter</h3>
            <p className="mb-4 text-gray-700 dark:text-green-100">
              Stay updated with our latest gardening tips and offers!
            </p>
            <form className="space-y-2">
              <Input
                className="bg-gray-300 dark:bg-green-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-green-300 border-gray-400 dark:border-green-600 focus:border-gray-500 dark:focus:border-green-500"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="w-full bg-green-500 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500 text-white"
                type="submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-400 dark:border-green-700">
          <div className="flex justify-center space-x-6">
            <a
              className="text-gray-600 dark:text-green-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              href="#"
            >
              <span className="sr-only">Facebook</span>
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              className="text-gray-600 dark:text-green-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              href="#"
            >
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="w-6 h-6" />
            </a>
            <a
              className="text-gray-600 dark:text-green-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              href="#"
            >
              <span className="sr-only">Instagram</span>
              <BsInstagram className="w-6 h-6" />
            </a>
          </div>
          <p className="mt-4 text-center text-gray-700 dark:text-green-300">
            &copy; {new Date().getFullYear()} Green Thumb Gardens. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
