import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCode(code: string): string {
  // Basic code formatting - add proper indentation
  const lines = code.split('\n');
  let indentLevel = 0;
  const formattedLines = lines.map((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.includes('}') && !trimmedLine.includes('{')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const formattedLine = '  '.repeat(indentLevel) + trimmedLine;

    if (trimmedLine.includes('{') && !trimmedLine.includes('}')) {
      indentLevel++;
    }

    return formattedLine;
  });

  return formattedLines.join('\n');
}

export function highlightSyntax(code: string): string {
  // Basic syntax highlighting - this would be more sophisticated in a real implementation
  let highlighted = code;

  // Keywords
  const keywords = [
    'let',
    'const',
    'var',
    'function',
    'if',
    'else',
    'for',
    'while',
    'return',
    'class',
    'extends',
    'import',
    'export',
    'async',
    'await',
    'try',
    'catch',
    'finally',
  ];
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(
      regex,
      `<span class="syntax-keyword">${keyword}</span>`
    );
  });

  // Strings
  highlighted = highlighted.replace(
    /(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
    '<span class="syntax-string">$1$2$3</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="syntax-number">$1</span>'
  );

  // Comments
  highlighted = highlighted.replace(
    /(\/\/.*$)/gm,
    '<span class="syntax-comment">$1</span>'
  );
  highlighted = highlighted.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span class="syntax-comment">$1</span>'
  );

  return highlighted;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
