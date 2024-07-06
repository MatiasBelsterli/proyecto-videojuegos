export const cardLevels = [
    {
        text: "Llevas horas caminando hasta que te encuentras en un bosque oscuro. ¿Qué haces?",
        options: [//0
            {
                text: "Explorar el bosque",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Exploras el bosque, pero te pierdes y te lastimas con las ramas. Pierdes 1 corazón."
            },
            {
                text: "Buscar un refugio",
                health: 0,
                attack: -1,
                defense: +1,
                suerte: 0,
                result: "Encuentras un refugio seguro, pero pierdes algo de ataque mientras te aseguras. Ganas 1 de defensa, pierdes 1 de ataque."
            },
            {
                text: "Encender una fogata",
                health: +1,
                attack: -1,
                defense: 0,
                suerte: -1,
                result: "Enciendes una fogata y te calientas, recuperando algo de salud, pero atraes a algunos depredadores. Ganas 1 corazón, pierdes 1 de ataque.",
                sound: "resources/sounds/Acciones/fogata.wav"
            },
            {
                text: "Seguir adelante",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides seguir adelante sin detenerte. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Mientras avanzas, te enfrentas a un grupo de elfos bandidos. ¿Qué haces?",//1
        options: [//1
            {
                text: "Luchar",
                health: -2,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Luchas valientemente, pero recibes heridas graves. Pierdes 2 corazones y ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Puño.wav"

            },
            {
                text: "Huir",
                health: -1,
                attack: 0,
                defense: +1,
                suerte: 0,
                result: "Logras escapar, pero te lastimas en el proceso. Pierdes 1 corazón y ganas 1 de defensa."
            },
            {
                text: "Negociar",
                health: 0,
                attack: -1,
                defense: 0,
                suerte: 0,
                result: "Intentas negociar, pero los bandidos no están interesados. Pierdes 1 de ataque."
            },
            {
                text: "Esconderse",
                health: 0,
                attack: 0,
                defense: +1,
                suerte: 0,
                result: "Te escondes hasta que los bandidos se van. Ganas 1 de defensa."
            }
        ]
    },
    {
        text: "Después de caminar un buen rato, encuentras un manantial cristalino. ¿Qué haces?",
        options: [//2
            {
                text: "Beber agua",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Bebes agua fresca y te sientes revitalizado. Ganas 1 corazón.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Descansar",
                health: +2,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Descansas junto al manantial, recuperando fuerzas, pero descuidas tu guardia. Ganas 2 corazones y pierdes 1 de defensa.",
                sound: ""
            },
            {
                text: "Ignorar",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Decides no detenerte y sigues tu camino. No ocurre nada significativo.",
                sound: ""
            },
            {
                text: "Buscar comida",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Buscas comida cerca del manantial y encuentras frutos. Ganas 1 de ataque.",
                sound: ""
            }
        ]
    },
    {
        text: "Caminas sin rumbo fijo hasta que encuentras una cueva misteriosa. ¿Qué haces?",
        options: [//3
            {
                text: "Entrar en la cueva",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Entras en la cueva y te caes en un agujero. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Caida.wav"
            },
            {
                text: "Rodear la cueva",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides rodear la cueva y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Investigar la entrada",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Investigando la entrada, encuentras una trampa antigua y la desactivas. Ganas 1 corazón."
            },
            {
                text: "Ignorar la cueva",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Decides ignorar la cueva y continuar tu camino. Tu falta de curiosidad te hace sentir desafortunado."
            }
        ]
    },
    {
        text: "Un mago misterioso y de mal aspecto aparece ante ti y te ofrece un trato. ¿Qué haces?",
        options: [//4
            {
                text: "Aceptar el trato",
                health: 0,
                attack: +2,
                defense: -1,
                suerte: 0,
                result: "Aceptas el trato y el mago te otorga poderes, pero tu defensa se debilita. Ganas 2 de ataque y pierdes 1 de defensa.",
                sound: "resources/sounds/Acciones/Hechizo potente.wav"
            },
            {
                text: "Rechazar el trato",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Rechazas el trato y sigues tu camino. No ocurre nada significativo."
            },
            {
                text: "Preguntar más detalles",
                health: 0,
                attack: -1,
                defense: 0,
                suerte: -1,
                result: "El mago se enfada por tus preguntas y lanza un pequeño hechizo contra ti. Pierdes 1 de ataque."
            },
            {
                text: "Atacar al mago",
                health: -2,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Atacas al mago, pero te defiende con su magia. Pierdes 2 corazones y ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Puño.wav"
            }
        ]
    },
    {
        text: "Aparece un grupo de niños y te ofrecen un regalo. ¿Qué haces?",
        options: [//5
            {
                text: "Tomas el regalo",
                health: +1,
                attack: +1,
                defense: 0,
                suerte: +1,
                result: "Tomas el regalo y resultan ser amuletos que te fortalecen. Ganas 1 corazón y 1 de ataque.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Rechazarlo",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Decides no tomar el regalo y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Atacar a los niños",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Atacas a los niños y el pueblo de enfurece. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Puño.wav"
            },
            {
                text: "Vender el regalo",
                health: 0,
                attack: 0,
                defense: +1,
                suerte: 0,
                result: "Vendes el regalo a un comerciante, intercambias por armaduras. Ganas 1 de defensa.",
                sound: "resources/sounds/Acciones/Monedas.wav"
            }
        ]
    },
    {
        text: "Mientras avanzas, te enfrentas a un lobo hambriento. ¿Qué haces?",
        options: [//6
            {
                text: "Luchar contra el lobo",
                health: -2,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Luchas contra el lobo y logras vencerlo, pero quedas herido. Pierdes 2 corazones y ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Espadazo medio.wav"
            },
            {
                text: "Huir del lobo",
                health: -1,
                attack: 0,
                defense: +1,
                suerte: 0,
                result: "Huyes del lobo, pero te lastimas en el proceso. Pierdes 1 corazón y ganas 1 de defensa.",
                sound: "resources/sounds/Acciones/Irse volando.wav"
            },
            {
                text: "Alimentar al lobo",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Le das algo de tu comida al lobo, pasarás algo de hambre por esto. Pierdes 1 corazón."
            },
            {
                text: "Intentar domesticarlo",
                health: 0,
                attack: +2,
                defense: 0,
                suerte: 0,
                result: "Logras domesticar al lobo, ganando un compañero feroz. Ganas 2 de ataque.",
                sound: "resources/sounds/Acciones/Click Especial.wav"

            }
        ]
    },
    {
        text: "Vas cruzando un puente y comienza a romperse. ¿Qué haces?",
        options: [//7
            {
                text: "Correr",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Tus pizotones hacen que el puente se rompa mas rápido y caes. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Rotura.wav"
            },
            {
                text: "Saltar hacia atras",
                health: 0,
                attack: -1,
                defense: 0,
                suerte: 0,
                result: "Logras evitar la caida pero sin querer arrojas tu espada. Pierdes 1 de ataque.",
                sound: "resources/sounds/Acciones/Rotura.wav"
            },
            {
                text: "Saltar hacia adelante",
                health: 0,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Logras evitar la caida pero sin querer arrojas tu escudo. Pierdes 1 de escudo.",
                sound: "resources/sounds/Acciones/Rotura.wav"
            },
            {
                text: "Quedarte quieto",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Decides quedarte quieto y el puente se estabiliza, te sientes afortunado.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            }
        ]
    },
    {
        text: "Elfa pacífica aparece en tu camino y te pide ayuda. ¿Qué haces?",
        options: [//8
            {
                text: "Ayudarla",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Ayudas a la elfa y ella te bendice. Ganas 1 corazón.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Ignorarla",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides ignorar a la elfa y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Pedirle una recompensa",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: -1,
                result: "La elfa te da una recompensa por tu ayuda. Ganas 1 de ataque."
            },
            {
                text: "Robar a la elfa",
                health: -1,
                attack: +2,
                defense: 0,
                suerte: -1,
                result: "Robas a la elfa y te llevas sus pertenencias. Ganas 2 de ataque y pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Ponerse armadura.wav"

            }
        ]
    },
    {
        text: "Caminas sin rumbo fijo hasta que te encuentras en un pantano. ¿Qué haces?",
        options: [//9
            {
                text: "Atravesar el pantano",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Atravesar el pantano es agotador y te lastimas. Pierdes 1 corazón.",

            },
            {
                text: "Rodear el pantano",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides rodear el pantano y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Buscar un bote",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Encuentras un bote y lo usas para cruzar el pantano. Ganas 1 corazón.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            },
            {
                text: "Descansar en la orilla",
                health: +1,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Descansas en la orilla y recuperas energía, pero te descuidas un poco. Ganas 1 corazón y pierdes 1 de defensa.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            }
        ]
    },
    {
        text: "De repente, te topas con una aldea indígena. ¿Qué haces?",
        options: [//10
            {
                text: "Atacar a la tribu",
                health: -2,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Atacas a la tribu y aunque ganas, sufres graves heridas. Pierdes 2 corazones y ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Espadazo medio.wav"
            },
            {
                text: "Huir rápidamente",
                health: -1,
                attack: 0,
                defense: +1,
                suerte: 0,
                result: "Huyes rápidamente, pero te lastimas en el proceso. Pierdes 1 corazón y ganas 1 de defensa.",
                sound: "resources/sounds/Acciones/Irse volando.wav"
            },
            {
                text: "Negociar con ellos",
                health: 0,
                attack: -1,
                defense: 0,
                suerte: -1,
                result: "Intentas negociar, pero la tribu no está interesada. Pierdes 1 de ataque."
            },
            {
                text: "Observar desde lejos",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Observas desde lejos y decides no intervenir. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Te encuentras con el avance de toda una artillería de guerra. ¿Qué haces?",
        options: [//11
            {
                text: "Intentar robarles",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Intentas robarles y te atacan. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Puño.wav"
            },
            {
                text: "Buscar otro camino",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Evitas cruzarte con ellos, piensas en lo bueno que hubiese sido obtener algo de lo suyo."
            },
            {
                text: "Presentarte como aliado",
                health: 0,
                attack: +3,
                defense: 0,
                suerte: +1,
                result: "Te presentas como aliado y te creen, obtienes buen armamento. Ganas 3 de ataque.",
                sound: "resources/sounds/Acciones/Ponerse armadura.wav"
            },
            {
                text: "Intentar negociar",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Intentas negociar con ellos pero no estan interesados. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Después de un largo viaje, te enfrentas a un dragón dormido. ¿Qué haces?",
        options: [//12
            {
                text: "Atacar al dragón",
                health: -3,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Atacas al dragón y te genera daños graves, te sientes afortunado de no haber muerto. Pierdes 3 corazones.",
                sound: "resources/sounds/Acciones/Explosion Fuego.wav"
            },
            {
                text: "Escabullirse",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Decides escabullirte sin despertar al dragón, afortunadamente no lo despiestas. No ocurre nada significativo."
            },
            {
                text: "Tomar un objeto cercano",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Encuentras un arma valiosa cerca del dragón y la tomas sin despertarlo. Ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            },
            {
                text: "Hablar con el dragón",
                health: 0,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Intentas hablar con el dragón, pero te responde con un rugido, pierdes parte de tu armadura huyendo. Pierdes 1 de defensa.",
                sound: "resources/sounds/Boss Final/Ataque Boss 1.wav"
            }
        ]
    },
    {
        text: "Llevas horas caminando hasta que te topas con un antiguo mausoleo. ¿Qué haces?",
        options: [//13
            {
                text: "Entrar al mausoleo",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: +1,
                result: "Entras al mausoleo y encuentras un objeto sagrado que aumenta tu poder. Ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Rodear el mausoleo",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Decides rodear el mausoleo y evitar cualquier peligro. No ocurre nada significativo."
            },
            {
                text: "Descansar en el mausoleo",
                health: +2,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Descansas en el mausoleo y recuperas fuerzas, aquí estas a salvo. Ganas 2 corazones.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Investigar los alrededores",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Investigas los alrededores y caes en una trampa. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Caida.wav"
            }
        ]
    },
    {
        text: "Te cruzas con un mercadito en el camino. ¿Qué haces?",
        options: [//14
            {
                text: "Comprar pociones",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Compras pociones a comerciantes y te sientes más saludable. Ganas 1 corazón.",
                sound: "resources/sounds/Acciones/Recibe posion.wav"
            },
            {
                text: "Vender objetos",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Vendes algunos objetos a un comerciante y obtienes mejores armas. Ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Monedas.wav"
            },
            {
                text: "Robar",
                health: -2,
                attack: +2,
                defense: 0,
                suerte: 0,
                result: "Robas al comerciante y te llevas sus armas, pero sufres heridas en el proceso. Ganas 2 de ataque y pierdes 2 corazones.",
                sound: "resources/sounds/Acciones/Ponerse armadura.wav"
            },
            {
                text: "Seguir adelante",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides ignorar seguir tu camino. No ocurre nada significativo."
            }
        ]
    },
    {
        text: "Luego de caminar un rato, te encuentras una insignia en el suelo. ¿Qué haces?",
        options: [//15
            {
                text: "Tomar la insignia",
                health: 0,
                attack: 0,
                defense: +2,
                suerte: +1,
                result: "Resulta ser de gran valor y la intercambias por armaduras. Ganas 2 de defensa.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            },
            {
                text: "Destruir la insignia",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Decides destruir la insignia. No ocurre nada significativo."
            },
            {
                text: "Continuar tu camino",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides continuar con tu camino sin darle importancia. No ocurre nada significativo."
            },
            {
                text: "Mirar alrededor",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Encuentras al dueño de la insignia no muy lejos, este te bendice. Ganas 1 corazón.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            }
        ]
    },
    {
        text: "Un aldeano oriental se muestra ante ti y te ofrece su sabiduría. ¿Qué haces?",
        options: [//16
            {
                text: "Aceptar su sabiduría",
                health: 0,
                attack: +2,
                defense: 0,
                suerte: +1,
                result: "Aceptas su sabiduría, aprendes nuevas tecnicas de combate, te sientes afortunado. Ganas 2 de ataque.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            },
            {
                text: "Rechazar la oferta",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Rechazas la oferta y sigues tu camino. No ocurre nada significativo."
            },
            {
                text: "Robar al adeano",
                health: 0,
                attack: 0,
                defense: +1,
                suerte: 0,
                result: "Logras robar al aldeano algo de armamento. Ganas 1 de defensa.",
                sound: "resources/sounds/Acciones/Ponerse armadura.wav"
            },
            {
                text: "Atacar al aldeano",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Atacas al aldeano y este se defiende de manera efectiva. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Puño.wav"
            }
        ]
    },
    {
        text: "Te adentras en un campo donde llueven flores mágicas. ¿Qué haces?",
        options: [//17
            {
                text: "Recoger flores",
                health: +1,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Recoges algunas flores y te sientes revitalizado. Ganas 1 corazón.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Descansar en el campo",
                health: +2,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Descansas en el campo y recuperas energías, pero descuidas tu guardia. Ganas 2 corazones y pierdes 1 de ataque.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Ignorar el campo",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Decides ignorar el campo y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Pisar las flores",
                health: +2,
                attack: +2,
                defense: 0,
                suerte: -1,
                result: "Al destruir las flores estas liberan propiedades mágicas. Ganas 2 corazones y 2 de ataque.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            }
        ]
    },
    {
        text: "Un par de caballeros impiden tu paso. ¿Qué haces?",
        options: [//18
            {
                text: "Desafiar a los caballeros",
                health: -2,
                attack: +2,
                defense: 0,
                suerte: +1,
                result: "Desafías a los caballero a un duelo y, aunque resultas herido, los vences, consiguiendo así sus armas. Pierdes 2 corazones y ganas 2 de ataque.",
                sound: "resources/sounds/Acciones/Espadazo medio.wav"
            },
            {
                text: "Hablar con los caballeros",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: 0,
                result: "Hablas con los caballeros y comprenden que no eres una amenaza, te dan una pequeña ayuda. Ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Ponerse armadura.wav"
            },
            {
                text: "Ignorar a los caballeros",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides ignorar a los caballeros y tomar otro camino. No ocurre nada significativo."
            },
            {
                text: "Robar a los caballeros",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Intentas robarle a los caballeros y estos te atacan. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Puño.wav"
            }
        ]
    },
    {
        text: "En tu camino te cuentras a todo un grupo de miembros de la realeza. ¿Qué haces?",
        options: [//19
            {
                text: "Hacer una reverencia",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Los miembros de la realeza te saludan y siguen su camino. No pasa nada significativo."
            },
            {
                text: "Ofrecer tus servicios",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: -1,
                result: "Los miembros de la realeza no tienen ningun trabajo para tí, te sientes desafortunado."
            },
            {
                text: "Ignorarlos",
                health: -1,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Ignoras a los miembros de la realeza estos se lo toman como una ofensa. Pierdes 1 corazón y 1 de defensa."
            },
            {
                text: "Tratar de engañarlos",
                health: 0,
                attack: +2,
                defense: +1,
                suerte: 0,
                result: "Te haces pasar por uno de sus nobles y te entregan armamento. Ganas dos de ataque y uno de defensa.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            }
        ]
    },
    {
        text: "Te encuentras con un pequeño duende tímido en el camino. ¿Qué haces?",
        options: [//20
            {
                text: "Ofrecerle ayuda",
                health: +2,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "El duende acepta tu ayuda y te bendice. Ganas 2 corazones.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Ignorar al duende",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides ignorar al duende y seguir tu camino. No ocurre nada significativo."
            },
            {
                text: "Intentar comerciar",
                health: 0,
                attack: 0,
                defense: -1,
                suerte: 0,
                result: "Intentas comerciar com el duende pero éste parece ser bastante mas astuto que tu. Pierdes 1 de defensa."
            },
            {
                text: "Pisar al duende",
                health: 0,
                attack: +1,
                defense: 0,
                suerte: -1,
                result: "Pisas al duende y te quedas con sus pertenencias, pero te sientes desafortunado. Ganas 1 de ataque.",
                sound: "resources/sounds/Acciones/Monedas.wav"
            }
        ]
    },
    {
        text: "Te sientas a apostar fuera de un bar que te encontraste en tu camino. ¿Qué haces?",
        options: [//21
            {
                text: "Jugar a los dados",
                health: 0,
                attack: 0,
                defense: -1,
                suerte: -1,
                result: "Juegas a los dados y no se te da bien ya que eres un poco más estratega que suertudo. Pierdes 1 de defensa.",

            },
            {
                text: "Jugar al poker",
                health: 0,
                attack: +2,
                defense: 0,
                suerte: +1,
                result: "Esto sí que se te da bien, obtienes objetos valiosos. Ganas 2 de ataque.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            },
            {
                text: "Levantarte e irte sin jugar",
                health: -1,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Los borrachos lo toman como una falta de respeto y te dan una paliza. Pierdes 1 corazón.",
                sound: "resources/sounds/Acciones/Puño.wav"
            },
            {
                text: "Pedir cervezas para todos",
                health: 0,
                attack: +3,
                defense: -1,
                suerte: 0,
                result: "A cambio de entregar parte de tu armadura para pagar los tragos, obtienes un numeroso grupo de borrachos dispuestos a pelear por tí. Ganas 3 de ataque y pierdes 1 de defensa.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            }
        ]
    },
    {
        text: "Encuentras la casa de una bruja. ¿Qué haces?",
        options: [//22
            {
                text: "Golpear la puerta",
                health: +2,
                attack: 0,
                defense: 0,
                suerte: +1,
                result: "Nadie contesta, pero encuentras una reliquia debajo de la alfombra. Ganas 2 corazones.",
                sound: "resources/sounds/Acciones/Encantamiento bueno.wav"
            },
            {
                text: "Entras sin permiso",
                health: 0,
                attack: +1,
                defense: +1,
                suerte: 0,
                result: "Decides entrar, no hay nadie dentro, pero encuentras cosas valiosas. Ganas 1 de ataque y 1 de defensa.",
                sound: "resources/sounds/Acciones/Monedas.wav"
            },
            {
                text: "Seguir con tu camino",
                health: 0,
                attack: 0,
                defense: 0,
                suerte: 0,
                result: "Decides no arriesgarte a molestar a la bruja y sigues caminando. No ocurre nada significativo."
            },
            {
                text: "Encender fuego la casa",
                health: 0,
                attack: +2,
                defense: +1,
                suerte: -2,
                result: "Enciendes la casa en llamas y la poblacion te premia por esto, pero temes que las brujas te eschen una maldicion. Ganas 2 de ataque y 1 de defensa.",
                sound: "resources/sounds/Acciones/Click Especial.wav"
            }
        ]
    },
   
];