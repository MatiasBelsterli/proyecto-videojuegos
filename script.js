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
};

const estados = {
    inicio: Symbol(),
    fases: Symbol(),
    pelea: Symbol(),
    final: Symbol(),
};

let estado = estados.fases;

const maxFases = 3;

function update() {
    if (estado === estados.fases) {
        updateFases(getRandomCardIndex());
    } else if (estado === estados.pelea) {
        updatePelea();
    } else if (estado === estados.final) {
        updateFinal();
    }
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
    document.getElementById('statusFinalBoss').classList.remove('invisible');
    document.getElementById('finalBossEnemy').classList.remove('invisible');
    document.getElementById('story').classList.add('move-up')
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
}

function getRandomCardIndex() {
    return Math.floor(Math.random() * cardLevels.length);
}

const finalBoss = {
    health: 10,
    attack: 10,
    defense: 10,
    puntosAtaque: 0,
};

function fightFinalBoss() {
    document.querySelector('body').style.backgroundImage = "url('resources/images/boss.webp')";
    document.getElementById('story-text').textContent = "Te encuentras con el jefe final. ¿Qué haces?";
    const options = document.querySelectorAll('.option');
    options[0].textContent = "Atacar";
    options[0].dataset.action = 'attack';
    options[1].textContent = "Defender";
    options[1].dataset.action = 'defend';
    options[2].style.display = 'none';
    options[3].style.display = 'none';
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

function handleBossFight(event) {
    const action = event.target.dataset.action;
    document.getElementById('next-card').style.display = 'none';
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