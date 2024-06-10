const player = {
    health: 5,
    attack: 5,
    defense: 5,
    fase: 1,
};

const estados = {
    inicio: Symbol(),
    fases: Symbol(),
    pelea: Symbol(),
    final: Symbol(),
};

let estado = estados.fases;

const maxFases = 3;

const cardLevels = [
    {
        text: "Llevas horas caminando hasta que te encuentras en un bosque oscuro. ¿Qué haces?",
        options: [
            {
                text: "Explorar el bosque",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Exploras el bosque, pero te pierdes y te lastimas con las ramas. Pierdes 1 corazón."
            },
            {
                text: "Buscar un refugio",
                health: 0,
                attack: -1,
                defense: +1,
                result: "Encuentras un refugio seguro, pero pierdes algo de ataque mientras te aseguras. Ganas 1 de defensa, pierdes 1 de ataque."
            },
            {
                text: "Encender una fogata",
                health: +1,
                attack: -1,
                defense: 0,
                result: "Enciendes una fogata y te calientas, recuperando algo de salud, pero atraes a algunos depredadores. Ganas 1 corazón, pierdes 1 de ataque."
            },
            {
                text: "Seguir adelante",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides seguir adelante sin detenerte. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Mientras avanzas, te enfrentas a un grupo de bandidos. ¿Qué haces?",
        options: [
            {
                text: "Luchar",
                health: -2,
                attack: +1,
                defense: 0,
                result: "Luchas valientemente, pero recibes heridas graves. Pierdes 2 corazones y ganas 1 de ataque."
            },
            {
                text: "Huir",
                health: -1,
                attack: 0,
                defense: +1,
                result: "Logras escapar, pero te lastimas en el proceso. Pierdes 1 corazón y ganas 1 de defensa."
            },
            {
                text: "Negociar",
                health: 0,
                attack: -1,
                defense: 0,
                result: "Intentas negociar, pero los bandidos no están interesados. Pierdes 1 de ataque."
            },
            {
                text: "Esconderse",
                health: 0,
                attack: 0,
                defense: +1,
                result: "Te escondes hasta que los bandidos se van. Ganas 1 de defensa."
            }
        ]
    },
    {
        text: "Después de caminar un buen rato, encuentras un manantial cristalino. ¿Qué haces?",
        options: [
            {
                text: "Beber agua",
                health: +1,
                attack: 0,
                defense: 0,
                result: "Bebes agua fresca y te sientes revitalizado. Ganas 1 corazón."
            },
            {
                text: "Descansar",
                health: +2,
                attack: -1,
                defense: 0,
                result: "Descansas junto al manantial, recuperando fuerzas, pero descuidas tu guardia. Ganas 2 corazones y pierdes 1 de ataque."
            },
            {
                text: "Ignorar",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides no detenerte y sigues tu camino. No ocurre nada significativo."
            },
            {
                text: "Buscar comida",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Buscas comida cerca del manantial y encuentras frutos. Ganas 1 de ataque."
            }
        ]
    },
    {
        text: "Caminas sin rumbo fijo hasta que encuentras una cueva misteriosa. ¿Qué haces?",
        options: [
            {
                text: "Entrar en la cueva",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Entras en la cueva y te caes en un agujero. Pierdes 1 corazón."
            },
            {
                text: "Rodear la cueva",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides rodear la cueva y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Investigar la entrada",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Investigando la entrada, encuentras una trampa antigua y la desactivas. Ganas 1 de ataque."
            },
            {
                text: "Ignorar la cueva",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides ignorar la cueva y continuar tu camino. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Un mago aparece ante ti y te ofrece un trato. ¿Qué haces?",
        options: [
            {
                text: "Aceptar el trato",
                health: 0,
                attack: +2,
                defense: -1,
                result: "Aceptas el trato y el mago te otorga poderes, pero tu defensa se debilita. Ganas 2 de ataque y pierdes 1 de defensa."
            },
            {
                text: "Rechazar el trato",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Rechazas el trato y sigues tu camino. No ocurre nada significativo."
            },
            {
                text: "Preguntar más detalles",
                health: 0,
                attack: -1,
                defense: 0,
                result: "El mago se enfada por tus preguntas y lanza un pequeño hechizo contra ti. Pierdes 1 de ataque."
            },
            {
                text: "Atacar al mago",
                health: -2,
                attack: +1,
                defense: 0,
                result: "Atacas al mago, pero te defiende con su magia. Pierdes 2 corazones y ganas 1 de ataque."
            }
        ]
    },
    {
        text: "Caminando por el sendero, encuentras un cofre del tesoro. ¿Qué haces?",
        options: [
            {
                text: "Abrir el cofre",
                health: +1,
                attack: +1,
                defense: 0,
                result: "Abres el cofre y encuentras tesoros que te fortalecen. Ganas 1 corazón y 1 de ataque."
            },
            {
                text: "Dejar el cofre",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides dejar el cofre intacto y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Investigar alrededor",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Encuentras una trampa cerca del cofre y la desactivas. Ganas 1 de ataque."
            },
            {
                text: "Vender el cofre",
                health: 0,
                attack: +2,
                defense: -1,
                result: "Vendes el cofre a un comerciante, ganando riquezas pero descuidando tu defensa. Ganas 2 de ataque y pierdes 1 de defensa."
            }
        ]
    },
    {
        text: "Mientras avanzas, te enfrentas a un lobo hambriento. ¿Qué haces?",
        options: [
            {
                text: "Luchar contra el lobo",
                health: -2,
                attack: +1,
                defense: 0,
                result: "Luchas contra el lobo y logras vencerlo, pero quedas herido. Pierdes 2 corazones y ganas 1 de ataque."
            },
            {
                text: "Huir del lobo",
                health: -1,
                attack: 0,
                defense: +1,
                result: "Huyes del lobo, pero te lastimas en el proceso. Pierdes 1 corazón y ganas 1 de defensa."
            },
            {
                text: "Alimentar al lobo",
                health: 0,
                attack: -1,
                defense: 0,
                result: "Le das algo de tu comida al lobo, perdiendo algo de ataque pero evitando una pelea. Pierdes 1 de ataque."
            },
            {
                text: "Intentar domesticarlo",
                health: 0,
                attack: +2,
                defense: 0,
                result: "Logras domesticar al lobo, ganando un compañero feroz. Ganas 2 de ataque."
            }
        ]
    },
    {
        text: "Después de horas caminando, llegas a un camino bifurcado. ¿Qué haces?",
        options: [
            {
                text: "Tomar el camino de la derecha",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Tomas el camino de la derecha y sigues tu aventura. No ocurre nada significativo."
            },
            {
                text: "Tomar el camino de la izquierda",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Tomas el camino de la izquierda y sigues tu aventura. No ocurre nada significativo."
            },
            {
                text: "Explorar ambos caminos",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Exploras ambos caminos y te cansas. Pierdes 1 corazón."
            },
            {
                text: "Quedarse donde estás",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides quedarte y descansar un rato. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Un anciano aparece en tu camino y te pide ayuda. ¿Qué haces?",
        options: [
            {
                text: "Ayudar al anciano",
                health: +1,
                attack: 0,
                defense: 0,
                result: "Ayudas al anciano y él te bendice. Ganas 1 corazón."
            },
            {
                text: "Ignorar al anciano",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides ignorar al anciano y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Pedirle una recompensa",
                health: 0,
                attack: +1,
                defense: 0,
                result: "El anciano te da una recompensa por tu ayuda. Ganas 1 de ataque."
            },
            {
                text: "Robar al anciano",
                health: -1,
                attack: +2,
                defense: 0,
                result: "Robas al anciano y te llevas sus pertenencias. Ganas 2 de ataque y pierdes 1 corazón."
            }
        ]
    },
    {
        text: "Caminas sin rumbo fijo hasta que te encuentras en un pantano. ¿Qué haces?",
        options: [
            {
                text: "Atravesar el pantano",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Atravesar el pantano es agotador y te lastimas. Pierdes 1 corazón."
            },
            {
                text: "Rodear el pantano",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides rodear el pantano y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Buscar un bote",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Encuentras un bote y lo usas para cruzar el pantano. Ganas 1 de ataque."
            },
            {
                text: "Descansar en la orilla",
                health: +1,
                attack: -1,
                defense: 0,
                result: "Descansas en la orilla y recuperas energía, pero pierdes un poco de ataque. Ganas 1 corazón y pierdes 1 de ataque."
            }
        ]
    },
    {
        text: "De repente, te topas con una tribu hostil. ¿Qué haces?",
        options: [
            {
                text: "Atacar a la tribu",
                health: -2,
                attack: +1,
                defense: 0,
                result: "Atacas a la tribu y aunque ganas, sufres graves heridas. Pierdes 2 corazones y ganas 1 de ataque."
            },
            {
                text: "Huir rápidamente",
                health: -1,
                attack: 0,
                defense: +1,
                result: "Huyes rápidamente, pero te lastimas en el proceso. Pierdes 1 corazón y ganas 1 de defensa."
            },
            {
                text: "Negociar con ellos",
                health: 0,
                attack: -1,
                defense: 0,
                result: "Intentas negociar, pero la tribu no está interesada. Pierdes 1 de ataque."
            },
            {
                text: "Observar desde lejos",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Observas desde lejos y decides no intervenir. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Te encuentras con un puente viejo y roto en tu camino. ¿Qué haces?",
        options: [
            {
                text: "Cruzar el puente",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Intentas cruzar el puente, pero una tabla se rompe y te caes. Pierdes 1 corazón."
            },
            {
                text: "Buscar otro camino",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides buscar otro camino y evitar el puente. No ocurre nada significativo."
            },
            {
                text: "Reparar el puente",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Reparas el puente y aseguras tu paso. Ganas 1 de ataque."
            },
            {
                text: "Esperar ayuda",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides esperar ayuda y descansar. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Después de un largo viaje, te enfrentas a un dragón dormido. ¿Qué haces?",
        options: [
            {
                text: "Atacar al dragón",
                health: -3,
                attack: +2,
                defense: 0,
                result: "Atacas al dragón, pero recibes graves heridas antes de vencerlo. Pierdes 3 corazones y ganas 2 de ataque."
            },
            {
                text: "Escabullirse",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides escabullirte sin despertar al dragón. No ocurre nada significativo."
            },
            {
                text: "Tomar un objeto cercano",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Encuentras un objeto valioso cerca del dragón y lo tomas sin despertar al dragón. Ganas 1 de ataque."
            },
            {
                text: "Hablar con el dragón",
                health: 0,
                attack: -1,
                defense: 0,
                result: "Intentas hablar con el dragón, pero te responde con un rugido. Pierdes 1 de ataque."
            }
        ]
    },
    {
        text: "Llevas horas caminando hasta que te topas con un antiguo santuario abandonado. ¿Qué haces?",
        options: [
            {
                text: "Entrar al santuario",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Entras al santuario y encuentras un objeto sagrado que aumenta tu poder. Ganas 1 de ataque."
            },
            {
                text: "Rodear el santuario",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides rodear el santuario y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Descansar en el santuario",
                health: +1,
                attack: -1,
                defense: 0,
                result: "Descansas en el santuario y recuperas fuerzas, pero pierdes algo de tu poder ofensivo. Ganas 1 corazón y pierdes 1 de ataque."
            },
            {
                text: "Investigar los alrededores",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Investigas los alrededores, pero no encuentras nada interesante. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Te cruzas con un comerciante viajero en el camino. ¿Qué haces?",
        options: [
            {
                text: "Comprar pociones",
                health: +1,
                attack: 0,
                defense: 0,
                result: "Compras pociones del comerciante y te sientes más saludable. Ganas 1 corazón."
            },
            {
                text: "Vender objetos",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Vendes algunos objetos al comerciante y obtienes mejores armas. Ganas 1 de ataque."
            },
            {
                text: "Robar al comerciante",
                health: -2,
                attack: +2,
                defense: 0,
                result: "Robas al comerciante y te llevas sus pertenencias, pero sufres heridas en el proceso. Ganas 2 de ataque y pierdes 2 corazones."
            },
            {
                text: "Ignorar al comerciante",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides ignorar al comerciante y seguir tu camino. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Ves que una tormenta se aproxima rápidamente. ¿Qué haces?",
        options: [
            {
                text: "Buscar refugio",
                health: 0,
                attack: 0,
                defense: +1,
                result: "Encuentras refugio y te proteges de la tormenta. Ganas 1 de defensa."
            },
            {
                text: "Continuar el viaje",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Decides seguir adelante a pesar de la tormenta y te lastimas. Pierdes 1 corazón."
            },
            {
                text: "Construir un refugio",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Construyes un refugio improvisado y te mantienes a salvo. Ganas 1 de ataque."
            },
            {
                text: "Esperar a que pase",
                health: 0,
                attack: -1,
                defense: 0,
                result: "Esperas a que pase la tormenta, pero te aburres y pierdes algo de tu espíritu combativo. Pierdes 1 de ataque."
            }
        ]
    },
    {
        text: "Un espíritu se manifiesta ante ti y te ofrece sabiduría. ¿Qué haces?",
        options: [
            {
                text: "Aceptar la sabiduría",
                health: 0,
                attack: +2,
                defense: -1,
                result: "Aceptas la sabiduría del espíritu, pero pierdes algo de tu defensa. Ganas 2 de ataque y pierdes 1 de defensa."
            },
            {
                text: "Rechazar la oferta",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Rechazas la oferta del espíritu y sigues tu camino. No ocurre nada significativo."
            },
            {
                text: "Huir del espíritu",
                health: -1,
                attack: 0,
                defense: 0,
                result: "Huyes del espíritu, pero te lastimas en el proceso. Pierdes 1 corazón."
            },
            {
                text: "Atacar al espíritu",
                health: -2,
                attack: +1,
                defense: 0,
                result: "Atacas al espíritu y logras vencerlo, pero te deja debilitado. Pierdes 2 corazones y ganas 1 de ataque."
            }
        ]
    },
    {
        text: "Te adentras en un campo de flores mágicas. ¿Qué haces?",
        options: [
            {
                text: "Recoger flores",
                health: +1,
                attack: 0,
                defense: 0,
                result: "Recoges algunas flores y te sientes revitalizado. Ganas 1 corazón."
            },
            {
                text: "Descansar en el campo",
                health: +2,
                attack: -1,
                defense: 0,
                result: "Descansas en el campo y recuperas energías, pero pierdes algo de tu fuerza. Ganas 2 corazones y pierdes 1 de ataque."
            },
            {
                text: "Ignorar el campo",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides ignorar el campo y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Investigar las flores",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Investigas las flores y descubres propiedades mágicas. Ganas 1 de ataque."
            }
        ]
    },
    {
        text: "Te cruzas con un caballero errante en el camino. ¿Qué haces?",
        options: [
            {
                text: "Desafiar al caballero",
                health: -2,
                attack: +2,
                defense: 0,
                result: "Desafías al caballero a un duelo y, aunque resultas herido, lo vences. Pierdes 2 corazones y ganas 2 de ataque."
            },
            {
                text: "Hablar con el caballero",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Hablas con el caballero y te da valiosos consejos de combate. Ganas 1 de ataque."
            },
            {
                text: "Ignorar al caballero",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides ignorar al caballero y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Ayudar al caballero",
                health: +1,
                attack: 0,
                defense: 0,
                result: "Ayudas al caballero con sus problemas y él te agradece con una bendición. Ganas 1 corazón."
            }
        ]
    },
    {
        text: "Llegas a la costa y encuentras un barco abandonado. ¿Qué haces?",
        options: [
            {
                text: "Subir al barco",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Subes al barco y encuentras equipo útil. Ganas 1 de ataque."
            },
            {
                text: "Rodear el barco",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides rodear el barco y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Buscar tesoros",
                health: +1,
                attack: +1,
                defense: 0,
                result: "Encuentras tesoros a bordo y te sientes revitalizado y fortalecido. Ganas 1 corazón y 1 de ataque."
            },
            {
                text: "Evitar el barco",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides evitar el barco y seguir tu camino. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Te encuentras con una princesa en apuros en el camino. ¿Qué haces?",
        options: [
            {
                text: "Rescatar a la princesa",
                health: -2,
                attack: +2,
                defense: 0,
                result: "Rescatas a la princesa, pero resultas herido en la lucha. Pierdes 2 corazones y ganas 2 de ataque."
            },
            {
                text: "Ignorar a la princesa",
                health: 0,
                attack: 0,
                defense: 0,
                result: "Decides ignorar a la princesa y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Pedir recompensa",
                health: 0,
                attack: +1,
                defense: 0,
                result: "Pides una recompensa por rescatar a la princesa y ella te da una valiosa joya. Ganas 1 de ataque."
            },
            {
                text: "Luchar contra sus captores",
                health: -1,
                attack: +1,
                defense: 0,
                result: "Luchas contra los captores de la princesa y logras vencerlos, aunque sufres algunas heridas. Pierdes 1 corazón y ganas 1 de ataque."
            }
        ]
    }
];

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
    fightFinalBoss();
    console.log('pelearda');
}

function updateFinal() {
    alert('¡Has ganado el juego!');
    resetGame();
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
};

function fightFinalBoss() {
    document.querySelector('body').style.backgroundImage = "url('images/boss.webp')";
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

    document.querySelectorAll('#options .option').forEach(option => {
        option.style.display = 'inline-block';
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

function handleBossFight(event) {
    const action = event.target.dataset.action;

    if (action === 'attack') {
        finalBoss.health -= player.attack;
        player.health -= finalBoss.attack;
        document.getElementById('result-text').textContent = "Atacas al jefe final y él te ataca a ti.";
    } else if (action === 'defend') {
        const damage = Math.max(0, finalBoss.attack - player.defense);
        player.health -= damage;
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
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
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
    option.addEventListener('click', handleOptionClick);
});

document.getElementById('next-card').addEventListener('click', () => {
    const nextCard = getRandomCardIndex();
    updateFases(nextCard);
});

updateStatus();
update();