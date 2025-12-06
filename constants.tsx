import React from 'react';
import { ServiceItem, ProductItem, TestimonialItem, CaseStudy, PricingPlan, NavItem, BlogPost } from './types';
import { 
  Brain, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Server, 
  GraduationCap, 
  ShoppingCart,
  Zap,
  Layers,
  Code,
  Cloud,
  FlaskConical,
  LineChart,
  Package,
  Users,
  Briefcase,
  Factory,
  Wrench,
  Calendar,
  FileText,
  User,
  Clock
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Products', id: 'products' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Blog', id: 'blog' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    title: "AI & Machine Learning",
    description: "Custom AI models, automation, generative AI integration, and agent-based intelligent solutions.",
    iconName: "Brain",
    className: "md:col-span-2",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "IoT Solutions",
    description: "Secure device connectivity, real-time data analytics, and edge computing infrastructure.",
    iconName: "Cpu",
    className: "md:col-span-1",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Cybersecurity",
    description: "Penetration testing, SOC-as-a-Service, vulnerability assessment, and threat monitoring.",
    iconName: "ShieldCheck",
    className: "md:col-span-1",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Software Development",
    description: "Custom web applications, mobile apps, ERP/CRM solutions, and SaaS development.",
    iconName: "Code",
    className: "md:col-span-2",
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Cloud Services",
    description: "Enterprise-grade APIs, microservices, and digital modernization solutions.",
    iconName: "Cloud",
    className: "md:col-span-1",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Digital Growth",
    description: "SEO, paid ads, social media scaling, analytics, and data-driven marketing strategies.",
    iconName: "BarChart3",
    className: "md:col-span-2",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
  }
];

export const WHY_CHOOSE_US = [
  { title: "Deep-Tech Expertise", desc: "Built by engineers who understand modern AI, data, and scalable architecture." },
  { title: "End-to-End Delivery", desc: "From strategy → development → deployment → optimization." },
  { title: "Industry-Focused", desc: "Tailored for manufacturing, retail, healthcare, education, and finance." },
  { title: "Security-Driven", desc: "SOC-compliant processes, secure architecture, and enterprise-level standards." },
  { title: "Scalable & Future-Proof", desc: "Solutions that evolve with your business." },
];

