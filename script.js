import { cardLevels } from './resources/cards/actionCards.js';

const player = {
    health: 50,
    attack: 5,
    defense: 5,
    luck: 15,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0,
    idleAnimation: 'resources/personajes/guerrero/idle.gif',
    attackAnimation: 'resources/personajes/guerrero/attack.gif',
    defenseAnimation: 'resources/personajes/guerrero/defense.gif',
};

const ethanStats = {
    health: 10,
    attack: 5,
    defense: 5,
    luck: 15,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0,
    idleAnimation: 'resources/personajes/explorador/idle.gif',
    attackAnimation: 'resources/personajes/explorador/attack.gif',
    defenseAnimation: 'resources/personajes/explorador/defense.gif',
}

const aldricStats = {
    health: 15,
    attack: 5,
    defense: 5,
    luck: 15,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0,
    idleAnimation: 'resources/personajes/guerrero/idle.gif',
    attackAnimation: 'resources/personajes/guerrero/attack.gif',
    defenseAnimation: 'resources/personajes/guerrero/defense.gif',
}

const zephyrStats = {
    health: 20,
    attack: 5,
    defense: 5,
    luck: 15,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0,
    idleAnimation: 'resources/personajes/dios/idle.gif',
    attackAnimation: 'resources/personajes/dios/attack.gif',
    defenseAnimation: 'resources/personajes/dios/defense.gif',
}

const constDishStats = {
    health: 25,
    attack: 5,
    defense: 5,
    luck: 15,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0,
    idleAnimation: 'resources/personajes/doncella/idle.gif',
    attackAnimation: 'resources/personajes/doncella/attack.gif',
    defenseAnimation: 'resources/personajes/doncella/defense.gif',
}

const estados = {
    inicio: Symbol(),
    fases: Symbol(),
    pelea: Symbol(),
    final: Symbol(),
};

let estado = estados.inicio;

let URLfondo = '';

const maxFases = 1;

const tiempoAnimacion = 500;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Personajes = {
    ETHAN: 'Ethan',
    ALDRIC: 'Aldric',
    ZEPHYR: 'Zephyr',
    DISH_WASHINGTON: 'Dish Washington'
};

let personajeSeleccionado;

function startGame(event) {
    const character = event.target.dataset.character;
    personajeSeleccionado = Personajes[character.toUpperCase().replace(' ', '_')];
    document.getElementById('character-selection').style.display = 'none';
    document.getElementById('game-view').style.display = 'block';
    console.log('Personaje seleccionado:', personajeSeleccionado);

    switch (personajeSeleccionado) {
        case Personajes.ETHAN:
            Object.assign(player, ethanStats);
            break;
        case Personajes.ALDRIC:
            Object.assign(player, aldricStats);
            break;
        case Personajes.ZEPHYR:
            Object.assign(player, zephyrStats);
            break;
        case Personajes.DISH_WASHINGTON:
            Object.assign(player, constDishStats);
            break;
        default:
            console.error('Personaje desconocido:', personajeSeleccionado);
    }

    document.getElementById('player').src = player.idleAnimation;
    estado = estados.fases;
    updateStatus();
}

function update() {
    if (estado === estados.inicio) {
        updateInicio();
    } else if (estado === estados.fases) {
        updateFases(getRandomCardIndex());
    } else if (estado === estados.pelea) {
        updatePelea();
    } else if (estado === estados.final) {
        updateFinal();
    }
}

function updateInicio() {
    document.getElementById('story-text').textContent = '¡Bienvenido a la aventura! ¿Estás listo para comenzar?';
    const options = document.querySelectorAll('.option');
    options[0].style.display = 'none';
    options[1].style.display = 'none';
    options[2].style.display = 'none';
    options[3].style.display = 'none';
    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    const siguiente = document.getElementById('next-card');
    siguiente.style.display = 'inline-block';
    siguiente.addEventListener('click', () => {
        initializeAudioContext();
        estado = estados.fases;
        update();
    });
}

function updatePelea() {
    updateStatusBoss();
    fightFinalBoss();
}

