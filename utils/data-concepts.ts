import { JavaScriptConceptsData } from '../types/types-index';

export const javascriptConcepts: JavaScriptConceptsData = {
  Basics: {
    Variables: {
      title: 'Variables (let, const, var)',
      description:
        'Learn about variable declarations and scoping in JavaScript',
      code: `// Variable declarations
let name = 'John';
const age = 25;
var city = 'New York';

console.log('Name:', name);
console.log('Age:', age);
console.log('City:', city);

// Block scoping with let and const
{
  let blockScoped = 'Only available in this block';
  console.log('Inside block:', blockScoped);
}

// This would cause an error (uncomment to see):
// console.log('Outside block:', blockScoped);`,
    },
    'Data Types': {
      title: 'Data Types',
      description: 'JavaScript data types: primitives and objects',
      code: `// Primitive types
let str = 'Hello World';
let num = 42;
let bool = true;
let undef = undefined;
let nul = null;
let sym = Symbol('id');
let bigInt = 123n;

console.log('String:', typeof str, str);
console.log('Number:', typeof num, num);
console.log('Boolean:', typeof bool, bool);
console.log('Undefined:', typeof undef, undef);
console.log('Null:', typeof nul, nul);
console.log('Symbol:', typeof sym, sym);
console.log('BigInt:', typeof bigInt, bigInt);

// Objects
let obj = { key: 'value' };
let arr = [1, 2, 3];
let func = function() { return 'Hello'; };

console.log('Object:', typeof obj, obj);
console.log('Array:', typeof arr, arr);
console.log('Function:', typeof func, func());`,
    },
    Operators: {
      title: 'Operators',
      description: 'Arithmetic, comparison, logical, and assignment operators',
      code: `// Arithmetic operators
let a = 10, b = 3;
console.log('Addition:', a + b);
console.log('Subtraction:', a - b);
console.log('Multiplication:', a * b);
console.log('Division:', a / b);
console.log('Modulus:', a % b);
console.log('Exponentiation:', a ** b);

// Comparison operators
console.log('Equal:', a == b);
console.log('Strict equal:', a === b);
console.log('Greater than:', a > b);
console.log('Less than:', a < b);

// Logical operators
let x = true, y = false;
console.log('AND:', x && y);
console.log('OR:', x || y);
console.log('NOT:', !x);

// Assignment operators
let c = 5;
c += 3; // c = c + 3
console.log('After +=:', c);
c *= 2; // c = c * 2
console.log('After *=:', c);`,
    },
  },
  'Control Flow': {
    Conditionals: {
      title: 'If/Else & Switch Statements',
      description: 'Control program flow with conditional statements',
      code: `// If/else statements
let score = 85;

if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else if (score >= 70) {
  console.log('Grade: C');
} else {
  console.log('Grade: F');
}

// Ternary operator
let status = score >= 60 ? 'Pass' : 'Fail';
console.log('Status:', status);

// Switch statement
let day = 'Monday';
switch (day) {
  case 'Monday':
    console.log('Start of work week');
    break;
  case 'Friday':
    console.log('TGIF!');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend!');
    break;
  default:
    console.log('Regular day');
}`,
    },
    Loops: {
      title: 'Loops (for, while, for...in, for...of)',
      description: 'Iterate through data and repeat code execution',
      code: `// For loop
console.log('For loop:');
for (let i = 0; i < 5; i++) {
  console.log('Iteration:', i);
}

// While loop
console.log('\\nWhile loop:');
let count = 0;
while (count < 3) {
  console.log('Count:', count);
  count++;
}

// For...in loop (for object properties)
const person = { name: 'Alice', age: 30, city: 'Paris' };
console.log('\\nFor...in loop:');
for (let key in person) {
  console.log(key + ':', person[key]);
}

// For...of loop (for iterable objects)
const fruits = ['apple', 'banana', 'orange'];
console.log('\\nFor...of loop:');
for (let fruit of fruits) {
  console.log('Fruit:', fruit);
}

// Array forEach method
console.log('\\nforEach method:');
fruits.forEach((fruit, index) => {
  console.log(index + ':', fruit);
});`,
    },
  },
  Functions: {
    'Regular Functions': {
      title: 'Function Declarations & Expressions',
      description: 'Define reusable blocks of code',
      code: `// Function declaration
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Function expression
const multiply = function(a, b) {
  return a * b;
};

// Functions with default parameters
function introduce(name, age = 'unknown') {
  return \`Hi, I'm \${name} and I'm \${age} years old.\`;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(greet('World'));
console.log('Multiply:', multiply(4, 5));
console.log(introduce('Alice'));
console.log(introduce('Bob', 25));
console.log('Sum:', sum(1, 2, 3, 4, 5));

// Function scope
let globalVar = 'Global';
function scopeExample() {
  let localVar = 'Local';
  console.log('Inside function - Global:', globalVar);
  console.log('Inside function - Local:', localVar);
}
scopeExample();
console.log('Outside function - Global:', globalVar);
// console.log(localVar); // Would cause error`,
    },
    'Arrow Functions': {
      title: 'Arrow Functions',
      description: "Modern function syntax with lexical 'this' binding",
      code: `// Basic arrow function
const add = (a, b) => a + b;

// Arrow function with single parameter (parentheses optional)
const square = x => x * x;

// Arrow function with multiple statements
const processData = (data) => {
  console.log('Processing:', data);
  return data.toUpperCase();
};

// Arrow functions in array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);

console.log('Add 3 + 4:', add(3, 4));
console.log('Square of 6:', square(6));
console.log('Processed:', processData('hello'));
console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Total:', total);

// Difference with 'this' binding
const obj = {
  name: 'Object',
  regularFunction: function() {
    console.log('Regular function this:', this.name);
  },
  arrowFunction: () => {
    console.log('Arrow function this:', this.name); // 'this' refers to global scope
  }
};

obj.regularFunction();
obj.arrowFunction();`,
    },
    'Async Functions': {
      title: 'Async/Await Functions',
      description: 'Handle asynchronous operations with modern syntax',
      code: `// Simulated async operation
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Async function with await
async function fetchData() {
  console.log('Fetching data...');
  await delay(1000); // Wait 1 second
  console.log('Data fetched!');
  return { id: 1, name: 'John Doe' };
}

// Using async function
async function processUserData() {
  try {
    const userData = await fetchData();
    console.log('User data:', userData);

    // Multiple async operations
    console.log('Processing...');
    await delay(500);
    console.log('Processing complete!');

    return userData;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call async function
processUserData().then(result => {
  console.log('Final result:', result);
});

// Async function with error handling
async function riskyOperation() {
  try {
    console.log('Starting risky operation...');
    await delay(500);
    // Simulate random error
    if (Math.random() > 0.5) {
      throw new Error('Something went wrong!');
    }
    console.log('Operation successful!');
  } catch (error) {
    console.error('Caught error:', error.message);
  }
}

riskyOperation();

console.log('This runs immediately (non-blocking)');`,
    },
  },
  'ES6+ Features': {
    Destructuring: {
      title: 'Destructuring Assignment',
      description: 'Extract values from arrays and objects',
      code: `// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...others] = colors;

console.log('Primary:', primary);
console.log('Secondary:', secondary);
console.log('Others:', others);

// Object destructuring
const person = {
  name: 'Alice',
  age: 30,
  city: 'New York',
  country: 'USA'
};

const { name, age, ...address } = person;
console.log('Name:', name);
console.log('Age:', age);
console.log('Address:', address);

// Destructuring with different variable names
const { name: personName, city: location } = person;
console.log('Person name:', personName);
console.log('Location:', location);

// Destructuring function parameters
function displayUser({ name, age, city = 'Unknown' }) {
  console.log(\`\${name} is \${age} years old and lives in \${city}\`);
}

displayUser(person);
displayUser({ name: 'Bob', age: 25 });

// Nested destructuring
const data = {
  user: {
    id: 1,
    profile: {
      firstName: 'John',
      lastName: 'Doe'
    }
  }
};

const { user: { profile: { firstName, lastName } } } = data;
console.log('Full name:', firstName, lastName);`,
    },
    'Spread Operator': {
      title: 'Spread & Rest Operators',
      description: 'Expand and collect elements with the ... operator',
      code: `// Spread with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
const withExtra = [...arr1, 'extra', ...arr2];

console.log('Combined arrays:', combined);
console.log('With extra:', withExtra);

// Spread with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
const overridden = { ...obj1, b: 'new value', ...obj2 };

console.log('Merged objects:', merged);
console.log('With override:', overridden);

// Spread in function calls
const numbers = [1, 2, 3, 4, 5];
console.log('Max value:', Math.max(...numbers));
console.log('Min value:', Math.min(...numbers));

// Rest parameters in functions
function collectArgs(first, ...rest) {
  console.log('First argument:', first);
  console.log('Rest arguments:', rest);
  console.log('Total arguments:', rest.length + 1);
}

collectArgs('a', 'b', 'c', 'd');

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log('Head:', head);
console.log('Tail:', tail);

const { x, ...remaining } = { x: 1, y: 2, z: 3 };
console.log('x:', x);
console.log('Remaining:', remaining);

// Copying arrays (shallow copy)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log('Original:', original);
console.log('Copy:', copy);`,
    },
    'Template Literals': {
      title: 'Template Literals',
      description: 'Enhanced string formatting with embedded expressions',
      code: `// Basic template literals
const name = 'Alice';
const age = 30;
const greeting = \`Hello, my name is \${name} and I'm \${age} years old.\`;
console.log(greeting);

// Multi-line strings
const multiLine = \`
  This is a
  multi-line
  string that preserves
  formatting.
\`;
console.log(multiLine);

// Expression evaluation
const a = 5;
const b = 10;
console.log(\`The sum of \${a} and \${b} is \${a + b}\`);

// Function calls in templates
function formatDate(date) {
  return date.toLocaleDateString();
}

const today = new Date();
console.log(\`Today is \${formatDate(today)}\`);

// Conditional expressions
const score = 85;
const result = \`You \${score >= 60 ? 'passed' : 'failed'} the test!\`;
console.log(result);

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? \`**\${values[i]}**\` : '';
    return result + string + value;
  }, '');
}

const highlighted = highlight\`The user \${name} is \${age} years old.\`;
console.log('Highlighted:', highlighted);

// HTML template example
function createCard(title, content) {
  return \`
    <div class="card">
      <h2>\${title}</h2>
      <p>\${content}</p>
      <small>Created on \${new Date().toLocaleDateString()}</small>
    </div>
  \`;
}

console.log('HTML Card:');
console.log(createCard('Welcome', 'This is a sample card content.'));`,
    },
  },
  'Objects & Arrays': {
    Objects: {
      title: 'Objects & Methods',
      description: 'Working with JavaScript objects and their methods',
      code: `// Object creation and manipulation
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  hobbies: ['reading', 'gaming', 'cooking'],

  // Object methods
  getFullName: function() {
    return \`\${this.firstName} \${this.lastName}\`;
  },

  // ES6 method syntax
  introduce() {
    return \`Hi, I'm \${this.getFullName()} and I'm \${this.age} years old.\`;
  },

  // Method with parameters
  addHobby(hobby) {
    this.hobbies.push(hobby);
    console.log(\`Added hobby: \${hobby}\`);
  }
};

console.log('Full name:', person.getFullName());
console.log('Introduction:', person.introduce());
person.addHobby('photography');
console.log('Updated hobbies:', person.hobbies);

// Object.keys, Object.values, Object.entries
console.log('\\nObject methods:');
console.log('Keys:', Object.keys(person));
console.log('Values:', Object.values(person));
const entries = Object.entries(person);
console.log('Entries:', entries.slice(0, 3)); // First 3 entries

// Object.assign
const additionalInfo = { city: 'New York', country: 'USA' };
const extendedPerson = Object.assign({}, person, additionalInfo);
console.log('Extended person city:', extendedPerson.city);

// Property descriptors
Object.defineProperty(person, 'id', {
  value: 12345,
  writable: false,
  enumerable: false
});

console.log('Person ID:', person.id);
console.log('Keys after adding id:', Object.keys(person)); // id won't appear

// Computed property names
const dynamicKey = 'favoriteColor';
const personWithDynamicProp = {
  name: 'Alice',
  [dynamicKey]: 'blue',
  [\`\${dynamicKey}Count\`]: 1
};
console.log('Dynamic properties:', personWithDynamicProp);`,
    },
    Arrays: {
      title: 'Array Methods & Manipulation',
      description: 'Comprehensive array operations and methods',
      code: `// Array creation and basic operations
let fruits = ['apple', 'banana', 'orange'];
console.log('Original array:', fruits);

// Adding elements
fruits.push('grape'); // Add to end
fruits.unshift('mango'); // Add to beginning
console.log('After adding:', fruits);

// Removing elements
const lastFruit = fruits.pop(); // Remove from end
const firstFruit = fruits.shift(); // Remove from beginning
console.log('Removed:', lastFruit, firstFruit);
console.log('After removing:', fruits);

// Array methods for transformation
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - transform each element
const squared = numbers.map(n => n * n);
console.log('Squared:', squared);

// filter - select elements that meet criteria
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// reduce - combine all elements into single value
const sum = numbers.reduce((total, n) => total + n, 0);
const product = numbers.reduce((total, n) => total * n, 1);
console.log('Sum:', sum);
console.log('Product:', product);

// find and findIndex
const found = numbers.find(n => n > 5);
const foundIndex = numbers.findIndex(n => n > 5);
console.log('First number > 5:', found, 'at index', foundIndex);

// some and every
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);
console.log('Has even numbers:', hasEven);
console.log('All positive:', allPositive);

// includes and indexOf
console.log('Includes 5:', numbers.includes(5));
console.log('Index of 5:', numbers.indexOf(5));

// slice and splice
const sliced = numbers.slice(2, 5); // Extract portion
console.log('Sliced (2-5):', sliced);

const spliced = [...numbers];
spliced.splice(2, 2, 'new', 'values'); // Replace elements
console.log('After splice:', spliced);

// Array.from and spread
const arrayLike = 'hello';
const fromString = Array.from(arrayLike);
console.log('From string:', fromString);

const combined = [...fruits, ...evenNumbers.slice(0, 2)];
console.log('Combined:', combined);`,
    },
  },
  'Promises & Async': {
    Promises: {
      title: 'Promises & Promise Methods',
      description: 'Handle asynchronous operations with Promises',
      code: `// Basic Promise creation
const simplePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.3;
  setTimeout(() => {
    if (success) {
      resolve('Operation completed successfully!');
    } else {
      reject(new Error('Operation failed'));
    }
  }, 1000);
});

// Using Promise with .then() and .catch()
simplePromise
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.log('Error:', error.message);
  })
  .finally(() => {
    console.log('Promise completed (finally block)');
  });

// Promise chaining
function step1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Step 1 completed');
      resolve('Data from step 1');
    }, 500);
  });
}

function step2(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Step 2 completed with:', data);
      resolve('Data from step 2');
    }, 500);
  });
}

function step3(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Step 3 completed with:', data);
      resolve('Final result');
    }, 500);
  });
}

// Chained execution
step1()
  .then(result1 => step2(result1))
  .then(result2 => step3(result2))
  .then(finalResult => {
    console.log('All steps completed:', finalResult);
  })
  .catch(error => {
    console.log('Chain failed:', error);
  });

// Promise utility methods
const promise1 = Promise.resolve('Immediate success');
const promise2 = new Promise(resolve => setTimeout(() => resolve('Delayed success'), 1000));
const promise3 = Promise.resolve('Another success');
const failingPromise = Promise.reject(new Error('This will fail'));

// Promise.all - waits for all promises to resolve
Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('Promise.all results:', results);
  })
  .catch(error => {
    console.log('Promise.all failed:', error.message);
  });

console.log('Promise demonstrations started...');`,
    },
    'Async/Await': {
      title: 'Async/Await Syntax',
      description: 'Modern asynchronous programming with async/await',
      code: `// Utility functions that return promises
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: \`User\${userId}\`, email: \`user\${userId}@example.com\` });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, Math.random() * 1000 + 500);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const posts = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        title: \`Post \${i + 1} by User \${userId}\`,
        content: \`This is the content of post \${i + 1}\`
      }));
      resolve(posts);
    }, Math.random() * 800 + 300);
  });
}

// Basic async/await function
async function getUserInfo(userId) {
  try {
    console.log('Fetching user data...');
    const user = await fetchUserData(userId);
    console.log('User data received:', user);

    console.log('Fetching user posts...');
    const posts = await fetchUserPosts(userId);
    console.log('Posts received:', posts);

    return {
      user,
      posts,
      summary: \`\${user.name} has \${posts.length} posts\`
    };
  } catch (error) {
    console.error('Error in getUserInfo:', error.message);
    throw error; // Re-throw to let caller handle it
  }
}

// Using the async function
async function demonstrateAsyncAwait() {
  try {
    const userInfo = await getUserInfo(1);
    console.log('Complete user info:', userInfo);
  } catch (error) {
    console.log('Failed to get user info:', error.message);
  }
}

demonstrateAsyncAwait();

// Parallel execution with async/await
async function fetchMultipleUsers() {
  console.log('\\nFetching multiple users in parallel...');

  try {
    // Start all requests simultaneously
    const userPromises = [1, 2, 3].map(id => fetchUserData(id));

    // Wait for all to complete
    const users = await Promise.all(userPromises);

    console.log('All users fetched:', users.map(u => u.name));
    return users;
  } catch (error) {
    console.log('Failed to fetch multiple users:', error.message);
  }
}

fetchMultipleUsers();

console.log('Async/await demonstrations started (check logs over time)...');`,
    },
  },
};
