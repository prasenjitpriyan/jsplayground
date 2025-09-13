'use client';

import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
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

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out',
          'w-80 lg:w-72',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            JavaScript Concepts
          </h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="space-y-2">
            {Object.entries(concepts).map(([categoryName, categoryData]) => (
              <div key={categoryName}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg text-left font-medium transition-colors',
                    currentCategory === categoryName
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}>
                  <span>{categoryName}</span>
                  {expandedCategories.has(categoryName) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Category Items */}
                {expandedCategories.has(categoryName) && (
                  <div className="ml-4 mt-2 space-y-1 animate-slide-down">
                    {Object.entries(categoryData).map(
                      ([conceptName, conceptData]) => (
                        <button
                          key={conceptName}
                          onClick={() =>
                            onConceptSelect(categoryName, conceptName)
                          }
                          className={cn(
                            'w-full text-left p-2 rounded-md text-sm transition-colors',
                            currentCategory === categoryName &&
                              currentConcept === conceptName
                              ? 'bg-primary-500 text-white dark:bg-primary-600'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}>
                          {conceptData.title}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          'fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg lg:hidden',
          'transition-transform duration-300',
          isOpen ? 'translate-x-80' : 'translate-x-0'
        )}>
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
