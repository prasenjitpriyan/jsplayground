'use client';

import { CodeEditor } from '../components/CodeEditor';
import { ConceptHeader } from '../components/ConceptHeader';
import { OutputPanel } from '../components/OutputPanel';
import { Sidebar } from '../components/Sidebar';
import { usePlayground } from '../lib/playground-context';
import { cn } from '../lib/utils';
import { javascriptConcepts } from '../utils/data-concepts';

export default function PlaygroundPage() {
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

  if (!currentConceptData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Concept Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested JavaScript concept could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
      <main
        className={cn(
          'transition-all duration-300 ease-in-out',
          'min-h-screen',
          isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        )}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                JavaScript Learning Playground
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Interactive JavaScript Tutorial & Reference
              </p>
            </div>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              <span>{isSidebarOpen ? 'Hide' : 'Show'} Sidebar</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Concept Header */}
          <ConceptHeader
            title={currentConceptData.title}
            description={currentConceptData.description}
          />

          {/* Editor and Output Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Code Editor */}
            <div className="space-y-4">
              <CodeEditor
                code={code}
                onChange={setCode}
                onRun={runCode}
                onReset={resetCode}
                onCopy={copyCode}
                isRunning={isRunning}
              />
            </div>

            {/* Output Panel */}
            <div className="space-y-4">
              <OutputPanel
                output={output}
                errors={errors}
                isRunning={isRunning}
              />
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 Tips
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>
                • Modify the code and click "Run Code" to see results instantly
              </li>
              <li>• Use console.log() to output values and debug your code</li>
              <li>• Click "Reset" to restore the original example</li>
              <li>• Use "Copy" to copy code to your clipboard</li>
              <li>• Navigate through different concepts using the sidebar</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
