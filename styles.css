:root {
  --ticket-bg: #fff;
  --ticket-border: #cbd5e1;
  --accent: #4f46e5;
}

body { font-family: sans-serif; background: #f1f5f9; margin: 0; }
.app-container { display: flex; min-height: 100vh; }

.sidebar { width: 260px; padding: 20px; background: #fff; border-right: 2px solid #e2e8f0; }
.control-group { margin-bottom: 20px; }
.primary-btn { width: 100%; padding: 12px; background: var(--accent); color: #fff; border: none; border-radius: 8px; cursor: pointer; }

.raffle-board {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 30px;
  justify-content: center;
}

/* Raffle Ticket Card Styling */
.ticket {
  width: 280px;
  min-height: 180px;
  background: var(--ticket-bg);
  border: 2px dashed var(--ticket-border);
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
}

.ticket-num { position: absolute; top: 10px; left: 10px; font-size: 0.8rem; color: #94a3b8; }
.math-display { font-size: 1.5rem; margin: 15px 0; }
.answer-section { border-top: 1px solid #f1f5f9; padding-top: 10px; color: #64748b; font-size: 0.9rem; }

@media print {
  .no-print { display: none; }
  .raffle-board { padding: 0; }
  .ticket { page-break-inside: avoid; border: 1px dashed #000; }
}
