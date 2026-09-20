/**
 * Single source of truth for every piece of resume content on the page.
 * Edit this file to update the site — no component changes required.
 */

export type SkillCategory = 'Frontend' | 'Backend' | 'ML / Data' | 'Tools'

export interface Skill {
  name: string
  category: SkillCategory
  /** 0–100, drives the level bar. */
  level: number
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  location: string
  summary: string
  highlights: string[]
  stack: string[]
}

export interface Project {
  id: string
  title: string
  blurb: string
  description: string
  tags: string[]
  demo?: string
  repo?: string
  year: string
}

export interface Certification {
  name: string
  issuer: string
  year?: string
}

export const profile = {
  name: 'Namay Singh',
  initials: 'NS',
  title: 'AI/ML Engineer',
  // Rotates through the hero typewriter.
  roles: [
    'AI/ML Engineer',
    'Full-Stack Developer',
    'B.Tech AI & ML Student',
    'Model → Interface Builder',
  ],
  tagline:
    'Aspiring AI/ML engineer building intelligent systems — and shipping the interfaces that put them in front of people.',
  bio: 'First-year B.Tech (AI & ML) at Intellipaat School of Technology, Bengaluru, and AI & ML Intern at iStudio. I like end-to-end work: training the model, writing the algorithm, then designing the interface that makes it usable.',
  location: 'Bengaluru, India',
  status: 'Open to internships & collaborations',
  // TODO(namay): swap in your real address if you prefer a different contact inbox.
  email: 'namaysingh5@gmail.com',
  linkedin: 'https://www.linkedin.com/in/namay-singh-421160379/',
  github: 'https://github.com/namaysingh3925',
  resumeUrl: '/Namay-Singh-Resume.pdf',
} as const

export const stats = [
  { label: 'Classification accuracy', value: '94%' },
  { label: 'Records analysed', value: '100K+' },
  { label: 'Shipped projects', value: '4+' },
  { label: 'Certifications', value: '4' },
] as const

export const experience: Experience[] = [
  {
    id: 'istudio',
    role: 'AI & ML Intern',
    company: 'iStudio',
    period: 'Present',
    location: 'Bengaluru, India',
    summary:
      'Building and deploying production machine learning models, and the APIs that serve them to frontend teams.',
    highlights: [
      'Developed and fine-tuned ML models in Python, TensorFlow and scikit-learn for production environments.',
      'Reached 94% accuracy on classification tasks through data augmentation and hyperparameter optimization.',
      'Built Flask and FastAPI REST endpoints to deploy trained models for frontend integration.',
      'Ran exploratory analysis and feature engineering across 100K+ record datasets with Pandas and NumPy.',
      'Translated business requirements into ML solutions alongside cross-functional teams.',
    ],
    stack: ['Python', 'TensorFlow', 'scikit-learn', 'FastAPI', 'Pandas'],
  },
]

export const projects: Project[] = [
  {
    id: 'vik',
    title: 'Vik — Music Streaming App',
    blurb: 'Full-stack MERN streaming platform with custom playback.',
    description:
      'A full-stack streaming app wiring the Deezer and Spotify APIs into a custom playback engine, playlist management and a responsive player UI.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    year: '2025',
  },
  {
    id: 'truthlens',
    title: 'TruthLens / VerifyAI',
    blurb: 'Hackathon fake-news detection served over FastAPI.',
    description:
      'A fake-news detection prototype built during a hackathon — a trained classifier served through FastAPI to a React frontend that scores articles in real time.',
    tags: ['FastAPI', 'Python', 'React', 'Tailwind'],
    year: '2025',
  },
  {
    id: 'loyalty',
    title: 'Quick-Commerce Loyalty Model',
    blurb: 'Brand switching across Zepto, Blinkit & Instamart as a Markov chain.',
    description:
      'Modelled customer brand-switching between quick-commerce platforms as a Markov chain — hand-derived transition matrices, a Python simulation of steady states, and visualizations of long-run market share.',
    tags: ['Python', 'NumPy', 'Markov Chains', 'Matplotlib'],
    year: '2025',
  },
  {
    id: 'singers',
    title: 'Singers Dashboard',
    blurb: 'Modular Vite + React dashboard with reusable UI patterns.',
    description:
      'A component-driven analytics dashboard built on Vite and React, focused on clean architecture, reusable primitives and a consistent design language.',
    tags: ['React', 'Vite', 'JavaScript'],
    year: '2024',
  },
]

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 88 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', level: 86 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 84 },
  { name: 'HTML & CSS', category: 'Frontend', level: 92 },
  { name: 'Vite', category: 'Frontend', level: 78 },
  // Backend
  { name: 'Python', category: 'Backend', level: 90 },
  { name: 'Node.js', category: 'Backend', level: 80 },
  { name: 'Express', category: 'Backend', level: 78 },
  { name: 'FastAPI', category: 'Backend', level: 82 },
  { name: 'Flask', category: 'Backend', level: 76 },
  { name: 'MongoDB', category: 'Backend', level: 74 },
  // ML / Data
  { name: 'TensorFlow', category: 'ML / Data', level: 82 },
  { name: 'scikit-learn', category: 'ML / Data', level: 85 },
  { name: 'Pandas', category: 'ML / Data', level: 88 },
  { name: 'NumPy', category: 'ML / Data', level: 86 },
  { name: 'Markov Chains', category: 'ML / Data', level: 80 },
  // Tools
  { name: 'Git & GitHub', category: 'Tools', level: 85 },
  { name: 'Jupyter', category: 'Tools', level: 88 },
  { name: 'VS Code', category: 'Tools', level: 90 },
  { name: 'Postman', category: 'Tools', level: 75 },
]

export const education = {
  degree: 'B.Tech — Computer Science (AI & Machine Learning)',
  institution: 'Intellipaat School of Technology',
  location: 'Bengaluru, India',
  period: 'First Year · In progress',
  notes: [
    'Industry-aligned curriculum with mentorship from IIT faculty.',
    'Coursework spanning machine learning, data structures and full-stack web development.',
    'Interning in parallel at iStudio, applying coursework to production ML projects.',
  ],
}

export const certifications: Certification[] = [
  {
    name: 'Intersection of AI and Environmental Sustainability',
    issuer: 'Microsoft',
  },
  { name: 'GEN AI and AIML Hackathon & Workshop', issuer: 'IISc Bengaluru' },
  { name: 'ICAT Certification', issuer: 'Internship Studio' },
  { name: 'Green Skills Passport', issuer: 'Microsoft' },
]

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
