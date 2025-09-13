'use client';

import { ConceptHeaderProps } from '../types/types-index';

export function ConceptHeader({ title, description }: ConceptHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
