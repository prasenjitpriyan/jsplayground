'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Maximize2, Menu, Minimize2, Settings } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { ConceptHeader } from '../components/ConceptHeader';
import { Logo } from '../components/Logo';
import { OutputPanel } from '../components/OutputPanel';
import { Sidebar } from '../components/Sidebar';
import { usePlayground } from '../lib/playground-context';
import { cn } from '../lib/utils';
import { javascriptConcepts } from '../utils/data-concepts';

export default function PlaygroundPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const {
    currentCategory,
    currentConcept,
    code,
    output,
    errors,
    isRunning,
    isSidebarOpen,
    setCurrentConcept,
    setCode,
    runCode,
    resetCode,
    copyCode,
    toggleSidebar,
  } = usePlayground();

  const currentConceptData =
    javascriptConcepts[currentCategory]?.[currentConcept];

  useEffect(() => {
    if (!pageRef.current || !headerRef.current) return;

    const page = pageRef.current;
    const header = headerRef.current;

    // Page entrance animation
    gsap.fromTo(
      page,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Header animation
    gsap.fromTo(
      header.children,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3 }
    );

    // Background particles animation
    const particles = document.querySelectorAll('.bg-particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });
    });
  }, []);

  if (!currentConceptData) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <Logo size="lg" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Concept Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested JavaScript concept could not be found.
          </p>
        </div>
      </motion.div>
    );
  }

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-particle absolute w-2 h-2 bg-primary-400/20 dark:bg-primary-500/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        concepts={javascriptConcepts}
        currentCategory={currentCategory}
        currentConcept={currentConcept}
        onConceptSelect={setCurrentConcept}
      />

      {/* Main Content */}
      <motion.main
        className={cn(
          'transition-all duration-500 ease-in-out min-h-screen',
          isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        )}
        layout>
        {/* Header */}
        <motion.header
          ref={headerRef}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30"
          variants={sectionVariants}>
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Logo size="md" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  JavaScript Playground
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive Learning Environment
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Desktop Sidebar Toggle */}
              <motion.button
                onClick={toggleSidebar}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <span>{isSidebarOpen ? 'Hide' : 'Show'} Sidebar</span>
                {isSidebarOpen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </motion.button>

              {/* Settings Button */}
              <motion.button
                className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}>
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Concept Header */}
          <motion.div variants={sectionVariants}>
            <ConceptHeader
              title={currentConceptData.title}
              description={currentConceptData.description}
            />
          </motion.div>

          {/* Editor and Output Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Code Editor */}
            <motion.div variants={sectionVariants}>
              <CodeEditor
                code={code}
                onChange={setCode}
                onRun={runCode}
                onReset={resetCode}
                onCopy={copyCode}
                isRunning={isRunning}
              />
            </motion.div>

            {/* Output Panel */}
            <motion.div variants={sectionVariants}>
              <OutputPanel
                output={output}
                errors={errors}
                isRunning={isRunning}
              />
            </motion.div>
          </div>

          {/* Enhanced Tips Section */}
          <motion.div
            className="relative overflow-hidden"
            variants={sectionVariants}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl" />
            <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 lg:p-8">
              <div className="flex items-start space-x-4">
                <motion.div
                  className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.4)',
                      '0 0 0 10px rgba(59, 130, 246, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    💡
                  </motion.div>
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    💡 Interactive Learning Tips
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        icon: '🚀',
                        text: 'Modify the code and click "Run Code" to see results instantly',
                      },
                      {
                        icon: '🐛',
                        text: 'Use console.log() to output values and debug your code',
                      },
                      {
                        icon: '🔄',
                        text: 'Click "Reset" to restore the original example',
                      },
                      {
                        icon: '📋',
                        text: 'Use "Copy" to copy code to your clipboard',
                      },
                      {
                        icon: '🗂️',
                        text: 'Navigate through different concepts using the sidebar',
                      },
                      {
                        icon: '⚡',
                        text: 'Experiment freely - this is a safe learning environment!',
                      },
                    ].map((tip, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 1 }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: 'rgba(59, 130, 246, 0.05)',
                        }}>
                        <span className="text-lg">{tip.icon}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                          {tip.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-12 px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
          variants={sectionVariants}>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Built with ❤️ for JavaScript learners everywhere</p>
            <p className="mt-1 opacity-70">
              Next.js 15 • React 19 • TypeScript • Tailwind CSS v4 • GSAP •
              Framer Motion
            </p>
          </div>
        </motion.footer>
      </motion.main>
    </motion.div>
  );
}
