'use client';

import { Copy, Loader2, Play, RotateCcw } from 'lucide-react';
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
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">
            JavaScript Editor
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onCopy}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={onRun}
            disabled={isRunning}
            className={cn(
              'flex items-center space-x-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
              'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}>
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full h-96 p-4 bg-transparent text-sm font-mono resize-none',
            'text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset',
            'placeholder-gray-400 dark:placeholder-gray-500'
          )}
          placeholder="Write your JavaScript code here..."
          spellCheck={false}
        />

        {/* Line numbers */}
        <div className="absolute left-0 top-4 bottom-4 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
          {code.split('\n').map((_, index) => (
            <div
              key={index}
              className="h-6 flex items-center justify-end px-2 text-xs text-gray-400 dark:text-gray-500">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Adjust textarea padding to account for line numbers */}
        <style jsx>{`
          textarea {
            padding-left: 3.5rem;
          }
        `}</style>
      </div>
    </div>
  );
}
