'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Loader2,
  Terminal,
  Zap,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { OutputPanelProps } from '../types/types-index';

export function OutputPanel({ output, errors, isRunning }: OutputPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const hasContent = output.length > 0 || errors.length > 0;

  useEffect(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;
    const elements = header.children;

    // Animate header entrance
    gsap.fromTo(
      elements,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.7)' }
    );
  }, []);

  useEffect(() => {
    if (!contentRef.current || !hasContent) return;

    const content = contentRef.current;
    const items = content.children;

    // Animate new output items
    gsap.fromTo(
      Array.from(items).slice(-1),
      { x: -20, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );

    // Auto-scroll to bottom
    content.scrollTo({
      top: content.scrollHeight,
      behavior: 'smooth',
    });
  }, [output, errors, hasContent]);

  // ✅ Container Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        when: 'beforeChildren',
      },
    },
  };

  // ✅ Item Variants (with easing fix)
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: [0, 0.55, 0.45, 1], // easeOut as cubic-bezier
      },
    }),
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden shadow-xl backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      {/* Header */}
      <div
        ref={headerRef}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="flex items-center space-x-3">
          <motion.div
            className="p-1.5 bg-gray-800 dark:bg-gray-700 rounded-lg"
            whileHover={{ rotate: 5 }}>
            <Terminal className="w-4 h-4 text-green-400" />
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Console Output
            </span>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {hasContent
                ? `${output.length + errors.length} entries`
                : 'Ready to execute'}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <AnimatePresence mode="wait">
            {isRunning ? (
              <motion.div
                key="running"
                className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}>
                  <Loader2 className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Executing...</span>
              </motion.div>
            ) : hasContent ? (
              <motion.div
                key="completed"
                className="flex items-center space-x-2 text-green-600 dark:text-green-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}>
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Ready</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Output Area */}
      <div className="h-64 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {!hasContent && !isRunning ? (
            <motion.div
              key="empty"
              className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}>
              <div className="text-center space-y-4">
                <motion.div
                  className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0)',
                      '0 0 0 10px rgba(59, 130, 246, 0.1)',
                      '0 0 0 0 rgba(59, 130, 246, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  <Terminal className="w-8 h-8 opacity-50" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium">Ready to execute</p>
                  <p className="text-xs mt-1 opacity-70">
                    Run your code to see the output here
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              ref={contentRef}
              className="p-4 h-full overflow-y-auto code-output space-y-2 custom-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              {/* Regular Output */}
              <AnimatePresence>
                {output.map((line, index) => (
                  <motion.div
                    key={`output-${index}`}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="group">
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                      <motion.div
                        className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                      <div className="flex-1 text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                        {line}
                      </div>
                      <div className="flex-shrink-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Error Output */}
              <AnimatePresence>
                {errors.map((error, index) => (
                  <motion.div
                    key={`error-${index}`}
                    custom={output.length + index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="group">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.5, delay: 0.2 }}>
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                          Error
                        </div>
                        <div className="text-red-700 dark:text-red-300 whitespace-pre-wrap break-words text-sm">
                          {error}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Running Indicator */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div
                    key="running-indicator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}>
                      <Loader2 className="w-5 h-5 text-blue-500" />
                    </motion.div>
                    <div className="text-blue-700 dark:text-blue-300">
                      <div className="text-sm font-medium">
                        Executing code...
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        Please wait while your JavaScript runs
                      </div>
                    </div>
                    <motion.div
                      className="ml-auto flex space-x-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Output: {output.length}</span>
          <span>Errors: {errors.length}</span>
          {hasContent && <span>Last: {new Date().toLocaleTimeString()}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            className="flex items-center space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <Zap className="w-3 h-3 text-primary-500" />
            <span>Live Console</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
