'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronRight, Code2, Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { SidebarProps } from '../types/types-index';

export function Sidebar({
  isOpen,
  onToggle,
  concepts,
  currentCategory,
  currentConcept,
  onConceptSelect,
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set([currentCategory])
  );
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sidebarRef.current || !headerRef.current) return;

    const sidebar = sidebarRef.current;
    const header = headerRef.current;

    // Always animate on desktop, or when open on mobile
    if (!isMobile || isOpen) {
      gsap.fromTo(
        sidebar,
        { x: -320, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        header.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen, isMobile]);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleConceptSelect = (category: string, concept: string) => {
    onConceptSelect(category, concept);
    if (isMobile) {
      setTimeout(() => onToggle(), 300);
    }
  };

  if (!mounted) {
    return null;
  }

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -320,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const backdropVariants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const categoryVariants: Variants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: {
          type: 'spring',
          stiffness: 400,
          damping: 40,
        },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          type: 'spring',
          stiffness: 400,
          damping: 40,
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  // Fixed logic:
  // - Desktop: Always show sidebar
  // - Mobile: Show only when open
  const shouldShowSidebar = !isMobile || isOpen;

  return (
    <>
      {/* Mobile Backdrop - Only on mobile when open */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on desktop, toggle on mobile */}
      <AnimatePresence>
        {shouldShowSidebar && (
          <motion.aside
            ref={sidebarRef}
            className={cn(
              'fixed left-0 top-0 h-full z-50',
              'w-80 lg:w-72',
              'bg-gray-900/95 backdrop-blur-xl',
              'border-r border-gray-700/50',
              'shadow-2xl lg:shadow-xl'
            )}
            variants={sidebarVariants}
            initial={isMobile ? 'closed' : 'open'}
            animate={!isMobile || isOpen ? 'open' : 'closed'}
            exit="closed">
            {/* Header */}
            <div
              ref={headerRef}
              className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-700">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}>
                  <Code2 className="w-5 h-5 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-white">JS Concepts</h2>
                  <p className="text-xs text-gray-400 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Interactive Learning</span>
                  </p>
                </div>
              </div>

              {/* Close button - only on mobile when sidebar is open */}
              {isMobile && (
                <motion.button
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              )}
            </div>

            {/* Navigation */}
            <nav className="p-4 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
              <div className="space-y-1">
                {Object.entries(concepts).map(
                  ([categoryName, categoryData], categoryIndex) => (
                    <motion.div
                      key={categoryName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}>
                      {/* Category Header */}
                      <motion.button
                        onClick={() => toggleCategory(categoryName)}
                        className={cn(
                          'w-full flex items-center justify-between p-3 rounded-lg text-left font-medium transition-all duration-200',
                          'group hover:bg-gray-800/50',
                          currentCategory === categoryName
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'text-gray-300 hover:text-white'
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}>
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{
                              rotate: expandedCategories.has(categoryName)
                                ? 90
                                : 0,
                            }}
                            transition={{ duration: 0.2 }}>
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                          <span>{categoryName}</span>
                        </div>

                        {currentCategory === categoryName && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          </motion.div>
                        )}
                      </motion.button>

                      {/* Category Items */}
                      <AnimatePresence>
                        {expandedCategories.has(categoryName) && (
                          <motion.div
                            variants={categoryVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="ml-6 mt-1.5 space-y-1 overflow-hidden">
                            {Object.entries(categoryData).map(
                              ([conceptName, conceptData], conceptIndex) => (
                                <motion.button
                                  key={conceptName}
                                  onClick={() =>
                                    handleConceptSelect(
                                      categoryName,
                                      conceptName
                                    )
                                  }
                                  className={cn(
                                    'w-full text-left p-3 rounded-lg text-sm transition-all duration-200',
                                    'group hover:bg-gray-800/30 relative overflow-hidden',
                                    currentCategory === categoryName &&
                                      currentConcept === conceptName
                                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/50'
                                      : 'text-gray-400 hover:text-gray-200'
                                  )}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: conceptIndex * 0.05 }}
                                  whileHover={{ scale: 1.01, x: 4 }}
                                  whileTap={{ scale: 0.98 }}>
                                  <div className="relative z-10">
                                    <div className="font-medium truncate mb-1">
                                      {conceptData.title}
                                    </div>
                                    <div className="text-xs opacity-70 line-clamp-2 leading-relaxed">
                                      {conceptData.description}
                                    </div>
                                  </div>

                                  {/* Active Indicator */}
                                  {currentCategory === categoryName &&
                                    currentConcept === conceptName && (
                                      <>
                                        <motion.div
                                          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                                          layoutId="activeIndicator"
                                          transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 30,
                                          }}
                                        />
                                        <motion.div
                                          className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.3 }}
                                        />
                                      </>
                                    )}

                                  {/* Hover Effect */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    initial={false}
                                  />
                                </motion.button>
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                )}
              </div>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
              <div className="text-xs text-center text-gray-500">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Interactive Learning Platform</span>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button - Only show on mobile when sidebar is closed */}
      <AnimatePresence>
        {isMobile && !isOpen && (
          <motion.button
            onClick={onToggle}
            className="fixed top-4 left-4 z-50 p-3 rounded-xl shadow-lg bg-gray-900/90 backdrop-blur-md border border-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}>
            <Menu className="w-5 h-5 text-gray-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