function updateFinal() {
    alert('¡Has ganado el juego!');
    resetGame();
}

function animateStoryToFinalBoss() {
    document.querySelector('body').style.backgroundImage = "url('resources/images/fondos/Arena.png')";
    const options = document.querySelectorAll('.option');
    options[2].style.display = 'none';
    options[3].style.display = 'none';

    document.getElementById('statusFinalBoss').classList.remove('invisible');
    document.getElementById('finalBossEnemy').classList.remove('invisible');
    document.getElementById('finalPlayer').classList.remove('invisible');
    document.getElementById('story').classList.add('move-up');
    document.getElementById('story').style.top = "0px";
    document.getElementById('story').style.transform = "translate(-50%, 0)";

    document.getElementById('result').style.top = "0px";
    document.getElementById('result').style.transform = "translate(-50%, 0)";

    setTimeout(() => {
        document.getElementById('story').classList.remove('move-up');
    }, 2000);
}

function updateStatusBoss() {
    document.getElementById('boss-health').textContent = finalBoss.health;
    document.getElementById('boss-attack').textContent = finalBoss.attack;
    document.getElementById('boss-defense').textContent = finalBoss.defense;
}

function updateStatus() {
    document.getElementById('health').textContent = player.health;
    document.getElementById('attack').textContent = player.attack;
    document.getElementById('defense').textContent = player.defense;
    if (player.fase < maxFases) {
        document.getElementById('fase').textContent = `Fase: ${player.fase} / ${maxFases}`;
    } else {
        document.getElementById('fase').textContent = `Final Boss`;
    }
}

function updateFases(cardIndex) {

    cambiarFondo(URLfondo);

    setTimeout(() => {
        
        const card = cardLevels[cardIndex];
        document.getElementById('story-text').textContent = card.text;
        const options = document.querySelectorAll('.option');
        card.options.forEach((option, index) => {
            options[index].textContent = option.text;
            options[index].dataset.health = option.health;
            options[index].dataset.attack = option.attack;
            options[index].dataset.defense = option.defense;
            options[index].dataset.result = option.result;
        });
    
        document.querySelectorAll('#options .option').forEach(option => {
            option.style.display = 'inline-block';
        });
        document.getElementById('story').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('next-card').style.display = 'none';
    
    }, tiempoAnimacion); 


}

//--------------------Manejo de audio--------------------

let audioContext;
let gainNode;
const audioElement = document.getElementById('audio');


function initializeAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const track = audioContext.createMediaElementSource(audioElement);
        gainNode = audioContext.createGain();
        track.connect(gainNode).connect(audioContext.destination);
    }
}

// Fade in function
function fadeIn() {
    initializeAudioContext();
    audioContext.resume().then(() => {
        setTimeout(() => {
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 3); // 2 seconds fade in
            audioElement.play();
        }, tiempoAnimacion); // Espera 5 segundos antes de comenzar la reproducción
    });
}


// Fade out function
function fadeOut() {
    initializeAudioContext();
    audioContext.resume().then(() => {
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2); // 2 seconds fade out
        setTimeout(() => {
            audioElement.pause();
        }, 2000); // Match the fade out duration
    });
}

function playBackgroundMusic(audioSrc) {
    audioElement.src = audioSrc;
    fadeIn();
}

//--------------------Manejo de fondo--------------------

function cambiarFondo(URLfondo){
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('fadeToBlack');
    setTimeout(() => {
        document.body.style.backgroundImage = "url("+URLfondo+")";
        setTimeout(() => {
            overlay.classList.remove('fadeToBlack');
        }, 100); // Agrega un pequeño delay para asegurar que se complete la transición antes de remover la clase
    }, tiempoAnimacion); // Este timeout debe ser igual a la duración de la transición en CSS
};


function getRandomCardIndex() {
    const card = getRandomInt(0,2);
    let audioSrc = '';

    switch(card) {
        case 0:
            audioSrc = 'resources/sounds/Escenarios/Sombra te espia.ogg';
            URLfondo = 'resources/images/fondos/bosque.png';
            break;
        case 1:
            audioSrc = 'resources/sounds/Escenarios/Orda de elfos.ogg';
            URLfondo = 'resources/images/fondos/duendes.jpg';
            break;
        default:
            console.log('Card no válida');
    }

    playBackgroundMusic(audioSrc);
    return card;
}

