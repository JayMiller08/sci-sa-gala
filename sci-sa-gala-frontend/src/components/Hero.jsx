/**
 * Hero Section Component for SCI-SA Gala
 * Elegant landing banner with gala imagery and professional styling
 */

import { Link } from 'react-router-dom';
import { galaImages } from '../assets/images.js';

/**
 * Hero component with styled gala background
 * @returns {JSX.Element} - Hero section component
 */
export default function Hero() {
  const currentYear = new Date().getFullYear();

  return (
    <section 
      className="hero-bg min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${galaImages.ballroom})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="hero-overlay absolute inset-0"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-gold-400 rounded-full mr-2 animate-pulse"></span>
          Premium Event Experience
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block gradient-text bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">
            SCI-SA Gala
          </span>
          <span className="block text-gold-400 text-3xl md:text-4xl font-light">
            {currentYear}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-200 mb-2 max-w-2xl mx-auto leading-relaxed">
          An Evening of Excellence and Celebration
        </p>
        <p className="text-lg text-gray-300 mb-12 max-w-xl mx-auto">
          Join us for an unforgettable night of sophistication, networking, and celebration
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-gold-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg"
          >
            Enter Dashboard
          </Link>
          
          <Link
            to="/login"
            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-white/20 transition-all duration-300 from-gold-500 to-gold-600 bg-clip-text text-transparent"
          >
            Sign In
          </Link>
        </div>
        
        {/* Event details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-gold-400 text-3xl mb-2">🎭</div>
            <h3 className="text-lg font-semibold text-white mb-2">Formal Attire</h3>
            <p className="text-gray-300 text-sm">Black tie required for all attendees</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-gold-400 text-3xl mb-2">🍾</div>
            <h3 className="text-lg font-semibold text-white mb-2">Premium Service</h3>
            <p className="text-gray-300 text-sm">Exquisite dining and champagne reception</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-gold-400 text-3xl mb-2">🎵</div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Entertainment</h3>
            <p className="text-gray-300 text-sm">Professional musicians and special performances</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
