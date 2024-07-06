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
    health: 20,
    attack: 5,
    defense: 10,
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
    attack: 10,
    defense: 10,
    luck: 5,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0,
    idleAnimation: 'resources/personajes/guerrero/idle.gif',
    attackAnimation: 'resources/personajes/guerrero/attack.gif',
    defenseAnimation: 'resources/personajes/guerrero/defense.gif',
}

const zephyrStats = {
    health: 25,
    attack: 8,
    defense: 8,
    luck: 40,
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
    luck: 30,
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

let booleanArray = new Array(23).fill(false); //Arreglo que representa las cards
//En caso de ser "false" la card no ha sido usada, en caso de ser "true" la card ya fue usada

let estado = estados.inicio;

let URLfondo = '';

const maxFases = 15;

let cooldownDefensa = 0;

const tiempoAnimacion = 3000;

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
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.volume = .15;
    });
    document.querySelector('#start-game button').addEventListener('click', () => {
        document.getElementById('start-game').style.display = 'none';
        animateTransitionToSelectCharacter();
    });
}
async function animateTransitionToSelectCharacter() {
    const characterSelection = document.getElementById('character-selection');
    characterSelection.style.display = 'flex';
    setTimeout(()=> {
        characterSelection.style.pointerEvents = 'auto';
    }, 1000)

    await sleep(10);
    characterSelection.style.width = '100%';
    seleccionarPersonaje()
}

document.getElementById('volume').addEventListener('input', function(event) {
    const volume = event.target.value;
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.volume = volume/100;
    });
});

document.querySelector('.volume-control').addEventListener('mouseover', function() {
    document.getElementById('volume').classList.remove('hidden');
});

document.querySelector('.volume-control').addEventListener('mouseout', function() {
    document.getElementById('volume').classList.add('hidden');
});

function seleccionarPersonaje() {
    document.getElementById('story-text').textContent = 'Esta es tu aventura, tú decides su final. ¿Estás listo?';
    const options = document.querySelectorAll('.option');
    options[0].style.display = 'none';
    options[1].style.display = 'none';
    options[2].style.display = 'none';
    options[3].style.display = 'none';
    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    const siguiente = document.getElementById('next-card');
    siguiente.textContent = '¡Estoy listo!';
    siguiente.style.display = 'inline-block';
    siguiente.addEventListener('click', () => {
        siguiente.textContent = 'Siguiente';
        initializeAudioContext();
        if (estado === estados.inicio){
            estado = estados.fases;
            update();
        }
    });
}

function updatePelea() {
    updateStatusBoss();
    fightFinalBoss();
}

function updateFinal() {

    // Detener audio de fondo
    audioElement.pause();
    // Nuevo audio de fondo: Final/defeat
    audioElement.src = 'resources/sounds/Final/victory.mp3';
    fadeIn();

    document.getElementById('story-text').textContent = '¡Felicidades! ¡Has derrotado al jefe final! ¿Quieres jugar de nuevo?';
    centerStory();

    showRestartButton();

    // Fade out del boss
    const bossElement = document.getElementById('finalBossEnemy');
    bossElement.style.transition = 'opacity 2s';
    bossElement.style.opacity = 0;

    document.getElementById('story').style.display = 'none';

    // Mostrar story luego de que el boss desaparezca
    setTimeout(() => {
        document.getElementById('story').style.display = 'block';
    }, 2000);

    calculateAndDisplayTotal();
}

function centerStory() {
    const story = document.getElementById('story');
    story.style.top = "50%";
    story.style.transform = "translate(-50%, -50%)";
}

// Mostrar boton de reiniciar
function showRestartButton() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.display = 'none';
    });

    // cambiar texto de siguiente
    document.getElementById('next-card').textContent = 'Reiniciar';
    // Mostrar opcion de siguiente en opciones
    document.getElementById('next-card').style.display = 'inline-block';
    // Agregar evento de reinicio
    document.getElementById('next-card').addEventListener('click', () => {
        location.reload();
    });
}

// Función para sumar los valores de health, attack y defense
function calculateAndDisplayTotal() {
    // Aumentar tamaño de fuente de story-text
    document.getElementById('story-text').style.fontSize = '1.5em';

    const total = player.health + player.attack + player.defense;

    document.getElementById('total').style.display = 'block';
    document.getElementById('total-value').textContent = `${total}`;
}

