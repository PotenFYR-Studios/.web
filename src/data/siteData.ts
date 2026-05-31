import {
  Bot,
  Server,
  Code2,
  Puzzle,
  Wrench,
  Cloud,
  GitBranch,
  MessageCircle,
  Linkedin,
  type LucideIcon,
} from 'lucide-react';

export interface Project {
  name: string;
  description: string;
  category: string;
  link?: string;
  github?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  color: string;
}

export const projects: Project[] = [
  {
    name: 'AuthCore',
    description:
      'Advanced authentication and account security system for Minecraft servers.',
    category: 'Minecraft Mod [Fabric]',
    link: 'https://modrinth.com/mod/authcore',
    github: 'https://github.com/PotenFYR-Studios/AuthCore',
  },
  {
    name: 'Statfyr',
    description:
      'Minecraft statistics API and analytics platform with real-time tracking support.',
    category: 'Minecraft Plugin [Bukkit/Spigot]',
    link: 'https://modrinth.com/plugin/statfyr',
    github: 'https://github.com/PotenFYR-Studios/statfyr',
  },
  {
    name: 'Jericho Discord Bot',
    description:
      'Multipurpose Discord automation and management system.',
    category: 'Discord Bot',
    link: 'https://top.gg/bot/1470079725106888817',
  },
];

export const services: Service[] = [
  {
    title: 'Discord Automation',
    description: 'Custom bots, moderation systems, and workflow automation for Discord communities.',
    icon: Bot,
  },
  {
    title: 'Minecraft Infrastructure',
    description: 'Plugins, mods, and server-side systems built for performance and scale.',
    icon: Server,
  },
  {
    title: 'Backend Systems',
    description: 'Robust backend architectures designed for reliability and high throughput.',
    icon: Code2,
  },
  {
    title: 'APIs & Integrations',
    description: 'RESTful and WebSocket APIs with seamless third-party integrations.',
    icon: Puzzle,
  },
  {
    title: 'Custom Development',
    description: 'Tailored solutions for unique technical challenges and business requirements.',
    icon: Wrench,
  },
  {
    title: 'Future Hosting Solutions',
    description: 'Cloud infrastructure and game server hosting - coming soon.',
    icon: Cloud,
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Potato-Modding',
    icon: GitBranch,
    color: '#f0f0f0',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/zUaN2FPBec',
    icon: MessageCircle,
    color: '#5865F2',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/potenfyr',
    icon: Linkedin,
    color: '#0A66C2',
  },
  // {
  //   name: 'Email',
  //   url: 'mailto:
  //   icon: Mail,
  //   color: '#cbd5e1',
  // },
  
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
];
