// Variables globales
let count = 0;
let totalClicks = 0;
const maxClicks = 100;

// Elementos del DOM
const countElement = document.getElementById('count');
const historyElement = document.getElementById('history');
const progressElement = document.getElementById('progress');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// Inicializar la aplicación
function init() {
    updateDisplay();
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    incrementBtn.addEventListener('click', () => {
        count++;
        totalClicks++;
        updateDisplay();
        animateButton(incrementBtn);
    });
    
    decrementBtn.addEventListener('click', () => {
        if (count > 0) {
            count--;
            totalClicks++;
            updateDisplay();
            animateButton(decrementBtn);
        }
    });
    
    resetBtn.addEventListener('click', () => {
        count = 0;
        totalClicks++;
        updateDisplay();
        animateButton(resetBtn);
        
        // Efecto especial para reset
        document.querySelector('.counter-display').style.transform = 'scale(1.1)';
        setTimeout(() => {
            document.querySelector('.counter-display').style.transform = 'scale(1)';
        }, 200);
    });
}

// Actualizar la pantalla
function updateDisplay() {
    countElement.textContent = count;
    historyElement.textContent = totalClicks;
    
    // Actualizar barra de progreso (hasta maxClicks)
    const progressPercent = Math.min((totalClicks / maxClicks) * 100, 100);
    progressElement.style.width = `${progressPercent}%`;
    
    // Cambiar color según el contador
    if (count > 10) {
        countElement.style.color = '#00b09b';
    } else if (count > 5) {
        countElement.style.color = '#f7971e';
    } else {
        countElement.style.color = '#667eea';
    }
    
    // Agregar efecto de "pulse" cuando cambia
    countElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
    }, 150);
}

// Animación del botón
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

// Inicializar la app cuando cargue la página
document.addEventListener('DOMContentLoaded', init);

// Función extra: Simular clicks con teclado
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case '+':
        case 'ArrowUp':
            incrementBtn.click();
            break;
        case '-':
        case 'ArrowDown':
            decrementBtn.click();
            break;
        case 'r':
        case 'R':
        case '0':
            resetBtn.click();
            break;
    }
});