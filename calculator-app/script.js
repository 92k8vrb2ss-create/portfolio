// Skript für die Calculator‑App
// Bietet grundlegende Rechenfunktionen und Eingabeverarbeitung.

// Referenz auf das Display
const display = document.getElementById('display');

// Fügt einen Wert oder Operator dem Display hinzu
function append(val) {
  display.value += val;
}

// Löscht das Display vollständig
function clearDisplay() {
  display.value = '';
}

// Löscht das letzte Zeichen
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Berechnet den aktuellen Ausdruck
function calculate() {
  if (display.value.trim() === '') return;
  try {
    // eval wird nur für einfache Rechenoperationen verwendet.
    const result = eval(display.value);
    display.value = result;
  } catch (error) {
    // Bei Fehlern wird das Display geleert
    display.value = '';
  }
}

// Zusätzliche Unterstützung: Drückt der Nutzer die Enter‑Taste, wird gerechnet
document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    calculate();
  }
});