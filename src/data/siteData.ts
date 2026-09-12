import {
  Bot,
  Server,
  Code2,
  Shield,
  Layers,
  Database,
  MessageCircle,
  FolderGit2,
  Cpu,
  type LucideIcon,
} from 'lucide-react';


export interface Project {
  name: string;
  description: string;
  category: string;
  link?: string;
  github?: string;
  isMaintenance?: boolean;
  isPrivate?: boolean;
  isFlagship?: boolean;
  stars?: number;
  downloads?: string | number;
  modrinthSlug?: string;
  tags: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export interface Contributor {
  name: string;
  role: string;
  imageUrl: string;
  profileUrl: string;
  hoverText?: string;
}

export const studioMetadata = {
  name: 'PotenFYR Studios',
  tagline: 'High-Performance Software, Infrastructure & Ecosystem Tooling',
  hqStatus: 'OPERATIONAL | ALL SYSTEMS ONLINE',
  githubOrg: 'https://github.com/PotenFYR-Studios',
  modrinthOrg: 'https://modrinth.com/organization/potenfyr',
  email: 'support@potenfyr.in',
  location: 'Global / Remote',
};

export const contributors: Contributor[] = [
  {
    name: 'DawnOfDedSec',
    role: 'Lead Developer & Architect',
    imageUrl: 'https://avatars.githubusercontent.com/u/67759305?v=4',
    profileUrl: 'https://github.com/DawnOfDedSec',
  },
  {
    name: 'dashutosh04',
    role: 'Core Systems Developer',
    imageUrl: 'https://avatars.githubusercontent.com/u/68150772?v=4',
    profileUrl: 'https://github.com/dashutosh04',
    hoverText: 'Just a guy',
  },
  {
    name: 'opsiialpha',
    role: 'Community Manager & Operations',
    imageUrl: 'https://avatars.githubusercontent.com/u/204182523?v=4',
    profileUrl: 'https://github.com/opsiialpha',
  },
];

export const projects: Project[] = [
  {
    name: 'AuthCore',
    description:
      'Lightweight, server-side authentication and defense-in-depth framework for Fabric servers. Features session management, multi-factor auth, and anti-abuse safeguards.',
    category: 'Minecraft Tooling',
    link: 'https://modrinth.com/mod/authcore',
    github: 'https://github.com/PotenFYR-Studios/AuthCore',
    isFlagship: true,
    modrinthSlug: 'authcore',
    downloads: '2,000+',
    tags: ['Fabric', 'Java', 'Modrinth', 'Security'],
  },
  {
    name: 'Minecraft-Eggs',
    description:
      'Universal Minecraft egg ecosystem for Pterodactyl, Pelican, and Feather Panel. Supports Vanilla, Paper, Purpur, Fabric, Forge, NeoForge, Velocity, Bedrock, and all 18+ server types.',
    category: 'Hosting Eggs',
    github: 'https://github.com/PotenFYR-Studios/Minecraft-Eggs',
    isFlagship: true,
    tags: ['Pterodactyl', 'Pelican', 'Feather', 'Docker', 'Shell'],
  },
  {
    name: 'Prog-Language-Eggs',
    description:
      'One egg, one image, every language. Production-grade hosting platform that compiles and runs 50+ programming languages inside your container across Pterodactyl, Pelican, Feather, Kubernetes, and Fly.io.',
    category: 'Hosting Eggs',
    github: 'https://github.com/PotenFYR-Studios/Prog-Language-Eggs',
    isFlagship: true,
    tags: ['50+ Languages', 'Multi-Arch', 'Docker', 'DevOps'],
  },
  {
    name: 'Database-Eggs',
    description:
      'One egg. Every database. Every version. Multi-database container eggs for PostgreSQL, MariaDB, MongoDB, Redis, and more across game and app hosting panels.',
    category: 'Hosting Eggs',
    github: 'https://github.com/PotenFYR-Studios/Database-Eggs',
    isFlagship: true,
    tags: ['Databases', 'Pelican', 'Pterodactyl', 'Docker'],
  },
  {
    name: 'Statfyr',
    description:
      'High-throughput REST API plugin for Minecraft exposing real-time player statistics, leaderboards, kill/death ratios, playtime, and analytics for web dashboards and bots.',
    category: 'Minecraft Tooling',
    link: 'https://modrinth.com/plugin/statfyr',
    github: 'https://github.com/PotenFYR-Studios/statfyr',
    modrinthSlug: 'statfyr',
    tags: ['REST API', 'Paper', 'Spigot', 'Analytics'],
  },
  {
    name: 'APICordon',
    description:
      'GitHub-native security layer for APIs. Discovers APIs exposed in codebase, correlates contracts and security tools, and outputs actionable pull-request feedback.',
    category: 'Security & APIs',
    github: 'https://github.com/PotenFYR-Studios/APICordon',
    isFlagship: true,
    tags: ['API Security', 'GitHub Actions', 'DevSecOps'],
  },
  {
    name: 'Jericho Discord Bot',
    description:
      'Multipurpose community management, ticket automation, and server entertainment bot built for active Discord communities.',
    category: 'Discord & Bots',
    link: 'https://top.gg/bot/1470079725106888817',
    isPrivate: true,
    tags: ['Discord Bot', 'Automation', 'TypeScript', 'Active Service'],
  },
  {
    name: 'ojaj (OneJumpAllJump)',
    description:
      'A synchronized, chaotic Spigot/Paper plugin where a single jump from any player causes every online player on the server to jump.',
    category: 'Minecraft Tooling',
    link: 'https://modrinth.com/plugin/onejumpalljump',
    github: 'https://github.com/PotenFYR-Studios/ojaj',
    modrinthSlug: 'onejumpalljump',
    tags: ['Paper', 'Spigot', 'Fun', 'Modrinth'],
  },
  {
    name: 'EchoingDeaths',
    description:
      'Minecraft plugin adding immersive death-based curses and thematic debuffs to nearby players whenever a death event triggers.',
    category: 'Minecraft Tooling',
    link: 'https://modrinth.com/plugin/echoing-deaths',
    github: 'https://github.com/PotenFYR-Studios/EchoingDeaths',
    modrinthSlug: 'echoing-deaths',
    tags: ['Paper', 'Spigot', 'Immersion'],
  },
  {
    name: 'LootiFYR',
    description:
      'Deals distribution web platform streaming verified bargains from major e-commerce storefronts via WhatsApp, Telegram, and Web.',
    category: 'Web & Distribution',
    link: 'https://lootfyr.potenfyr.in/',
    isPrivate: true,
    tags: ['E-Commerce', 'Web App', 'Deals', 'Live Platform'],
  },
];

export const services: Service[] = [
  {
    title: 'Universal Hosting Containers',
    description: 'Custom container eggs for Pterodactyl, Pelican, and Feather panels supporting game servers, 50+ languages, and databases.',
    icon: Server,
    badge: 'Flagship Core',
  },
  {
    title: 'Minecraft Mod & Plugin Engineering',
    description: 'Fabric mods, Paper/Spigot plugins, authentication frameworks, and real-time game telemetry engines built in Java.',
    icon: Layers,
    badge: 'Game Systems',
  },
  {
    title: 'API Security & Verification',
    description: 'Automated contract verification, API discovery, and CI/CD pull request security tooling for enterprise applications.',
    icon: Shield,
    badge: 'DevSecOps',
  },
  {
    title: 'Discord Bot & Workflow Automation',
    description: 'Custom Discord bots with slash command frameworks, webhooks, ticket dispatchers, and member verification pipelines.',
    icon: Bot,
    badge: 'Automation',
  },
  {
    title: 'High-Throughput Backend & APIs',
    description: 'Low-latency REST and WebSocket architectures designed for high concurrency, real-time sync, and rock-solid uptime.',
    icon: Code2,
    badge: 'Cloud Services',
  },
  {
    title: 'Container & DevOps Infrastructure',
    description: 'Docker image packaging, multi-architecture builds (AMD64 & ARM64), and automated CI/CD deployment pipelines.',
    icon: Database,
    badge: 'Infrastructure',
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub Organization',
    url: 'https://github.com/PotenFYR-Studios',
    icon: FolderGit2,
    color: '#38bdf8',
    description: 'Explore our open-source codebase & pull requests',
  },
  {
    name: 'Modrinth Ecosystem',
    url: 'https://modrinth.com/organization/potenfyr',
    icon: Layers,
    color: '#1bd96a',
    description: 'Download official Minecraft mods & plugins',
  },
  {
    name: 'Community Discord',
    url: 'https://discord.gg/zUaN2FPBec',
    icon: MessageCircle,
    color: '#5865F2',
    description: 'Join developers, report bugs & get early builds',
  },
  {
    name: 'Technical Support',
    url: 'https://discord.gg/PRJASTKqwD',
    icon: Cpu,
    color: '#06b6d4',
    description: 'Open support tickets & server infrastructure help',
  },
];

export interface BountyResearcher {
  id: string;
  name: string;
  handle: string;
  role: string;
  targetProject: string;
  rewardTier: 'Critical' | 'High' | 'Medium' | 'Hall of Fame';
  findingsCount: number;
  highlight: string;
  awardedDate: string;
  socials: {
    github?: string;
    twitter?: string;
    discord?: string;
    linkedin?: string;
  };
}

export const bountyResearchers: BountyResearcher[] = [
  {
    id: 'res-abhay',
    name: 'Abhay Kumar',
    handle: 'abhay-kumar-ydv',
    role: 'Independent External Researcher',
    targetProject: 'LootiFYR',
    rewardTier: 'Critical',
    findingsCount: 1,
    highlight: 'Discovered and responsibly disclosed 1 critical security vulnerability in the LootiFYR platform, verified and patched by PotenFYR Studios.',
    awardedDate: '2026',
    socials: {
      linkedin: 'https://www.linkedin.com/in/abhay-kumar-ydv',
    },
  },
  {
    id: 'res-pritam',
    name: 'Pritam Kumar',
    handle: 'pritam-kumar-6a44a927b',
    role: 'Independent External Researcher',
    targetProject: 'LootiFYR',
    rewardTier: 'Critical',
    findingsCount: 1,
    highlight: 'Discovered and responsibly disclosed 1 critical security vulnerability in the LootiFYR platform, verified and patched by PotenFYR Studios.',
    awardedDate: '2026',
    socials: {
      linkedin: 'https://www.linkedin.com/in/pritam-kumar-6a44a927b',
    },
  },
];

export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Telemetry', href: '#telemetry' },
  { label: 'Tech Matrix', href: '#tech-stack' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Bug Bounty', href: '#bug-bounty' },
];

