import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiPieChart, FiShield } from 'react-icons/fi';

const Hero3DScene = () => {
    const canvasRef = useRef(null);

    // Inner Canvas Particles
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frameId;
        
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = [];
        for(let i=0; i<30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vy: -Math.random() * 0.5 - 0.2,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y += p.vy;
                if(p.y < 0) p.y = canvas.height;
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                ctx.fill();
            });
            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="hero-3d-container">
            <div className="hero-3d-card-wrapper">
                {/* Inner Canvas Background */}
                <canvas ref={canvasRef} className="hero-inner-canvas" />

                {/* Orbiting Badges */}
                <div className="orbit-container">
                    <div className="orbit-item badge-1">
                        <div className="layer-bubble teal">
                            <FiTrendingUp /> Total Balance: $12,450.00
                        </div>
                    </div>
                    <div className="orbit-item badge-2">
                        <div className="layer-bubble violet">
                            <FiPieChart /> Monthly Savings: +15.4%
                        </div>
                    </div>
                    <div className="orbit-item badge-3">
                        <div className="layer-bubble teal">
                            <FiShield /> Data Secured
                        </div>
                    </div>
                </div>

                {/* Main 3D Card */}
                <motion.div 
                    className="hero-main-card"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    whileHover={{ rotateY: 15, rotateX: 10, transition: { duration: 0.5 } }}
                >
                    <div className="preview-top-bar">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                        <div className="preview-url">financeflow.pro/dashboard</div>
                    </div>
                    <div className="preview-content-skeleton">
                        <div className="skeleton-grid">
                            <div className="skeleton-main-view">
                                <div className="skeleton-chart-area">
                                    <div className="chart-bar h-40"></div>
                                    <div className="chart-bar h-60"></div>
                                    <div className="chart-bar h-30"></div>
                                    <div className="chart-bar h-80"></div>
                                    <div className="chart-bar h-50"></div>
                                </div>
                                <div className="skeleton-card-large"></div>
                            </div>
                            <div className="skeleton-sidebar">
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line w-60"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Status Tag for the moving element */}
                <motion.div 
                    className="hero-status-tag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <span className="pulse-dot"></span>
                    Live AI Analysis
                </motion.div>
            </div>
        </div>
    );
};

export default Hero3DScene;