const finalBoss = {
    health: 10,
    attack: 10,
    defense: 10,
    puntosAtaque: 0,
    idleAnimation: 'resources/personajes/boss/BossEstatico.gif',
    attackAnimation: 'resources/personajes/boss/BossAtacando.gif',
};

function fightFinalBoss() {
    let texto = "Te encuentras con el jefe final. ¿Qué haces?";
    if (player.fightFase > 0) texto = "¿Cuál es tu siguiente acción?";
    document.getElementById('story-text').textContent = texto;
    const options = document.querySelectorAll('.option');
    options[0].textContent = "Atacar";
    options[0].dataset.action = 'attack';
    options[1].textContent = "Defender";
    options[1].dataset.action = 'defend';

    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('next-card').style.display = 'none';
    document.getElementById('puntos-ataque').style.opacity = 1;
    let pAtaque = document.getElementById('puntos-ataque');
    finalBoss.puntosAtaque = getRandomInt(3, 15);
    pAtaque.textContent = finalBoss.puntosAtaque;
    document.querySelectorAll('#options .option').forEach(option => {
        option.addEventListener('click', handleBossFight);
    });
}

function handleOptionClick(event) {
    const healthChange = parseInt(event.target.dataset.health);
    const attackChange = parseInt(event.target.dataset.attack);
    const defenseChange = parseInt(event.target.dataset.defense);
    const resultText = event.target.dataset.result;

    updateStats('health', healthChange);
    updateStats('attack', attackChange);
    updateStats('defense', defenseChange);
    player.fase++;

    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (player.fase >= maxFases) {
        estado = estados.pelea;
        animateStoryToFinalBoss();
        update();
    } else {
        document.getElementById('result-text').textContent = resultText;
        document.querySelectorAll('#options .option').forEach(option => {
            option.style.display = 'none';
        });
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
    }
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function animateResultText() {
    const resultText = document.getElementById('result-text');
    resultText.classList.add('animateFightText');
    setTimeout(() => {
        resultText.classList.remove('animateFightText');
    }, 3000);
}

async function handleBossFight(event) {
    const options = document.querySelectorAll('.option');
    const action = event.target.dataset.action;
    document.getElementById('next-card').style.display = 'none';
    player.fightFase++;
    const luckFactor = getLuckFactor(player.luck);

    options.forEach(option => {
        option.disabled = true
    });
    document.getElementById('next-card').disabled = true;

    if (action === 'attack') {
        document.getElementById('result-text').textContent = "Atacas al jefe final y él te ataca a ti.";
        
        // Animación de ataque
        const playerElement = document.getElementById('player');
        const originalPosition = playerElement.style.transform;

        playerElement.style.transition = 'transform .8s';
        playerElement.style.transform = 'translate(150px, -100px)';
        playerElement.src = player.attackAnimation;
        
        const attackStrength = Math.ceil(player.attack * (1 + luckFactor));

        await sleep(500);
        if (finalBoss.defense > 0) {
            updateBossStats('defense', -1);
        }

        if (attackStrength - finalBoss.defense > 0) {
            updateBossStats('health', -(attackStrength - finalBoss.defense));
        }
        await sleep(500);
        playerElement.style.transform = originalPosition;
        playerElement.src = player.idleAnimation;

        await sleep(200);

        // Animación de ataque del jefe
        const bossElement = document.getElementById('enemy');
        const originalPositionBoss = bossElement.style.transform;

        bossElement.style.transition = 'transform .8s';
        bossElement.style.transform = 'translate(-150px, 100px)';
        bossElement.src = finalBoss.attackAnimation;

        await sleep(400);
        if (player.defense > 0) {
            updateStats('defense', -1);
        }
        const bossAttackStrength = Math.ceil(finalBoss.puntosAtaque * (1 + luckFactor));
        if (bossAttackStrength - player.defense > 0) {
            const damage = bossAttackStrength - player.defense;
            updateStats('health', -damage);
        }
        await sleep(400);
        bossElement.style.transform = originalPositionBoss;
        bossElement.src = finalBoss.idleAnimation;


    } else if (action === 'defend') {
        document.getElementById('result-text').textContent = "Te defiendes del ataque del jefe final.";

        // Animación de ataque del jefe
        const bossElement = document.getElementById('enemy');
        const originalPositionBoss = bossElement.style.transform;

        bossElement.style.transition = 'transform .8s';
        bossElement.style.transform = 'translate(-150px, 100px)';
        bossElement.src = finalBoss.attackAnimation;
        const defenseBoost = Math.ceil(getRandomInt(2, 5) * (1 + luckFactor));
        player.temporaryDefense = defenseBoost;
        updateStats('defense', defenseBoost);
        
        await sleep(300);
        const playerElement = document.getElementById('player');
        playerElement.src = player.defenseAnimation;

        await sleep(400);
        playerElement.src = player.idleAnimation;
        bossElement.src = finalBoss.idleAnimation;

        await sleep(200);
        const bossAttackStrength = Math.ceil(finalBoss.puntosAtaque * (1 + luckFactor));
        if (bossAttackStrength - player.defense > 0) {
            const damage = bossAttackStrength - player.defense;
            updateStats('health', -damage);
        }
        await sleep(170);
        bossElement.style.transform = originalPositionBoss;

    }

    options.forEach(option => {
        option.disabled = false
    });
    document.getElementById('next-card').disabled = false;

    animateResultText();
    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (finalBoss.health <= 0) {
        estado = estados.final;
        update();
    } else {
        
        options[0].style.display = 'none';
        options[1].style.display = 'none';
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
        document.getElementById('puntos-ataque').style.opacity = 1;
    }
}

function resetGame() {
    player.health = 50;
    player.attack = 5;
    player.defense = 5;
    player.luck = 15;
    player.fase = 1;
    player.fightFase = 0;
    player.temporaryDefense = 0;
    finalBoss.health = 10;
    finalBoss.attack = 10;
    finalBoss.defense = 10;
    finalBoss.puntosAtaque = 0;
    estado = estados.fases;
    updateStatus();
    updateStatusBoss();
    update();
}

function getLuckFactor(playerLuck) {
    return Math.random() * (playerLuck / 100);
}

function updateStats(stat, value) {
    if (value === 0) return;

    const statElement = document.getElementById(stat);
    player[stat] += value;
    updateStatus();

    const animClass = value > 0 ? 'stat-increase' : 'stat-decrease';
    statElement.classList.add(animClass);
    setTimeout(() => {
        statElement.classList.remove(animClass);
    }, 1000);
}

function updateBossStats(stat, value) {
    if (value === 0) return;

    const statElement = document.getElementById(`boss-${stat}`);
    finalBoss[stat] += value;
    updateStatusBoss();

    const animClass = value > 0 ? 'stat-increase' : 'stat-decrease';
    statElement.classList.add(animClass);
    setTimeout(() => {
        statElement.classList.remove(animClass);
    }, 1000);
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', (event) => {
        if(estados.fases === estado) {
            fadeOut();
            handleOptionClick(event);
        }
    })
});

document.getElementById('next-card').addEventListener('click', () => {
    if (estados.fases === estado) {
        const nextCard = getRandomCardIndex();
        updateFases(nextCard);
    } else if (estados.pelea === estado) {
        const options = document.querySelectorAll('.option');
        options[0].style.display = 'inline-block';
        options[1].style.display = 'inline-block';
        if (player.temporaryDefense > 0) {
            updateStats('defense', -player.temporaryDefense);
            player.temporaryDefense = 0;
        }
        updatePelea();
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const startButtons = document.querySelectorAll('.start-button');

    startButtons.forEach(button => {
        button.addEventListener('click', startGame);
    });
});

updateStatus();
update();

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.soundNormalClick');
    const clickSound = new Audio('resources/sounds/Interfaz/Click comun.wav');
    initializeAudioContext()

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            clickSound.play();
        });
    });
});
