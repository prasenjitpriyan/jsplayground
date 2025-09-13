'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function Logo({
  className = '',
  size = 'md',
  animated = true,
}: LogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    const svg = logoRef.current;
    const paths = svg.querySelectorAll('path');
    const glow = glowRef.current;

    // Initial setup
    gsap.set(paths, {
      strokeDasharray: '100%',
      strokeDashoffset: '100%',
      fill: 'transparent',
    });

    // Animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    tl.to(paths, {
      strokeDashoffset: '0%',
      duration: 2,
      ease: 'power2.inOut',
      stagger: 0.2,
    })
      .to(
        paths,
        {
          fill: 'currentColor',
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        glow,
        {
          scale: 1.2,
          opacity: 0.6,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(glow, {
        scale: 1,
        opacity: 0.2,
        duration: 1,
        ease: 'power2.inOut',
      });

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(svg, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
      gsap.to(glow, {
        scale: 1.3,
        opacity: 0.8,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(svg, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
      gsap.to(glow, {
        scale: 1,
        opacity: 0.2,
        duration: 0.3,
      });
    };

    svg.addEventListener('mouseenter', handleMouseEnter);
    svg.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tl.kill();
      svg.removeEventListener('mouseenter', handleMouseEnter);
      svg.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animated]);

  return (
    <motion.div
      className={`logo-container relative ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'backOut' }}>
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="logo-glow absolute inset-0 bg-primary-500 rounded-full opacity-20 blur-xl"
      />

      {/* Logo SVG */}
      <svg
        ref={logoRef}
        viewBox="0 0 100 100"
        className={`relative z-10 ${sizeClasses[size]} text-primary-600 dark:text-primary-400 cursor-pointer`}
        fill="currentColor">
        {/* JS Letters */}
        <defs>
          <linearGradient id="jsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* J Letter */}
        <path
          d="M35 25 L35 55 Q35 65 25 65 Q15 65 15 55"
          fill="none"
          stroke="url(#jsGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* S Letter */}
        <path
          d="M55 35 Q65 25 75 35 Q65 45 55 45 Q65 45 75 55 Q65 65 55 55"
          fill="none"
          stroke="url(#jsGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Code brackets */}
        <path
          d="M20 20 L15 25 L20 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M80 20 L85 25 L80 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Decorative dots */}
        <circle cx="25" cy="75" r="2" fill="currentColor" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="35" cy="80" r="1.5" fill="currentColor" opacity="0.4">
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle cx="75" cy="75" r="2" fill="currentColor" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2.2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
      </svg>
    </motion.div>
  );
}