function animateStoryToFinalBoss() {
    const options = document.querySelectorAll('.option');
    options[0].style.display = 'inline-block';
    options[1].style.display = 'inline-block';
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

    player.fase++;
    updateStatus();

    if (player.fase >= maxFases) {
        const audioSrc = 'resources/sounds/Boss Final/Batalla Final.wav';
        URLfondo = 'resources/images/fondos/Arena.png';
        cambiarFondo(URLfondo);
        playBackgroundMusic(audioSrc);
        estado = estados.pelea;
        document.getElementById('story-text').style.display = 'none';
        setTimeout(() => {
            document.getElementById('story-text').style.display = 'block';
            animateStoryToFinalBoss();
        }, tiempoAnimacion);
        update();
    }else{

    cambiarFondo(URLfondo);

    updateStatus();

    setTimeout(() => {
        
        const card = cardLevels[cardIndex];
        document.getElementById('story-text').textContent = card.text;
        const options = document.querySelectorAll('.option');
        card.options.forEach((option, index) => {
            options[index].textContent = option.text;
            options[index].dataset.health = option.health;
            options[index].dataset.attack = option.attack;
            options[index].dataset.defense = option.defense;
            options[index].dataset.suerte = option.suerte;
            options[index].dataset.result = option.result;
            options[index].dataset.sound = option.sound;
        });
    
        document.querySelectorAll('#options .option').forEach(option => {
            option.style.display = 'inline-block';
        });
        document.getElementById('story').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('next-card').style.display = 'none';
    
    }, tiempoAnimacion); 

}
}

//--------------------Manejo de audio--------------------

