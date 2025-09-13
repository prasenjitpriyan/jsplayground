'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronRight, Code2, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { SidebarProps } from '../types/types-index';

// Custom hook to detect desktop viewport
function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isDesktop;
}

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

  const sidebarRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // Animate sidebar open/close with GSAP
  useEffect(() => {
    if (!sidebarRef.current || !headerRef.current) return;

    const sidebar = sidebarRef.current;
    const header = headerRef.current;

    if (isOpen || isDesktop) {
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
  }, [isOpen, isDesktop]);

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
    // Auto-close sidebar on mobile after selection
    if (!isDesktop) {
      setTimeout(() => onToggle(), 300);
    }
  };

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
      transition: { duration: 0.2 },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside
            ref={sidebarRef}
            className={cn(
              'fixed left-0 top-0 h-full z-50',
              'w-80 lg:w-72',
              'bg-white/95 dark:bg-gray-900/95',
              'backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50',
              'shadow-2xl lg:shadow-lg'
            )}
            variants={sidebarVariants}
            initial="closed"
            animate={isOpen || isDesktop ? 'open' : 'closed'}
            exit="closed">
            {/* Header */}
            <div
              ref={headerRef}
              className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}>
                  <Code2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    JS Concepts
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Interactive Learning
                  </p>
                </div>
              </div>

              {!isDesktop && (
                <motion.button
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              )}
            </div>

            {/* Navigation */}
            <nav className="p-4 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
              <div className="space-y-2">
                {Object.entries(concepts).map(
                  ([categoryName, categoryData], idx) => (
                    <motion.div
                      key={categoryName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}>
                      {/* Category Header */}
                      <motion.button
                        onClick={() => toggleCategory(categoryName)}
                        className={cn(
                          'w-full flex items-center justify-between p-4 rounded-xl text-left font-semibold transition-all duration-200',
                          'group hover:shadow-md',
                          currentCategory === categoryName
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
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
                          <span className="font-medium">{categoryName}</span>
                          {currentCategory === categoryName && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto">
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>

                      {/* Category Items */}
                      <AnimatePresence>
                        {expandedCategories.has(categoryName) && (
                          <motion.div
                            variants={categoryVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="ml-6 mt-2 space-y-1 overflow-hidden">
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
                                    'group hover:shadow-sm relative overflow-hidden',
                                    currentCategory === categoryName &&
                                      currentConcept === conceptName
                                      ? 'bg-primary-500 text-white shadow-md'
                                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-gray-200'
                                  )}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: conceptIndex * 0.05 }}
                                  whileHover={{ scale: 1.02, x: 4 }}
                                  whileTap={{ scale: 0.98 }}>
                                  <div className="relative z-10">
                                    <div className="font-medium truncate">
                                      {conceptData.title}
                                    </div>
                                    <div className="text-xs opacity-70 mt-1 line-clamp-2">
                                      {conceptData.description}
                                    </div>
                                  </div>

                                  {currentCategory === categoryName &&
                                    currentConcept === conceptName && (
                                      <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                                        layoutId="activeIndicator"
                                        transition={{
                                          type: 'spring',
                                          stiffness: 400,
                                          damping: 30,
                                        }}
                                      />
                                    )}

                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
