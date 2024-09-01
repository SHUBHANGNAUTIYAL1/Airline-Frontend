
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo and Description */}
          <div className="w-[30%] md:w-1/3 mb-8 md:mb-0 px-10  ">
            <h2 className="text-3xl font-bold mb-4">Agriopti</h2>
            <p className="leading-relaxed">
              Optimizing agriculture through innovative solutions. Our goal is to help farmers maximize their yield and efficiency.
            </p>
          </div>

          {/* Contact Information */}
          <div className="w-[30%] md:w-1/3 flex flex-col items-center  mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="leading-relaxed">
              123 Farm Lane, Agri City, Country
            </p>
            <p className="leading-relaxed">
              Email: <a href="mailto:info@agriopti.com" className="text-blue-400 hover:text-blue-500">info@agriopti.com</a>
            </p>
            <p className="leading-relaxed">
              Phone: <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-500">+123 456 7890</a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-[30%]  flex flex-col items-center  md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="leading-relaxed">
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/projects" className="text-gray-400 hover:text-white">Projects</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

       {/* Social Media Icons */}
       <div className="flex justify-center mt-8 space-x-6">
          <a href="https://facebook.com" className="text-white hover:text-blue-500 ">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-white hover:text-blue-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-blue-500">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
  

        {/* Copyright Notice */}
        <div className="text-center mt-8">
          <p className="text-gray-400">&copy; 2024 Agriopti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
