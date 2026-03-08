document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('gen-btn');
    const grid = document.getElementById('raffle-grid');

    const generate = () => {
        grid.innerHTML = ''; // Clear previous
        
        const type = document.getElementById('type').value;
        const ops = Array.from(document.querySelectorAll('.op:checked')).map(n => n.value);
        
        if (ops.length === 0) {
            alert("Please select at least one operation!");
            return;
        }

        for (let i = 1; i <= 12; i++) {
            const ticket = document.createElement('div');
            ticket.className = 'ticket';
            
            const op = ops[Math.floor(Math.random() * ops.length)];
            let a = Math.floor(Math.random() * 12) + 1;
            let b = Math.floor(Math.random() * 12) + 1;
            
            let mathTex = "";
            
            if (type === 'fraction') {
                mathTex = `\\frac{${a}}{${b+1}} ${op === '*' ? '\\times' : op} \\frac{1}{${a+1}} = `;
            } else if (type === 'integer') {
                a = a * (Math.random() > 0.5 ? 1 : -1);
                mathTex = `${a} ${op === '*' ? '\\times' : op} (${b}) = `;
            } else {
                mathTex = `${a} ${op === '*' ? '\\times' : op} ${b} = `;
            }

            ticket.innerHTML = `<span class="ticket-id">RAFFLE TICKET #${i}</span><div id="math-${i}"></div>`;
            grid.appendChild(ticket);

            // Render math immediately
            try {
                katex.render(mathTex, document.getElementById(`math-${i}`), {
                    throwOnError: false,
                    fontSize: "\\large"
                });
            } catch (err) {
                console.error("KaTeX failed:", err);
            }
        }
    };

    genBtn.addEventListener('click', generate);
    
    // Initial run
    generate();
});
