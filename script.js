// Variables globales
let count = 0;
let totalClicks = 0;
const maxClicks = 100;

// Variables para el timer
let timerInterval;
let timeLeft = 5 * 60; // 5 minutos en segundos
let isTimerRunning = false;

// Elementos del DOM
const countElement = document.getElementById('count');
const historyElement = document.getElementById('history');
const progressElement = document.getElementById('progress');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// Modo oscuro
const darkModeBtn = document.getElementById('dark-mode');
let darkMode = false;

// Función para toggle modo oscuro
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    
    // Cambiar ícono
    const icon = darkModeBtn.querySelector('i');
    icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    darkModeBtn.innerHTML = `<i class="${icon.className}"></i> ${darkMode ? 'Modo Claro' : 'Modo Oscuro'}`;
    
    // Animación
    animateButton(darkModeBtn);
}

// Funciones para el timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = 
        minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = 
        seconds.toString().padStart(2, '0');
    
    // Animación cuando queda poco tiempo
    const timerDisplay = document.querySelector('.timer-display');
    if (timeLeft <= 30) {
        timerDisplay.classList.add('timer-alert');
    } else {
        timerDisplay.classList.remove('timer-alert');
    }
    
    // Alarma cuando termina
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        document.title = "⏰ ¡Tiempo terminado!";
        alert("¡Tiempo terminado! 🎉");
    }
}

function startTimer() {
    if (!isTimerRunning && timeLeft > 0) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            document.title = `${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')} - Contador`;
        }, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    const minutesInput = parseInt(document.getElementById('set-minutes').value) || 5;
    timeLeft = minutesInput * 60;
    updateTimerDisplay();
    document.title = "Contador de Clicks";
}

function setTimerMinutes() {
    if (!isTimerRunning) {
        const minutes = parseInt(document.getElementById('set-minutes').value) || 5;
        timeLeft = minutes * 60;
        updateTimerDisplay();
    }
}

// Inicializar la aplicación
function init() {
    updateTimerDisplay();
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
    darkModeBtn.addEventListener('click', () => {
        toggleDarkMode();
    });

    // Timer event listeners
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
    document.getElementById('set-minutes').addEventListener('change', setTimerMinutes);
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