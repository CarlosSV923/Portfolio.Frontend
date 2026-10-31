import type { Profile } from "./types";

export const es = {
  ui: {
    metaTitle: "Carlos Sesme | Desarrollador Full Stack",
    metaDescription:
      "Portfolio de Carlos Sesme, desarrollador Full Stack en Guayaquil, Ecuador. Proyectos, experiencia y tecnologías.",
    navLabel: "Navegación principal",
    nav: [
      "Inicio",
      "Sobre mí",
      "Habilidades",
      "Proyectos",
      "Trayectoria",
      "Contacto",
    ],
    hello: "Hola, soy",
    intro:
      "Desarrollador Full Stack con más de 5 años de experiencia creando aplicaciones web utilizando tecnologías como NestJS, .NET, React, MongoDB y Apache Kafka.",
    work: "Explorar proyectos",
    cv: "Descargar CV",
    cvMenu: "Más opciones de descarga de CV",
    cvOther: "Descargar CV",
    about: "Un poco sobre mí",
    aboutTitle:
      "“La única forma de hacer un gran trabajo es amar lo que haces.”",
    aboutAuthor: "Steve Jobs",
    stats: ["Años de experiencia", "Tecnologías", "Formación"],
    skills: "Mi caja de herramientas",
    skillsTitle: "Tecnología con propósito.",
    skillsText:
      "Las herramientas con las que transformo desafíos en soluciones.",
    tech: "Tecnologías",
    snake: {
      gameTitle: "Diviértete mientras conoces nuevas tecnologías.",
      play: "Tech-Snake",
      intro: "¿Quieres jugar algo y conocer nuevas tecnologías?",
      mobileIntro:
        "¿Quieres jugar algo y conocer nuevas tecnologías? Ingresa desde un computador para jugar Tech-Snake.",
      welcomeTitle: "Bienvenido a Tech-Snake!",
      welcomeBody:
        "Para jugar elige una dirección con las flechas, WASD o los controles sobre el tablero para comenzar.",
      welcomeAction: "A jugar y aprender!",
      resultWonTitle: "¡Felicitaciones!",
      resultWonBody:
        "Capturaste todas las tecnologías que aparecieron en el tablero.",
      resultLostTitle: "La partida terminó.",
      resultLostBody: "Estas son las tecnologías que alcanzaste a capturar.",
      resultEmpty: "Vuelve a intentarlo!",
      resultCaptured: "Tecnologías capturadas",
      technologyDescriptions: {
        Redis: "Almacén de datos en memoria usado para caché y mensajería.",
        Kubernetes:
          "Plataforma para automatizar el despliegue y la gestión de contenedores.",
        AWS: "Plataforma en la nube con servicios de infraestructura y aplicaciones.",
        Go: "Lenguaje compilado, simple y eficiente creado por Google.",
        Rust: "Lenguaje de sistemas centrado en rendimiento y seguridad de memoria.",
        RabbitMQ:
          "Broker de mensajes para conectar servicios de forma asíncrona.",
      },
      instructions:
        "Elige una dirección con las flechas, WASD o los controles para comenzar.",
      score: "Tecnologías descubiertas",
      pause: "Pausar",
      paused: "Juego en pausa. Pulsa continuar cuando estés listo.",
      resume: "Continuar",
      restart: "Reiniciar",
      exit: "Salir del juego",
      gameOver: "Fin del juego. Reinicia para intentarlo otra vez.",
      won: "¡Completaste todas las tecnologías!",
      food: "NUEVA",
      moveUp: "Mover arriba",
      moveDown: "Mover abajo",
      moveLeft: "Mover a la izquierda",
      moveRight: "Mover a la derecha",
    },
    projects: "Proyectos seleccionados",
    projectsTitle: "Ideas que se hicieron realidad.",
    projectsText: "Una selección de lo que he ayudado a construir.",
    repo: "Ver repositorio",
    company: "Visitar empresa",
    demo: "Ver demo",
    releases: "Descargar",
    walkthrough: "Recorrido",
    screenshots: "Capturas",
    highlights: "Lo más destacado",
    architecture: "Arquitectura",
    architectureLink: "Ver arquitectura interactiva",
    projectCategories: {
      professional: {
        title: "Profesional",
        description: "Construido en mi trabajo, para clientes reales.",
      },
      web: {
        title: "Web y microservicios",
        description: "Sistemas distribuidos de punta a punta.",
      },
      nas: {
        title: "Apps para NAS",
        description: "Self-hosted en servidor TrueNAS casero.",
      },
      desktop: {
        title: "Escritorio Windows",
        description: "Herramientas nativas para Windows.",
      },
      ai: {
        title: "Automatización con IA",
        description: "Scripts que un agente de IA instala y configura por ti.",
      },
    },
    career: "Mi recorrido",
    careerTitle: "Aprender. Construir. Evolucionar.",
    education: "Educación",
    current: "Actual",
    details: "Ver detalles",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    interests: "Fuera del editor",
    interestsTitle: "También hay vida después del código.",
    contact: "Construyamos algo juntos",
    contactTitle: "¿Tienes una idea en mente?",
    contactText:
      "Conversemos sobre tu próximo proyecto y cómo puedo ayudarte a hacerlo realidad.",
    contactButton: "Hablemos",
    social: "Encuéntrame en",
    contactMe: "Contáctame en:",
    heroPlayPrompt: "¿Jugamos algo?",
    space: {
      play: "Tech-Space",
      teaser: "Pilotea la nave entre bloques de tecnologías sin chocar.",
      mobileIntro: "Usa la página desde un computador para jugar Tech-Space.",
      score: "Tecnologías superadas",
      shipAlt: "Nave espacial",
      welcomeTitle: "¡Bienvenido a Tech-Space!",
      welcomeBody:
        "Impulsa la nave con Espacio, la flecha arriba, W o el botón en pantalla. Cruza el espacio entre los bloques de tecnologías sin tocarlos. La partida comenzará con tu primer impulso.",
      welcomeAction: "Entendido, a volar",
      orTap: "o toca el control",
      ready: "Pulsa Espacio, ↑, W o el control para despegar.",
      running: "Mantén el ritmo y atraviesa los bloques.",
      flap: "Impulsar nave",
      lostTitle: "La nave se estrelló",
      lostBody:
        "Chocaste contra una tecnología del recorrido. Puedes intentarlo de nuevo.",
      technologyDescriptions: {
        NestJS: "Framework de Node.js para servicios escalables.",
        "Node.js": "Entorno para ejecutar JavaScript en el servidor.",
        TypeScript: "JavaScript con tipos para código más seguro.",
        MongoDB: "Base de datos NoSQL orientada a documentos.",
        Docker: "Contenedores para empaquetar y ejecutar aplicaciones.",
        ".NET Core": "Plataforma multiplataforma para aplicaciones y APIs.",
        "Azure Functions": "Funciones serverless que se ejecutan bajo demanda.",
        GraphQL: "Lenguaje de consulta flexible para APIs.",
        Python: "Lenguaje versátil y legible para múltiples usos.",
        MySQL: "Base de datos relacional de código abierto.",
        PostgreSQL: "Base de datos relacional avanzada y extensible.",
        Kafka: "Plataforma distribuida de eventos y mensajería.",
        "Next.js": "Framework de React para aplicaciones web modernas.",
      },
      wonTitle: "¡Misión completada!",
      wonBody: "Atravesaste todas las tecnologías dominadas.",
      restart: "Reintentar",
      exit: "Salir del juego",
    },
    emailLabel: "Enviar correo",
    rights: "Todos los derechos reservados.",
    made: "Hecho con curiosidad y código.",
    theme: "Tema",
    themes: ["Claro", "Oscuro", "Sistema"],
    language: "Idioma",
    menu: "Abrir menú",
    skip: "Saltar al contenido",
  },
  general: {
    firstName: "Carlos",
    lastName: "Sesme",
    avatarPicture: "/images/avatar_picture.jpg",
    profession: "Desarrollador Full Stack",
    yearsOfExperience: 5,
  },
  contact: {
    email: "carlos.sesme.923@gmail.com",
    address: "Guayaquil, Ecuador",
    github: "https://github.com/CarlosSV923",
    linkedin: "https://www.linkedin.com/in/carlos-sesme-vera-342769172/",
  },
  about: {
    aboutPicture: "/images/about_picture.jpg",
    school: "ESPOL",
    paragraphs: [
      "Desarrollador Full Stack con más de 5 años de experiencia en la creación de aplicaciones web escalables con arquitectura de microservicios. Especializado en React, NestJS, .NET, MongoDB, Kubernetes y Apache Kafka.",
      "Tengo preferencia por el desarrollo lógico en el Backend, planteando y diseñando arquitecturas robustas y escalables. Sin embargo, cuando surge la oportunidad, también disfruto diseñando interfaces amigables y funcionales para los usuarios, ya que aquello que ven los usuarios es, al final, lo que se queda en su memoria.",
    ],
  },
  education: {
    degree: "Ing. en Ciencias Computacionales",
    institution: "Escuela Superior Politécnica del Litoral - ESPOL",
    dateFrom: "2015",
    dateTo: "2021",
    location: "Guayaquil, Ecuador",
  },
  experience: [
    {
      position: "Pasante de Desarrollo de Software",
      company: "BlackBoxEc",
      dateFrom: "06/2019",
      dateTo: "12/2019",
      achievements: [
        "Desarrollo Web de un sistema de control para registro de llegada de paquetes por Courier.",
        "Mejoras y correcciones en aplicaciones móviles.",
        "Mejoras y correcciones en aplicaciones web utilizando tecnologías ASP.NET",
        "Desarrollo de aplicación de escritorio para procesamiento de documentos Excel.",
      ],
      attitudes: [
        {
          name: "C#",
        },
        {
          name: "Java",
        },
        {
          name: "AngularJS",
        },
        {
          name: "PostgreSQL",
        },
        {
          name: "ASP.NET",
        },
        {
          name: "SQL Server",
        },
        {
          name: ".NET Core",
        },
      ],
      mode: "Presencial",
      location: "Guayaquil, Ecuador",
    },
    {
      position: "Ayudante de Docencia en Base de Datos",
      company: "Escuela Superior Politécnica del Litoral - ESPOL",
      dateFrom: "05/2019",
      dateTo: "10/2019",
      achievements: [
        "Revisión de talleres y tareas asignadas a los estudiantes.",
        "Impartir clases de ayuda y ejercicios prácticos.",
        "Proporcionar retroalimentación a los estudiantes.",
      ],
      attitudes: [
        {
          name: "MySQL",
        },
        {
          name: "Docencia",
        },
      ],
      mode: "Presencial",
      location: "Guayaquil, Ecuador",
    },
    {
      position: "Full Stack Developer",
      company: "Contifico S.A.",
      dateFrom: "06/2020",
      dateTo: "09/2020",
      achievements: [
        "Mantenimiento de aplicación web, corrigiendo errores y agregando nuevas funcionalidades.",
        "Gestión de la base de datos MySQL utilizada por la aplicación web.",
      ],
      attitudes: [
        {
          name: "Python",
        },
        {
          name: "Django",
        },
        {
          name: "MySQL",
        },
        {
          name: "Javascript",
        },
        {
          name: "HTML",
        },
      ],
      mode: "Remoto",
      location: "Guayaquil, Ecuador",
    },
    {
      position: "Sr. Full Stack Developer",
      company: "SIIGO S.A.",
      dateFrom: "09/2020",
      dateTo: "Actualidad",
      achievements: [
        "Implementación de microservicios usando node.js y C#.",
        "Desarrollo web intuitivo usando Reactjs.",
        "Implementación de consumidores y productores Kafka en microservicios.",
        "Administración de bases de datos NoSQL utilizando MongoDB.",
        "Implementación de servicios GraphQL en microservicios Node.js.",
      ],
      attitudes: [
        {
          name: "Javascript",
        },
        {
          name: "TypeScript",
        },
        {
          name: "Reactjs",
        },
        {
          name: "Nodejs",
        },
        {
          name: "NestJS",
        },
        {
          name: "MongoDB",
        },
        {
          name: "Kafka",
        },
        {
          name: "Docker",
        },
        {
          name: "C#",
        },
        {
          name: ".NET Core",
        },
        {
          name: "Azure Functions",
        },
        {
          name: "GraphQL",
        },
      ],
      mode: "Remoto",
      location: "Colombia",
    },
  ],
  skills: {
    groups: [
      {
        name: "Lenguajes y frameworks",
        tech: [
          { name: "TypeScript" },
          { name: "Node.js" },
          { name: "NestJS" },
          { name: ".NET Core" },
          { name: "Python" },
          { name: "Next.js" },
        ],
      },
      {
        name: "Datos y mensajería",
        tech: [
          { name: "MongoDB" },
          { name: "MySQL" },
          { name: "PostgreSQL" },
          { name: "Kafka" },
          { name: "GraphQL" },
        ],
      },
      {
        name: "Cloud y DevOps",
        tech: [{ name: "Docker" }, { name: "Azure Functions" }],
      },
    ],
  },
  projects: {
    aurora: {
      summary:
        "Pasarela de pagos para Siigo S.A. con la que sus clientes pagan sus facturas de forma segura y rápida.",
      highlights: [],
      media: {
        cover: "/projects/aurora/cover.webp",
      },
    },
    gamebook: {
      summary:
        "Catálogo de videojuegos con los títulos mejor valorados de IGDB, cuentas de usuario y una repisa de favoritos. Un frontend en Next.js y dos microservicios en NestJS.",
      highlights: [
        "El frontend en Next.js renderiza el catálogo en el servidor y mantiene las credenciales de IGDB fuera del navegador.",
        "AuthUser gestiona registro e inicio de sesión con JWT RS256 y sesiones que se pueden revocar al instante.",
        "Game guarda los favoritos de cada usuario con filtros y paginación; valida el token y la sesión antes de responder.",
        "PostgreSQL con Prisma, un esquema por servicio, y despliegues independientes en Vercel y Render con GitHub Actions.",
        "Hecho con spec-driven development, en español e inglés, con tema claro y oscuro.",
      ],
      media: {
        cover: "/projects/gamebook/cover-es.webp",
        demo: "/projects/gamebook/demo-en.webp",
        architecture: "/projects/gamebook/architecture-es.svg",
      },
    },
    gameexplorer: {
      summary:
        "App self-hosted para subir, organizar y descargar juegos de emulación en un NAS casero, con una interfaz inspirada en EmulationStation.",
      highlights: [
        "Seis consolas, cada una como un módulo independiente: Nintendo 64, GameCube, Wii, Switch, PlayStation 2 y PSP.",
        "Subidas reanudables de decenas de gigabytes y extracción con 7-Zip, verificada con CRC.",
        "Detecta duplicados antes de escribir y deshace cualquier cambio de la biblioteca que falle a medias.",
        "Un solo binario de Go con la app de React embebida, desplegado como app de TrueNAS SCALE.",
        "Se usa con mouse, teclado, pantalla táctil o gamepad.",
      ],
      media: {
        cover: "/projects/gameexplorer/cover-es.webp",
        demo: "/projects/gameexplorer/demo-es.webp",
        architecture: "/projects/gameexplorer/architecture-es.svg",
      },
    },
    videoexplorer: {
      summary:
        "App self-hosted que organiza películas y series en un NAS casero para que Jellyfin las reconozca, con una biblioteca al estilo Netflix.",
      highlights: [
        "Subidas reanudables, incluidos archivos zip, 7z y rar, que se extraen con 7-Zip.",
        "Sugiere títulos con TMDB y nombra carpetas, videos y subtítulos con la convención de Jellyfin.",
        "Detecta los archivos copiados por SMB y pide a Jellyfin actualizar solo las carpetas que cambiaron.",
        "Papelera con restauración, selección múltiple y descargas de archivos o títulos completos.",
        "Versión 1.0 probada en un NAS TrueNAS SCALE real, con su imagen publicada en GHCR.",
      ],
      media: {
        cover: "/projects/videoexplorer/cover-es.webp",
        demo: "/projects/videoexplorer/demo-es.webp",
        architecture: "/projects/videoexplorer/architecture-es.svg",
      },
    },
    winclonerx: {
      summary:
        "App que permite clonar Windows de una unidad de almacenamiento a otra, dejando el sistema listo para usar.",
      highlights: [
        "Un asistente de cinco pasos en español e inglés, según el idioma de Windows.",
        "Si el disco destino es más pequeño, reduce C: temporalmente y la devuelve a su tamaño al terminar, incluso si la clonación falla o se interrumpe.",
        "Comprueba UEFI y GPT antes de empezar y avisa si la partición usa BitLocker.",
        "Cada versión publica el hash SHA-256 del instalador y una atestación de procedencia de GitHub.",
        ".NET 10 y WPF con DDD, arquitectura hexagonal y spec-driven development.",
      ],
      media: {
        cover: "/projects/winclonerx/screen-1-es.webp",
        gallery: [
          {
            src: "/projects/winclonerx/screen-1-es.webp",
            caption: "Elegir el disco de destino",
          },
          {
            src: "/projects/winclonerx/screen-2-es.webp",
            caption: "Revisar el plan",
          },
          {
            src: "/projects/winclonerx/screen-3-es.webp",
            caption: "Clonado en curso",
          },
          {
            src: "/projects/winclonerx/screen-4-es.webp",
            caption: "Resultado verificado",
          },
        ],
        architecture: "/projects/winclonerx/architecture-es.svg",
      },
    },
    turnontv: {
      summary:
        "Script que permite a una PC con Windows o Linux simular el HDMI-CEC: enciende una Android TV o Google TV y la pone en una entrada HDMI específica, igual que una consola de videojuegos como la PS5 o la Switch.",
      highlights: [
        "Incluye un prompt para agentes de IA (Claude Code, Codex, Gemini CLI) que revisa tu TV, te pregunta lo necesario, lo instala todo y lo prueba contigo.",
        "El agente puede configurar otro PC por SSH, y nunca ve el código de emparejamiento ni las contraseñas: esos los escribes tú.",
        "Usa el protocolo Android TV Remote, el mismo de la app de Google TV, porque casi ninguna tarjeta gráfica soporta HDMI-CEC. No necesita ADB ni opciones de desarrollador.",
        "Envía Wake-on-LAN y reintenta durante 90 segundos, sin mandar POWER a una TV que podría estar encendida.",
        "Se instala como tarea programada en Windows o como servicios de systemd en Linux.",
      ],
      media: {
        cover: "/projects/turnontv/cover.webp",
      },
    },
  },
  interests: [
    {
      name: "Viajes y Fotografía",
      description:
        "Me encanta viajar y conocer nuevos lugares, así como capturar esos momentos con mi cámara fotográfica o celular.",
      url: "https://www.instagram.com/d3v.il.923/",
      image: "/images/interest_travel_photography.jpg",
    },
    {
      name: "Pc Gaming",
      description:
        "Me gusta todo lo relacionado con el mundo del gaming, hardware de PC y tecnología en general.",
      image: "/images/interest_setup_gamer.jpg",
    },
  ],
} satisfies Profile & { readonly ui: object };
