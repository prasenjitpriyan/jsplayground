export interface JavaScriptConcept {
  title: string;
  description: string;
  code: string;
}

export interface ConceptCategory {
  [key: string]: JavaScriptConcept;
}

export interface JavaScriptConceptsData {
  [category: string]: ConceptCategory;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  concepts: JavaScriptConceptsData;
  currentCategory: string;
  currentConcept: string;
  onConceptSelect: (category: string, concept: string) => void;
}

export interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  onCopy: () => void;
  isRunning: boolean;
}

export interface OutputPanelProps {
  output: string[];
  errors: string[];
  isRunning: boolean;
}

export interface ConceptHeaderProps {
  title: string;
  description: string;
}

export interface PlaygroundContextType {
  currentCategory: string;
  currentConcept: string;
  code: string;
  originalCode: string;
  output: string[];
  errors: string[];
  isRunning: boolean;
  isSidebarOpen: boolean;
  setCurrentConcept: (category: string, concept: string) => void;
  setCode: (code: string) => void;
  runCode: () => void;
  resetCode: () => void;
  copyCode: () => void;
  toggleSidebar: () => void;
}