export const FEATURED_PRODUCTS = [
  { 
    name: "Digital Chemistry", 
    description: "A comprehensive platform featuring an interactive periodic table, precise molecule formulation tools, and advanced reactor simulations. Experience complex chemical structures through immersive 3D visualization designed for education and research labs.",
    iconName: "FlaskConical"
  },
  { 
    name: "AI Grading System", 
    description: "Revolutionize assessment with our automated intelligent grading engine that delivers instant feedback and detailed performance analytics. Reduce manual grading time by 90% while providing personalized learning insights for students and educators.",
    iconName: "LineChart"
  },
  { 
    name: "Smart Inventory Manager", 
    description: "Gain complete visibility over your supply chain with real-time tracking, automated stock replenishment, and predictive demand analytics. Optimize warehouse operations, reduce waste, and prevent stockouts with data-driven inventory intelligence.",
    iconName: "Package"
  },
  { 
    name: "AI Payroll & HRMS", 
    description: "Streamline your workforce management with automated attendance tracking, precise payroll processing, and deep employee insights. Our intelligent system handles compliance, benefits, and performance monitoring in one unified, secure platform.",
    iconName: "Users"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  { 
    title: "Retail Automation", 
    stat: "83% Error Reduction", 
    description: "Implemented AI-driven stock intelligence system for leading retail chain.",
    iconName: "Briefcase"
  },
  { 
    title: "Industrial IoT", 
    stat: "40% Downtime Savings", 
    description: "Real-time monitoring solution for manufacturing facility.",
    iconName: "Factory"
  },
  { 
    title: "API Modernization", 
    stat: "2.3x Process Acceleration", 
    description: "Legacy system modernization with microservices architecture.",
    iconName: "Wrench"
  },
];

export const CASE_STUDIES_TIMELINE = [
  {
    id: 1,
    title: "Retail Automation",
    date: "83% Error Reduction",
    content: "Implemented AI-driven stock intelligence system for leading retail chain. Our solution utilized computer vision to track shelf inventory in real-time, integrating seamlessly with existing ERPs to automate restocking orders.",
    category: "Success Story",
    iconName: "Briefcase",
    relatedIds: [2],
    status: "completed",
    energy: 83,
  },
  {
    id: 2,
    title: "Industrial IoT",
    date: "40% Downtime Savings",
    content: "Deployed a real-time monitoring solution for a large-scale manufacturing facility. Sensors on key machinery predict failures before they happen, scheduling maintenance during non-peak hours.",
    category: "Success Story",
    iconName: "Factory",
    relatedIds: [3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "API Modernization",
    date: "2.3x Faster Process",
    content: "Legacy system modernization with microservices architecture for a fintech client. We decoupled monolithic services into scalable containers, improving system reliability and deployment speed significantly.",
    category: "Success Story",
    iconName: "Wrench",
    relatedIds: [1],
    status: "completed",
    energy: 70,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "DeepNeurax transformed our entire business ecosystem with an integrated AI + IoT platform. Remarkable experience!",
    author: "CEO",
    role: "Electronics & Engineering Spark"
  },
  {
    quote: "Professional team, clear communication, and world-class software delivery. They exceeded our expectations.",
    author: "CEO",
    role: "TronicsInn Solutions"
  },
  {
    quote: "The cybersecurity audit revealed critical vulnerabilities we missed. Their remediation plan was flawless and easy to implement.",
    author: "CTO",
    role: "SecureBank FinTech"
  },
  {
    quote: "Their SaaS expertise helped us scale our HR product to 50k users without a hitch. The architecture is rock solid.",
    author: "Product Lead",
    role: "PeopleFirst HR"
  },
  {
    quote: "From the initial consultation to the final deployment of our AI grading system, the attention to detail was impressive.",
    author: "Director",
    role: "Future EdTech"
  }
];

export const DETAILED_SERVICES = [
  {
    category: "Software Development",
    items: ["Custom Web Applications", "Mobile App Development", "Desktop Applications", "ERP / CRM Solutions", "SaaS Development", "E-commerce Solutions", "API Integration"]
  },
  {
    category: "Cybersecurity Solutions",
    items: ["Penetration Testing", "SOC-as-a-Service", "Network Security", "Vulnerability Assessment", "Incident Response", "Secure Infrastructure"]
  },
  {
    category: "AI & ML Solutions",
    items: ["Predictive Analytics", "Computer Vision", "Intelligent Chatbots", "AI-Powered Automation", "NLP-based Systems", "Recommendation Engines"]
  },
  {
    category: "Cloud Services",
    items: ["Cloud Migration (AWS/Azure/GCP)", "Cloud Infrastructure", "Cloud Security", "Hybrid Cloud Architecture", "DevOps & CI/CD"]
  },
  {
    category: "IT Infrastructure",
    items: ["Network Design", "Server Setup", "Enterprise WiFi", "Data Center Management", "CCTV & Access Control"]
  },
  {
    category: "Digital Marketing",
    items: ["SEO/SEM Services", "Social Media Management", "Branding", "Content Creation", "PPC Campaigns"]
  }
];

export const PRODUCTS_DETAILS = [
  { name: "CSS CyberGuard™", desc: "A complete cybersecurity monitoring and threat prevention system." },
  { name: "CSS SmartERP™", desc: "Integrated ERP designed for Pakistani SMEs." },
  { name: "CSS EduSuite™", desc: "A smart learning & school management platform." },
  { name: "CSS AI Vision™", desc: "AI-powered camera & vision-based automation system." },
  { name: "CSS CRM Pro™", desc: "A lightweight CRM designed for sales teams." },
];

export const PRICING_MODELS: PricingPlan[] = [
  { title: "Fixed Project Cost", description: "For well-defined projects with clear scope and deliverables." },
  { title: "Monthly Subscription (SaaS)", description: "Affordable monthly plans for long-term software use." },
  { title: "Dedicated Team Hiring", description: "Hire Developers, designers, and AI engineers full-time or part-time." },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Emerging Cyber Threats in Pakistan",
    date: "May 15, 2025",
    description: "An in-depth look at the latest cybersecurity challenges facing local businesses and how to mitigate them.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    category: "Cybersecurity"
  },
  {
    id: "2",
    title: "How AI is Transforming Local Businesses",
    date: "May 10, 2025",
    description: "Exploring real-world use cases of Artificial Intelligence in retail, finance, and manufacturing sectors.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    category: "Artificial Intelligence"
  },
  {
    id: "3",
    title: "Cloud Migration Roadmap for SMEs",
    date: "May 02, 2025",
    description: "A step-by-step guide for small enterprises to move their infrastructure to the cloud securely and efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=800&auto=format&fit=crop",
    category: "Cloud Computing"
  },
];

// Helper to get icon component
export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'Brain': return <Brain {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'BarChart3': return <BarChart3 {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Code': return <Code {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    case 'FlaskConical': return <FlaskConical {...props} />;
    case 'LineChart': return <LineChart {...props} />;
    case 'Package': return <Package {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Briefcase': return <Briefcase {...props} />;
    case 'Factory': return <Factory {...props} />;
    case 'Wrench': return <Wrench {...props} />;
    case 'Calendar': return <Calendar {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'User': return <User {...props} />;
    case 'Clock': return <Clock {...props} />;
    default: return <Zap {...props} />;
  }
};