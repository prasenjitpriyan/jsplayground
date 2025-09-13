'use client';

import { AlertCircle, Loader2, Terminal } from 'lucide-react';
import { OutputPanelProps } from '../types/types-index';

export function OutputPanel({ output, errors, isRunning }: OutputPanelProps) {
  const hasContent = output.length > 0 || errors.length > 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Console Output
          </span>
        </div>

        {isRunning && (
          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Running...</span>
          </div>
        )}
      </div>

      {/* Output Area */}
      <div className="h-64 overflow-y-auto">
        {!hasContent && !isRunning ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Run your code to see the output here</p>
            </div>
          </div>
        ) : (
          <div className="p-4 font-mono text-sm space-y-2">
            {/* Regular Output */}
            {output.map((line, index) => (
              <div
                key={`output-${index}`}
                className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                {line}
              </div>
            ))}

            {/* Error Output */}
            {errors.map((error, index) => (
              <div
                key={`error-${index}`}
                className="flex items-start space-x-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-wrap break-words">{error}</span>
              </div>
            ))}

            {/* Running Indicator */}
            {isRunning && (
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing code...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
