// app.js

// --- Utility Functions ---
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

// --- Math Generation Engine ---
class MathEngine {
  static generateNoCarryAdd() {
    // Ensures individual digits don't sum > 9
    let a1 = randInt(1, 8), a2 = randInt(1, 8);
    let b1 = randInt(1, 9 - a1), b2 = randInt(1, 9 - a2);
    return { a: a1 * 10 + a2, b: b1 * 10 + b2 };
  }

  static generateProblem(ops, type, noRegroup, useWords, showAns) {
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, texString, ansLogic, wordProblem = null;

    if (type === 'whole') {
      if (op === '+' && noRegroup) {
        const nums = this.generateNoCarryAdd();
        a = nums.a; b = nums.b;
      } else {
        a = randInt(0, 50); b = randInt(1, 50);
        if (op === '-' && a < b) [a, b] = [b, a]; // Avoid negatives for whole numbers
      }
      texString = `${a} ${op === '*' ? '\\times' : op === '/' ? '\\div' : op} ${b} = `;
      ansLogic = `Result: ${eval(a + (op==='*'? '*': op==='/'? '/': op) + b)}`;
    } 
    
    else if (type === 'integer') {
      a = randInt(-20, 20); b = randInt(-20, 20) || 1; // Prevent div by 0
      texString = `${a} ${op === '*' ? '\\times' : op === '/' ? '\\div' : op} ${b < 0 ? `(${b})` : b} = `;
      
      // Step-by-step logic for integers
      let signRule = "";
      if (op === '*') {
        signRule = (a < 0 && b < 0) ? "Negative \\times Negative = Positive" : 
                   (a < 0 || b < 0) ? "Negative \\times Positive = Negative" : "Positive \\times Positive = Positive";
      }
      ansLogic = `${signRule} \\\\ \\rightarrow ${eval(a + (op==='*'? '*': op==='/'? '/': op) + b)}`;
    }

    else if (type === 'decimal') {
      a = (randInt(100, 999) / 100).toFixed(2);
      b = (randInt(10, 99) / 10).toFixed(1);
      texString = `${a} ${op === '*' ? '\\times' : op} ${b} = `;
      
      // Vertical alignment logic for answers
      ansLogic = `
        \\begin{array}{r@{\\quad}l}
          ${a} \\\\
          ${op} \\, ${b} \\\\
          \\hline
          ${(parseFloat(a) + parseFloat(b)).toFixed(3)}
        \\end{array}
      `;
    }

    else if (type === 'fraction') {
      let n1 = randInt(1, 5), d1 = randInt(2, 6);
      let n2 = randInt(1, 5), d2 = randInt(2, 6);
      texString = `\\frac{${n1}}{${d1}} ${op === '*' ? '\\times' : op} \\frac{${n2}}{${d2}} = `;
      
      if (op === '+') {
        let currentLcm = lcm(d1, d2);
        ansLogic = `\\text{LCD is } ${currentLcm} \\rightarrow \\frac{${n1 * (currentLcm/d1)}}{${currentLcm}} + \\frac{${n2 * (currentLcm/d2)}}{${currentLcm}} = \\frac{${(n1 * (currentLcm/d1)) + (n2 * (currentLcm/d2))}}{${currentLcm}}`;
      } else {
        ansLogic = `\\text{Multiply straight across}`;
      }
    }

    // Word Problem Wrap
    if (useWords && type === 'whole') {
      if (op === '*') wordProblem = `If a library has ${a} shelves with ${b} books each, how many books are there in total?`;
      if (op === '+') wordProblem = `Alice collected ${a} stamps, and Bob gave her ${b} more. How many stamps does she have?`;
      // Convert to text but keep math in inline KaTeX
      texString = `\\text{Write the equation for the problem above.}`;
    }

    return { texString, ansLogic, wordProblem };
  }
}

// --- DOM Interaction ---
const generateBtn = document.getElementById('btn-generate');
const contentArea = document.getElementById('worksheet-content');

const renderWorksheet = () => {
  contentArea.innerHTML = ''; // Clear existing
  
  // Gather State
  const ops = [];
  if (document.getElementById('op-add').checked) ops.push('+');
  if (document.getElementById('op-sub').checked) ops.push('-');
  if (document.getElementById('op-mul').checked) ops.push('*');
  if (document.getElementById('op-div').checked) ops.push('/');
  
  if (ops.length === 0) ops.push('+'); // Fallback

  const type = document.getElementById('num-type').value;
  const noRegroup = document.getElementById('mod-noreg').checked;
  const useWords = document.getElementById('mod-word').checked;
  const showAns = document.getElementById('mod-ans').checked;

  // Generate 10 Problems
  for (let i = 1; i <= 10; i++) {
    const problem = MathEngine.generateProblem(ops, type, noRegroup, useWords, showAns);
    
    const container = document.createElement('div');
    container.className = 'problem-container';
    
    let htmlContent = `<strong>${i}.</strong> `;
    
    if (problem.wordProblem) {
      htmlContent += `<span>${problem.wordProblem}</span><br><br>`;
    }
    
    // Container for KaTeX rendering
    const mathDiv = document.createElement('div');
    container.innerHTML = htmlContent;
    container.appendChild(mathDiv);
    
    // Render Problem using KaTeX
    katex.render(problem.texString, mathDiv, { displayMode: true });

    // Render Answers if toggled
    if (showAns) {
      const ansDiv = document.createElement('div');
      ansDiv.className = 'answer-key';
      katex.render(problem.ansLogic, ansDiv, { displayMode: true });
      container.appendChild(ansDiv);
    }

    contentArea.appendChild(container);
  }
};

// Listeners
generateBtn.addEventListener('click', renderWorksheet);
document.addEventListener('DOMContentLoaded', renderWorksheet);
