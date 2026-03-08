const generateRaffle = () => {
  const container = document.getElementById('raffle-container');
  const type = document.getElementById('num-type').value;
  const showAns = document.getElementById('mod-ans').checked;
  
  // Get all checked operations
  const ops = Array.from(document.querySelectorAll('.op-check:checked')).map(el => el.value);
  if (ops.length === 0) ops.push('+');

  container.innerHTML = ''; // Clear board

  for (let i = 1; i <= 12; i++) {
    const op = ops[Math.floor(Math.random() * ops.length)];
    const ticket = document.createElement('div');
    ticket.className = 'ticket';

    // Basic Logic Generator
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    let tex = '';
    let ans = '';

    if (type === 'fraction') {
        tex = `\\frac{1}{${a}} ${op === '*' ? '\\times' : op} \\frac{1}{${b}} = ?`;
        ans = "Solve by finding the common denominator.";
    } else if (type === 'integer') {
        const signA = Math.random() > 0.5 ? 1 : -1;
        a = a * signA;
        tex = `${a} ${op === '*' ? '\\times' : op} ${b} = ?`;
        ans = `Result: ${eval(a + (op==='*'? '*': op))}`;
    } else {
        tex = `${a} ${op === '*' ? '\\times' : op} ${b} = ?`;
        ans = `Answer: ${eval(a + (op==='*'? '*': op))}`;
    }

    ticket.innerHTML = `
      <span class="ticket-num">TICKET #${i}</span>
      <div class="math-display" id="math-${i}"></div>
      ${showAns ? `<div class="answer-section" id="ans-${i}"></div>` : ''}
    `;

    container.appendChild(ticket);

    // Safe KaTeX Render
    try {
      window.katex.render(tex, document.getElementById(`math-${i}`));
      if(showAns) window.katex.render(ans, document.getElementById(`ans-${i}`));
    } catch (e) {
      document.getElementById(`math-${i}`).innerText = tex;
    }
  }
};

// Event Listeners
document.getElementById('btn-generate').onclick = generateRaffle;
window.onload = generateRaffle;
