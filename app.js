const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const gameArea = document.getElementById('game-area');

let playerPosition = { x:100, y: 100 };
let enemyPosition = { x:300, y: 300 };

// Cambio 2: Puse un movimiento mas fluido al jugador ademas de que ahora se puede mover con las teclas W, A, S, D.
let playerSpeed = 1.75;
const keys = {};
const controlKeys = [
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'KeyW', 'KeyA', 'KeyS', 'KeyD'
];

window.addEventListener('keydown', (event) => {
    if (controlKeys.includes(event.code)) {
        event.preventDefault();
        keys[event.code] = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (controlKeys.includes(event.code)) {
        keys[event.code] = false;
    }
});

function movePlayer() {
    const maxX = gameArea.clientWidth - player.clientWidth;
    const maxY = gameArea.clientHeight - player.clientHeight;

    if (keys['ArrowUp']    || keys['KeyW']) playerPosition.y -= playerSpeed;
    if (keys['ArrowDown']  || keys['KeyS']) playerPosition.y += playerSpeed;
    if (keys['ArrowLeft']  || keys['KeyA']) playerPosition.x -= playerSpeed;
    if (keys['ArrowRight'] || keys['KeyD']) playerPosition.x += playerSpeed;

    playerPosition.x = Math.max(0, Math.min(maxX, playerPosition.x));
    playerPosition.y = Math.max(0, Math.min(maxY, playerPosition.y));
}

function clearKeys() {
    Object.keys(keys).forEach(k => keys[k] = false);
}

// Prompt: Por que al redimensionar la pagina o abrir una ventana mas pequeña el personaje se mueve solo en alguna direccion?
//         Sabes como lo puedo solucionar?
window.addEventListener('blur', clearKeys);
window.addEventListener('resize', clearKeys);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearKeys();
});

// Cambio 5: Modifique las velocidades de movimiento de Link y de Ganon (El cambio de link esta en la linea 9).
let enemySpeed = 0.75;

function moveEnemy() {
    
    if (enemyPosition.x < playerPosition.x) {
        enemyPosition.x += enemySpeed;
    } else if (enemyPosition.x > playerPosition.x) {
        enemyPosition.x -= enemySpeed;
    }

    if (enemyPosition.y < playerPosition.y) {
        enemyPosition.y += enemySpeed;
    } else if (enemyPosition.y > playerPosition.y) {
        enemyPosition.y -= enemySpeed;
    }
        updatePositions();
        checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    enemy.style.transform = `translate(${enemyPosition.x}px, ${enemyPosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - enemyPosition.x) < 50 && 
    Math.abs(playerPosition.y - enemyPosition.y) < 50) {
        alert('El destino de Hyrule ha caido en manos de Ganon, has perdido.');

playerPosition = { x: 100, y: 100 };
enemyPosition = { x: 300, y: 300 };
    }
}

function gameLoop() {
    moveEnemy();
    movePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function bindSetting(id, onChange) {
    const input = document.getElementById(id);
    const label = document.getElementById(id + '-value');

    input.addEventListener('input', () => {
        if (label) label.textContent = input.value;
        onChange(input.value);
    });

    input.addEventListener('change', () => input.blur());
}

bindSetting('player-speed', v => playerSpeed = Number(v));
bindSetting('enemy-speed',  v => enemySpeed = Number(v));

const music = document.getElementById('bg-music');
   music.volume = 0.25;

   function startMusic() {
       music.play()
   }
   window.addEventListener('keydown', startMusic);
   window.addEventListener('click', startMusic);

   bindSetting('music-volume', v => music.volume = Number(v));