'use client';

import { motion, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { BookOpen, Code2, Lightbulb } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ConceptHeaderProps } from '../types/types-index';

export function ConceptHeader({ title, description }: ConceptHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headerRef.current || !titleRef.current || !descriptionRef.current)
      return;

    const tl = gsap.timeline();

    // Animate header entrance
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    ).fromTo(
      descriptionRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // Floating animation for the icon
    gsap.to('.concept-icon', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }, [title, description]);

  // Framer Motion Variants with proper easing arrays
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.17, 0.67, 0.83, 0.67], // easeOut
        when: 'beforeChildren',
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={headerRef}
      className="relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 rounded-2xl opacity-50" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-15"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl">
        <div className="flex items-start space-x-6">
          {/* Icon */}
          <motion.div
            className="concept-icon flex-shrink-0"
            variants={iconVariants}>
            <div className="relative">
              <motion.div
                className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}>
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary-500 rounded-2xl opacity-30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1], // easeInOut
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h1
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.17, 0.67, 0.83, 0.67], // easeOut
              }}>
              {title}
            </motion.h1>

            <motion.p
              ref={descriptionRef}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.17, 0.67, 0.83, 0.67], // easeOut
              }}>
              {description}
            </motion.p>

            {/* Learning Indicators */}
            <motion.div
              className="flex items-center space-x-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: [0.17, 0.67, 0.83, 0.67], // easeOut
              }}>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                </motion.div>
                <span>Interactive Learning</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </motion.div>
                <span>Practical Examples</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <span>Live Coding</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.17, 0.67, 0.83, 0.67], // easeOut
          }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}