let audioContext;
let gainNode;
let audioNextSrc = 'resources/sounds/Acciones/No Free/Caminando.wav';
const audioNext = document.getElementById('audioNext');
const audioAccion = document.getElementById('audioAccion');
const audioElement = document.getElementById('audio');
const audioPj = document.getElementById('audioPj');
const audioBoss = document.getElementById('audioBoss');


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

    let sinUsar = false;

    let card = -1;

    while(!sinUsar){
        card = getRandomInt(0,23);
        if(!booleanArray[card]){
            booleanArray[card] = true;
            sinUsar = true;
        }
    }

    let audioSrc = '';

    switch(card) {
        case 0:
            audioSrc = 'resources/sounds/Escenarios/Bosque oscuro.ogg'; //cambiar
            URLfondo = 'resources/images/fondos/0.jpg';
            break;
        case 1:
            audioSrc = 'resources/sounds/Escenarios/Orda de elfos.ogg';
            URLfondo = 'resources/images/fondos/1.jpg';
            break;
        case 2:
            audioSrc = 'resources/sounds/Escenarios/Manantial.ogg';
            URLfondo = 'resources/images/fondos/2.jpg';
            break;
        case 3:
            audioSrc = 'resources/sounds/Escenarios/Cavernas.ogg';//
            URLfondo = 'resources/images/fondos/3.jpg';
            break;
        case 4:
            audioSrc = 'resources/sounds/Escenarios/Mago misterioso.ogg';//
            URLfondo = 'resources/images/fondos/4.jpg';
            break;
        case 5:
            audioSrc = 'resources/sounds/Escenarios/Niños te ofrecen un regalo.ogg'; //
            URLfondo = 'resources/images/fondos/5.jpg';
            break;
        case 6:
            audioSrc = 'resources/sounds/Escenarios/Lobo te ataca.ogg';
            URLfondo = 'resources/images/fondos/6.jpg';
            break;
        case 7:
            audioSrc = 'resources/sounds/Escenarios/Puente roto.wav';
            URLfondo = 'resources/images/fondos/7.jpg';
            break;
        case 8:
            audioSrc = 'resources/sounds/Escenarios/Elfa Pacifica.ogg';
            URLfondo = 'resources/images/fondos/8.jpg';
            break;
        case 9:
            audioSrc = 'resources/sounds/Escenarios/Pantano.wav';
            URLfondo = 'resources/images/fondos/9.jpg';
            break;
        case 10:
            audioSrc = 'resources/sounds/Escenarios/Aldea indigena.wav';
            URLfondo = 'resources/images/fondos/10.jpg';
            break;
        case 11:
            audioSrc = 'resources/sounds/Escenarios/Avance de artilleria.ogg';
            URLfondo = 'resources/images/fondos/11.jpg';
            break;
        case 12:
            audioSrc = 'resources/sounds/Escenarios/Cueva del dragon.wav';
            URLfondo = 'resources/images/fondos/12.jpg';
            break;
        case 13:
            audioSrc = 'resources/sounds/Escenarios/Mausoleo.ogg';
            URLfondo = 'resources/images/fondos/13.jpg';
            break;
        case 14:
            audioSrc = 'resources/sounds/Escenarios/En el mercadito.wav';
            URLfondo = 'resources/images/fondos/14.jpg';
            break;
        case 15:
            audioSrc = 'resources/sounds/Escenarios/Encuentra insignia.ogg';
            URLfondo = 'resources/images/fondos/15.jpg';
            break;
        case 16:
            audioSrc = 'resources/sounds/Escenarios/Personaje oriental.ogg';
            URLfondo = 'resources/images/fondos/16.jpg';
            break;
        case 17:
            audioSrc = 'resources/sounds/Escenarios/Llueven flores.ogg';
            URLfondo = 'resources/images/fondos/17.jpg';
            break;
        case 18:
            audioSrc = 'resources/sounds/Escenarios/Caballeros impiden paso.ogg';
            URLfondo = 'resources/images/fondos/18.jpg';
            break;
        case 19:
            audioSrc = 'resources/sounds/Escenarios/Miembros de la realeza.wav';
            URLfondo = 'resources/images/fondos/19.jpg';
            break;
        case 20:
            audioSrc = 'resources/sounds/Escenarios/Pequeño timido.ogg';
            URLfondo = 'resources/images/fondos/20.jpg';
            break;
        case 21:
            audioSrc = 'resources/sounds/Escenarios/Apuestas.wav';
            URLfondo = 'resources/images/fondos/21.jpg';
            break;
        case 22:
            audioSrc = 'resources/sounds/Escenarios/Casa de la bruja.ogg';
            URLfondo = 'resources/images/fondos/22.jpg';
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
    if(cooldownDefensa > 0){
        options[1].textContent = `Defender (${cooldownDefensa})`;
    } else {
        options[1].textContent = "Defender";
    }
    options[1].dataset.action = 'defend';

    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('next-card').style.display = 'none';
    document.getElementById('puntos-ataque').style.opacity = 1;
    let pAtaque = document.getElementById('puntos-ataque').querySelector('span');
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
    const luckChange = parseInt(event.target.dataset.suerte);
    let audioSrc = event.target.dataset.sound;
    const resultText = event.target.dataset.result;

    if (audioSrc) {
        audioAccion.src = audioSrc;
        audioAccion.volume = 0.3;
        audioAccion.play();
        audioSrc = '';
    }


    updateStats('health', healthChange);
    updateStats('attack', attackChange);
    updateStats('defense', defenseChange);
    player.luck += luckChange;

    updateStatus();

    if (player.health <= 0) {

        // Detener audio de fondo
        audioElement.pause();
        // Nuevo audio de fondo: Final/defeat
        audioElement.src = 'resources/sounds/Final/defeat.mp3';
        fadeIn();

        document.getElementById('result-text').textContent = resultText;
        document.querySelectorAll('#options .option').forEach(option => {
            option.style.display = 'none';
        });
        // Mostrar resultado
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';

        // Esperar 5 segundos antes de cambiar el texto
        setTimeout(() => {
            document.getElementById('story-text').textContent = 'Has perdido el juego. Vuelve a intentarlo.';
            centerStory();
            document.getElementById('result').style.display = 'none';
            document.getElementById('story').style.display = 'block';
            showRestartButton();
        }, 5000);
    }
    else {
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
    options[1].disabled = true
    if (cooldownDefensa > 0) {
        cooldownDefensa--;
    }
    document.getElementById('next-card').disabled = true;

    if (action === 'attack') {
        document.getElementById('result-text').textContent = "Atacas al jefe final y él te ataca a ti.";
        
        // Animación de ataque
        const playerElement = document.getElementById('player');
        const originalPosition = playerElement.style.transform;

        let audioRandom = getRandomInt(0, 2);
        switch (personajeSeleccionado) {
            case Personajes.ETHAN:
                audioPj.volume = 0.4;
                if(audioRandom === 0){
                    audioPj.src = 'resources/sounds/Acciones/Espadazo ligero.wav';
                } else {
                    audioPj.src = 'resources/sounds/Acciones/Espadazo medio.wav';
                }
                break;
            case Personajes.ALDRIC:
                if(audioRandom === 0){
                    audioPj.volume = 0.3;
                    audioPj.src = 'resources/sounds/Boss Final/Ataque Aldric 1.wav';
                } else {
                    audioPj.volume = 0.3;
                    audioPj.src = 'resources/sounds/Boss Final/Ataque Aldric 2.wav';
                }
                break;
            case Personajes.ZEPHYR:
                if(audioRandom === 0){
                    audioPj.volume = 0.4;
                    audioPj.src = 'resources/sounds/Boss Final/Ataque Dios 1.wav';
                } else {
                    audioPj.volume = 0.2;
                    audioPj.src = 'resources/sounds/Boss Final/Ataque Dios 2.wav';
                }
                break;
            case Personajes.DISH_WASHINGTON:
                if(audioRandom === 0){
                    audioPj.volume = 0.2;
                    audioPj.src = 'resources/sounds/Boss Final/Ataque Dish 1.wav';
                } else {
                    audioPj.volume = 0.2;
                    audioPj.src = 'resources/sounds/Boss Final/Ataque Dish 2.wav';
                }
                break;
                break;
            default:
                console.error('Personaje desconocido:', personajeSeleccionado);
        }
        audioPj.play();

        await sleep(200);

        playerElement.style.transition = 'transform .8s';
        playerElement.style.transform = 'translate(150px, -100px)';
        playerElement.src = player.attackAnimation;

        
        const attackStrength = Math.ceil(player.attack * (1 + luckFactor));

        audioRandom = getRandomInt(0, 2);

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

        if(finalBoss.health > 0){
            if(audioRandom === 0){
                audioBoss.src = 'resources/sounds/Boss Final/Ataque Boss 1.wav';
            } else {
                audioBoss.src = 'resources/sounds/Boss Final/Ataque Boss 2.wav';
            }
            audioBoss.volume = 0.5;
            audioBoss.play();
    
    
            // Animación de ataque del jefe
            const bossElement = document.getElementById('enemy');
            const originalPositionBoss = bossElement.style.transform;
    
            bossElement.style.transition = 'transform .8s';
            bossElement.style.transform = 'translate(-150px, 100px)';
            bossElement.src = finalBoss.attackAnimation;
    
            await sleep(400);
            const bossAttackStrength = finalBoss.puntosAtaque;
            if (bossAttackStrength - player.defense > 0) {
                const damage = bossAttackStrength - player.defense;
                updateStats('health', -damage);
            }
            if (player.defense > 0) {
                updateStats('defense', -1);
            }
            await sleep(400);
            bossElement.style.transform = originalPositionBoss;
            bossElement.src = finalBoss.idleAnimation;
        }

    } else if (action === 'defend') {
        if (cooldownDefensa === 0) {
            cooldownDefensa = 3;
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

            let audioRandom = getRandomInt(0, 2);
            if(audioRandom === 0){
                audioBoss.src = 'resources/sounds/Boss Final/Ataque Boss 1.wav';
            } else {
                audioBoss.src = 'resources/sounds/Boss Final/Ataque Boss 2.wav';
            }
            audioBoss.volume = 0.5;
            audioBoss.play();
            audioPj.src = 'resources/sounds/Boss Final/DefensaPj.wav';
            audioPj.play();
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

    }



    if(cooldownDefensa > 0){
        options[1].textContent = `Defe (${cooldownDefensa})`;
    } else {
        options[1].textContent = 'Defend';
        options[1].disabled = false;
    }
    options[0].disabled = false;

    document.getElementById('next-card').disabled = false;

    animateResultText();
    updateStatus();

    if (player.health <= 0) {

        // Detener audio de fondo
        audioElement.pause();
        // Nuevo audio de fondo: Final/defeat
        audioElement.src = 'resources/sounds/Final/defeat.mp3';
        fadeIn();
        
        document.getElementById('story-text').textContent = 'Has perdido el juego. Vuelve a intentarlo.';
        centerStory();
        showRestartButton();

        // Quitar proximo ataque del jefe
        document.getElementById('puntos-ataque').style.opacity = 0;
        
        // Fade out del personaje
        const playerElement = document.getElementById('player');
        playerElement.style.transition = 'opacity 2s';
        playerElement.style.opacity = 0;
        
        document.getElementById('story').style.display = 'none';

        // Mostrar story luego de que el personaje desaparezca
        setTimeout(() => {
            document.getElementById('story').style.display = 'block';
        }, 2000);

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
    }, 2000);
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
    const nextButton = document.getElementById('next-card');
    nextButton.disabled = true;

    if (estados.fases === estado) {
        audioNext.src = audioNextSrc;
        audioNext.play();
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

    setTimeout(() => {
        nextButton.disabled = false;
    }, tiempoAnimacion);
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
    clickSound.volume = 0.15;
    initializeAudioContext()

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            clickSound.play();
        });
    });
});
