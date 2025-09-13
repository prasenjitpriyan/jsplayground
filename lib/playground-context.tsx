'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PlaygroundContextType } from '../types/types-index';
import { javascriptConcepts } from '../utils/data-concepts';

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined
);

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
}

interface PlaygroundProviderProps {
  children: React.ReactNode;
}

export function PlaygroundProvider({ children }: PlaygroundProviderProps) {
  const [currentCategory, setCurrentCategory] = useState('Basics');
  const [currentConcept, setCurrentConceptState] = useState('Variables');
  const [code, setCode] = useState(javascriptConcepts.Basics.Variables.code);
  const [originalCode, setOriginalCode] = useState(
    javascriptConcepts.Basics.Variables.code
  );
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;

      // If transitioning from mobile to desktop, ensure sidebar state is correct
      if (!isDesktop && newIsDesktop) {
        // When moving to desktop, sidebar should be open
        setIsSidebarOpen(true);
      }

      setIsDesktop(newIsDesktop);
    };

    // Initial check
    handleResize();

    // Add listener
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

  const setCurrentConcept = useCallback((category: string, concept: string) => {
    const newCode = javascriptConcepts[category][concept].code;
    setCurrentCategory(category);
    setCurrentConceptState(concept);
    setCode(newCode);
    setOriginalCode(newCode);
    setOutput([]);
    setErrors([]);
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);
    setErrors([]);

    try {
      // Create a mock console to capture output
      const mockConsole = {
        log: (...args: any[]) => {
          const message = args
            .map((arg) =>
              typeof arg === 'object'
                ? JSON.stringify(arg, null, 2)
                : String(arg)
            )
            .join(' ');
          setOutput((prev) => [...prev, message]);
        },
        error: (...args: any[]) => {
          const message = args.map((arg) => String(arg)).join(' ');
          setErrors((prev) => [...prev, message]);
        },
        warn: (...args: any[]) => {
          const message = args.map((arg) => String(arg)).join(' ');
          setOutput((prev) => [...prev, `⚠️ ${message}`]);
        },
      };

      // Create a safe execution environment
      const asyncFunction = new Function(
        'console',
        'setTimeout',
        'Promise',
        'Math',
        'Date',
        'JSON',
        'Array',
        'Object',
        'String',
        'Number',
        'Boolean',
        `
        try {
          ${code}
        } catch (error) {
          console.error('Runtime Error: ' + error.message);
        }
        `
      );

      // Execute the code with mock environment
      await asyncFunction(
        mockConsole,
        (fn: Function, delay: number) => setTimeout(fn, Math.min(delay, 5000)), // Limit setTimeout to 5s
        Promise,
        Math,
        Date,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean
      );
    } catch (error) {
      setErrors([
        `Syntax Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ]);
    } finally {
      setTimeout(() => setIsRunning(false), 500);
    }
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(originalCode);
    setOutput([]);
    setErrors([]);
  }, [originalCode]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setOutput((prev) => [...prev, '✅ Code copied to clipboard!']);
    } catch (error) {
      setErrors((prev) => [...prev, 'Failed to copy code to clipboard']);
    }
  }, [code]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const value: PlaygroundContextType = {
    currentCategory,
    currentConcept,
    code,
    originalCode,
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
  };

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}
