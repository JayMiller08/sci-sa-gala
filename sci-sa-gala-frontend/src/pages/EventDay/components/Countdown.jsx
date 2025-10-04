/**
 * Enhanced Countdown Component for SCI-SA Gala
 * Displays elegant countdown timer with gala background imagery
 */

import { useState, useEffect } from 'react';

/**
 * Enhanced Countdown component
 * @param {Object} props - Component props
 * @param {string} props.eventDate - Event date string
 * @param {Function} props.onComplete - Completion callback
 * @param {boolean} props.loading - Loading state
 * @returns {JSX.Element} - Enhanced countdown component
 */
export default function Countdown({ eventDate, onComplete, loading = false }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  /**
   * Calculates time remaining until event
   * @param {Date} targetDate - Target event date
   * @returns {Object} - Time remaining object
   */
  const calculateTimeLeft = (targetDate) => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  /**
   * Updates countdown timer
   */
  const updateCountdown = () => {
    if (!eventDate) return;

    const remaining = calculateTimeLeft(eventDate);
    setTimeLeft(remaining);

    // Check if countdown is complete
    const totalSeconds = remaining.days * 86400 + remaining.hours * 3600 + remaining.minutes * 60 + remaining.seconds;
    if (totalSeconds <= 0 && !isComplete) {
      setIsComplete(true);
      onComplete && onComplete();
    }
  };

  /**
   * Formats date for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Update countdown every second
  useEffect(() => {
    if (!eventDate) return;

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [eventDate, isComplete]);

  if (loading) {
    return (
      <div className="card-gradient">
        <div className="flex items-center justify-center py-12">
          <div className="spinner-gold"></div>
          <span className="ml-3 text-navy-600 font-medium">Loading countdown timer...</span>
        </div>
      </div>
    );
  }

  if (!eventDate) {
    return (
      <div className="card-gradient">
        <div className="text-center py-12">
          <div className="text-navy-500">
            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="title-secondary text-navy-800">Event Date Not Set</h3>
            <p className="subtitle text-navy-600">Please configure the event date in the admin panel</p>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div 
        className="hero-bg min-h-[500px] flex items-center justify-center relative rounded-3xl overflow-hidden"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1504805572947-34fad45aed93)`,
        }}
      >
        <div className="hero-overlay absolute inset-0"></div>
        <div className="relative z-10 text-center text-white max-w-2xl px-6">
          <div className="text-8xl mb-6 animate-pulse">🎉</div>
          <h2 className="title-primary text-white mb-4">Event Started!</h2>
          <p className="subtitle text-white/90 mb-8">The SCI-SA Gala is now live and running!</p>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-gold-500/30 transition-all duration-300">
            🎭 Welcome to the Gala Event!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="hero-bg min-h-[400px] flex items-center justify-center relative rounded-3xl overflow-hidden shadow-2xl"
      style={{ 
        backgroundImage: `url(https://images.unsplash.com/photo-1503428593586-e225b39bddfe)`,
      }}
    >
      <div className="hero-overlay absolute inset-0"></div>
      <div className="relative z-10 text-center text-white w-full max-w-4xl px-6">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">
            🎭 Countdown to SCI-SA Gala
          </h2>
          <div className="accent-line mx-auto w-24 mb-2"></div>
          <p className="text-lg text-white/90">
            {formatEventDate(eventDate)}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {/* Days */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-200 font-medium uppercase tracking-wide">Days</div>
          </div>
          
          {/* Hours */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-200 font-medium uppercase tracking-wide">Hours</div>
          </div>
          
          {/* Minutes */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-200 font-medium uppercase tracking-wide">Minutes</div>
          </div>
          
          {/* Seconds */}
          
        </div>

        {/* Additional info */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-xl mx-auto">
          <p className="text-white/90 text-lg font-medium">
            Prepare for an evening of elegance, networking, and celebration
          </p>
        </div>
      </div>
    </div>
  );
}