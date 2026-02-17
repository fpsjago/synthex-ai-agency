// ============================================================
// SYNTHEX — Global Type Definitions
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'dribbble';
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: SocialLink[];
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface PricingTier {
  name: string;
  price: {
    monthly: number | 'custom';
    annual: number | 'custom';
  };
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceCardData {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface LogoItem {
  name: string;
  src: string;
}

// Content collection types (derived from Zod schemas)
export interface ServiceFrontmatter {
  title: string;
  description: string;
  icon: string;
  order: number;
  featured: boolean;
  tags: string[];
}

export interface CaseStudyFrontmatter {
  title: string;
  client: string;
  category: string;
  summary: string;
  result: string;
  coverImage: string;
  year: string;
  tags: string[];
  featured: boolean;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  readTime: number;
}

export interface ThemeContextType {
  theme: 'dark' | 'light';
  toggle: () => void;
}
