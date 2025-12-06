export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  className?: string;
  imageUrl?: string;
}

export interface ProductItem {
  name: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface CaseStudy {
  id?: number;
  title: string;
  stat?: string; // used in simple list
  date?: string; // used in timeline
  description?: string; // used in simple list
  content?: string; // used in timeline
  iconName: string;
  relatedIds?: number[];
  status?: string;
  energy?: number;
  category?: string;
}

export interface PricingPlan {
  title: string;
  description: string;
  features?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface CTAContent {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface FooterContent {
  companyDescription: string;
  copyrightText: string;
  badgeText: string;
}