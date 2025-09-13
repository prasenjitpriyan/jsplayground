'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Code, Copy, Loader2, Play, RotateCcw, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { CodeEditorProps } from '../types/types-index';

export function CodeEditor({
  code,
  onChange,
  onRun,
  onReset,
  onCopy,
  isRunning,
}: CodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const runButtonRef = useRef<HTMLButtonElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!toolbarRef.current) return;

    const toolbar = toolbarRef.current;
    const buttons = toolbar.querySelectorAll('button');

    // Animate toolbar entrance
    gsap.fromTo(
      buttons,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }
    );
  }, []);

  useEffect(() => {
    if (!runButtonRef.current) return;

    const button = runButtonRef.current;

    if (isRunning) {
      gsap.to(button, {
        scale: 0.95,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        duration: 0.2,
      });
    } else {
      gsap.to(button, {
        scale: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
      });
    }
  }, [isRunning]);

  const handleRunClick = () => {
    onRun();

    if (runButtonRef.current) {
      gsap.to(runButtonRef.current, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  const lineNumbers = code.split('\n').map((_, index) => index + 1);

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden shadow-xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      {/* Toolbar */}
      <div
        ref={toolbarRef}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="flex items-center space-x-3">
          {/* Window Controls */}
          <div className="flex space-x-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <motion.div
              className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
              whileHover={{ rotate: 5 }}>
              <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                JavaScript Editor
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Interactive Playground
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Action Buttons */}
          <motion.button
            onClick={onCopy}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Copy className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            <span className="hidden sm:inline">Copy</span>
          </motion.button>

          <motion.button
            onClick={onReset}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            <span className="hidden sm:inline">Reset</span>
          </motion.button>

          <motion.button
            ref={runButtonRef}
            onClick={handleRunClick}
            disabled={isRunning}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shadow-md relative overflow-hidden group',
              'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              'text-white disabled:opacity-70 disabled:cursor-not-allowed',
              'transform hover:scale-105 active:scale-95'
            )}
            whileHover={{ boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}>
            <motion.div
              animate={isRunning ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}>
              {isRunning ? (
                <Loader2 className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.div>
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: isRunning ? ['-100%', '100%'] : '-100%' }}
              transition={{
                duration: 1.5,
                repeat: isRunning ? Infinity : 0,
                ease: 'linear',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="relative flex">
        {/* Line Numbers */}
        <motion.div
          className="flex-shrink-0 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}>
          <div className="py-4 px-2 text-right font-mono text-xs text-gray-400 dark:text-gray-500 leading-6">
            {lineNumbers.map((lineNumber) => (
              <motion.div
                key={lineNumber}
                className="h-6 flex items-center justify-end hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: lineNumber * 0.01 }}>
                {lineNumber}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Editor */}
        <div className="flex-1 relative">
          <motion.textarea
            ref={editorRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full h-96 p-4 bg-transparent resize-none code-editor',
              'text-gray-900 dark:text-gray-100 leading-6',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-inset',
              'placeholder-gray-400 dark:placeholder-gray-500',
              'selection:bg-blue-500/20'
            )}
            placeholder="// Write your JavaScript code here..."
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          />

          {/* Syntax Highlighting Overlay (simplified) */}
          <div className="absolute inset-0 pointer-events-none p-4 font-mono text-sm leading-6 whitespace-pre-wrap overflow-hidden">
            {/* This would contain syntax highlighted code in a real implementation */}
          </div>

          {/* Focus Ring Animation */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={false}
            animate={{
              boxShadow: isFocused
                ? '0 0 0 2px rgba(59, 130, 246, 0.3)'
                : '0 0 0 0px rgba(59, 130, 246, 0)',
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span>JavaScript</span>
          <span>UTF-8</span>
          <span>Lines: {code.split('\n').length}</span>
          <span>Characters: {code.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            className="flex items-center space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <Zap className="w-3 h-3 text-blue-500" />
            <span>Live Editor</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
