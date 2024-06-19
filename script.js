import { cardLevels } from './resources/cards/actionCards.js';

/**
 * agregar que los golpes sean base a random(suerte), que puede pegar de n hasta la cant de espadas que tenga
 * cuando te atacan recibis ataqueEnemigo - escudoTuyo = daño recibido, y ese daño se resta a tu vida actual, y el escudo disminuye en 1
 */
const player = {
    health: 50,
    attack: 5,
    defense: 5,
    fase: 0,
    fightFase: 0
};

const estados = {
    inicio: Symbol(),
    fases: Symbol(),
    pelea: Symbol(),
    final: Symbol(),
};

let estado = estados.inicio;

let URLfondo = '';

const maxFases = 15;

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
    document.getElementById('story').style.top="0px";
    document.getElementById('story').style.transform="translate(-50%, 0)";

    document.getElementById('result').style.top="0px";
    document.getElementById('result').style.transform="translate(-50%, 0)";

    setTimeout(() => {
        document.getElementById('story').classList.remove('move-up');

    }, 2000);
}

function updateStatusBoss() {
    const statusPlayer = document.getElementById('statusFinalBoss');
    const textosStats = statusPlayer.querySelectorAll('p')
    textosStats[0].textContent = finalBoss.health;
    textosStats[1].textContent = finalBoss.attack;
    textosStats[2].textContent = finalBoss.defense;
}
function updateStatus() {
    const statusPlayer = document.getElementById('status');
    const textosStats = statusPlayer.querySelectorAll('p')
    textosStats[0].textContent = player.health;
    textosStats[1].textContent = player.attack;
    textosStats[2].textContent = player.defense;
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
    
    }, 4000); 


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
        }, 4000); // Espera 5 segundos antes de comenzar la reproducción
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
    }, 4000); // Este timeout debe ser igual a la duración de la transición en CSS
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
};

function fightFinalBoss() {
    let texto = "Te encuentras con el jefe final. ¿Qué haces?"
    // TODO a arreglar
    if (player.fightFase > 0) texto = "¿Cuál es tu siguiente acción?"
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
    finalBoss.puntosAtaque = getRandomInt(3,15);
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

    player.health += healthChange;
    player.attack += attackChange;
    player.defense += defenseChange;
    player.fase++;

    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (player.fase >= maxFases) {
        estado = estados.pelea;
        //document.getElementById('next-card').style.display = 'none';
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

function handleBossFight(event) {
    const action = event.target.dataset.action;
    document.getElementById('next-card').style.display = 'none';
    player.fightFase++;
    if (action === 'attack') {
        if(finalBoss.defense > 0)
            finalBoss.defense -= 1;
        if(player.attack - finalBoss.defense > 0)
            finalBoss.health -= player.attack - finalBoss.defense;

        if(player.defense > 0)
            player.defense -= 1;
        if(finalBoss.puntosAtaque - player.defense > 0)
            player.health -= finalBoss.puntosAtaque - player.defense;
        document.getElementById('result-text').textContent = "Atacas al jefe final y él te ataca a ti.";
    } else if (action === 'defend') {
        player.defense += getRandomInt(2,5);
        if(finalBoss.puntosAtaque - player.defense > 0)
            player.health -= finalBoss.puntosAtaque - player.defense;
        document.getElementById('result-text').textContent = "Te defiendes del ataque del jefe final.";
    }

    animateResultText();
    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (finalBoss.health <= 0) {
        estado = estados.final;
        update();
    } else {
        const options = document.querySelectorAll('.option');
        options[0].style.display = 'none';
        options[1].style.display = 'none';
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
        document.getElementById('puntos-ataque').style.opacity = 1;
    }
}

function resetGame() {
    player.health = 5;
    player.attack = 5;
    player.defense = 5;
    player.fase = 1;
    estado = estados.fases;
    updateStatus();
    update();
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
    if(estados.fases === estado) {
        const nextCard = getRandomCardIndex();
        updateFases(nextCard);
    }else if(estados.pelea === estado){
        const options = document.querySelectorAll('.option');
        options[0].style.display = 'inline-block';
        options[1].style.display = 'inline-block';
        updatePelea();
    }
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
