import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiPieChart, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import ParticleBackground from '../components/ParticleBackground';
import Hero3DScene from '../components/Hero3DScene';

const Home = () => {
  const featuresRef = useRef([]);

  // Word-by-word fade-up for hero title
  const heroTitle = "Take Control of Your";
  const words = heroTitle.split(" ");

  // Ripple effect for button
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Intersection Observer for feature cards flip
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "rotateX(0deg)";
          entry.target.style.opacity = "1";
        }
      });
    }, { threshold: 0.1 });

    featuresRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FiPieChart />,
      title: "Real-time Analytics",
      description: "Visualize your spending patterns with interactive, glassmorphism charts that update as you go."
    },
    {
      icon: <FiShield />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely. We prioritize your privacy above all else."
    },
    {
      icon: <FiTrendingUp />,
      title: "Smart Budgeting",
      description: "Set intelligent limits and get notified when you're approaching your budget thresholds."
    }
  ];

  return (
    <div className="home-container">
      <ParticleBackground />
      
      {/* Background Glows */}
      <div className="home-bg-glow glow-1"></div>
      <div className="home-bg-glow glow-2"></div>

      <div className="home-content">
        <div className="home-hero">
          <div className="home-badge">
            <span className="badge-dot"></span>
            Now with Smart AI Budgeting
          </div>
          <h1 className="home-title">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="text-gradient">Financial Future</span>
          </h1>
          
          <p className="home-subtitle">
            Experience the most innovative way to track, manage, and optimize your expenses. 
            Beautiful analytics meets powerful financial intelligence.
          </p>
          
          <div className="home-cta">
            <Link 
              to="/dashboard" 
              className="btn-primary btn-large cta-button"
              onClick={handleRipple}
            >
              Get Started for Free <FiArrowRight className="fi-arrow-right" />
            </Link>
            
            <div className="trust-indicators">
              <span><FiCheckCircle /> No Credit Card</span>
              <span><FiCheckCircle /> Instant Setup</span>
            </div>
          </div>
        </div>

        <div className="home-features">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={(el) => (featuresRef.current[index] = el)}
              className="feature-card glass-card"
              style={{ 
                transform: "rotateX(90deg)", 
                opacity: 0,
                transition: `transform 0.4s ease-out ${index * 0.15 + 0.1}s, opacity 0.4s ease-out ${index * 0.15 + 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) rotateX(4deg) rotateY(-2deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)";
              }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="home-visual-preview">
          <Hero3DScene />
        </div>
      </div>
    </div>
  );
};

export default Home;

