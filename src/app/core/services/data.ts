export interface Developer {
  slug: 'milton' | 'jefferson';
  name: string;
  role: string;
  photo: string;
  tagline: string;
  bio: string;
  education: {
    title: string;
    place: string;
    period: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
  }[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export interface Technology {
  name: string;
  initials: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  demo?: string;
  repo?: string;
  image?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface Social {
  email: string;
  github: string;
  linkedin: string;
}

export const developers: Developer[] = [
  {
    slug: 'milton',
    name: 'Milton Chuqui',
    role: 'Frontend & UI Developer',
    photo: '/assets/milton.jpg',
    tagline: 'Especialista en interfaces modernas y experiencias de usuario intuitivas',
    bio: 'Apasionado por crear interfaces elegantes y funcionales. Con experiencia en Angular, React y frameworks modernos.',
    education: [
      {
        title: 'Ingeniero en Sistemas',
        place: 'Universidad Politécnica Salesiana',
        period: '2019 - 2024'
      },
      {
        title: 'Curso de Especialización en Frontend',
        place: 'Plataforma de educación en línea',
        period: '2022 - 2023'
      }
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Tailwind CSS', 'Git'],
    projects: [
      {
        name: 'Dashboard Administrativo',
        description: 'Aplicación de gestión empresarial con gráficos interactivos'
      },
      {
        name: 'E-commerce Moderno',
        description: 'Plataforma de compras con carrito y sistema de pagos'
      },
      {
        name: 'Portafolio Profesional',
        description: 'Página web personal con animaciones y diseño responsivo'
      }
    ],
    contact: {
      email: 'milton@example.com',
      github: 'https://github.com/milton',
      linkedin: 'https://linkedin.com/in/milton'
    }
  },
  {
    slug: 'jefferson',
    name: 'Jefferson Guerrero',
    role: 'Full Stack Developer',
    photo: '/assets/jefferson.jpg',
    tagline: 'Desarrollador versátil con experiencia en frontend y backend',
    bio: 'Especializado en crear soluciones completas, desde la interfaz hasta la base de datos. Apasionado por la arquitectura de software limpia.',
    education: [
      {
        title: 'Ingeniero en Sistemas',
        place: 'Universidad Politécnica Salesiana',
        period: '2019 - 2024'
      },
      {
        title: 'Certificación en Cloud Computing',
        place: 'AWS Academy',
        period: '2023'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'Angular', 'Java', 'Python', 'SQL', 'Git', 'Docker'],
    projects: [
      {
        name: 'API REST Escalable',
        description: 'Backend robusto con autenticación JWT y base de datos relacional'
      },
      {
        name: 'Sistema de Inventario',
        description: 'Aplicación completa para gestión de productos y reportes'
      },
      {
        name: 'Chat en Tiempo Real',
        description: 'Aplicación de mensajería con WebSockets'
      }
    ],
    contact: {
      email: 'jefferson@example.com',
      github: 'https://github.com/jefferson',
      linkedin: 'https://linkedin.com/in/jefferson'
    }
  }
];

export const technologies: Technology[] = [
  { name: 'HTML', initials: 'HTML' },
  { name: 'CSS', initials: 'CSS' },
  { name: 'JavaScript', initials: 'JS' },
  { name: 'TypeScript', initials: 'TS' },
  { name: 'Angular', initials: 'NG' },
  { name: 'Java', initials: 'Java' },
  { name: 'Python', initials: 'Py' },
  { name: 'SQL', initials: 'SQL' },
  { name: 'Git & GitHub', initials: 'Git' }
];

export const projects: Project[] = [
  {
    name: 'Plataforma de Gestión',
    description: 'Sistema integral para administración de proyectos con dashboards en tiempo real',
    technologies: ['Angular', 'TypeScript', 'Tailwind'],
    demo: '#',
    repo: '#',
    image: '/assets/project-1.jpg'
  },
  {
    name: 'E-commerce Moderno',
    description: 'Tienda en línea con carrito de compras y sistema de pagos integrado',
    technologies: ['React', 'JavaScript', 'Node.js'],
    demo: '#',
    repo: '#',
    image: '/assets/project-2.jpg'
  },
  {
    name: 'Aplicación Móvil',
    description: 'Aplicación responsiva para gestionar tareas y colaboración en equipo',
    technologies: ['Angular', 'TypeScript', 'Firebase'],
    demo: '#',
    repo: '#',
    image: '/assets/project-3.jpg'
  }
];

export const timeline: TimelineEvent[] = [
  {
    year: 2021,
    title: 'Inicio Académico',
    description: 'Comenzamos nuestro camino en Ingeniería en Sistemas'
  },
  {
    year: 2022,
    title: 'Primeros Proyectos',
    description: 'Desarrollo de aplicaciones web con tecnologías modernas'
  },
  {
    year: 2023,
    title: 'Especialización',
    description: 'Certificaciones y profundización en tecnologías específicas'
  },
  {
    year: 2024,
    title: 'Equipo Profesional',
    description: 'Formamos un equipo de trabajo colaborativo y llevamos proyectos a producción'
  }
];

export const socials: Social = {
  email: 'contacto@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

export function getDeveloper(slug: string): Developer | undefined {
  return developers.find(dev => dev.slug === slug);
}
