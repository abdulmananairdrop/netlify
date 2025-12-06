import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Code2 } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

// --- Button Component ---
enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  OUTLINE = 'outline'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = ButtonVariant.PRIMARY, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    [ButtonVariant.PRIMARY]: "bg-accent text-white hover:bg-accentHover shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 border border-transparent",
    [ButtonVariant.SECONDARY]: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900",
    [ButtonVariant.OUTLINE]: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900",
    [ButtonVariant.GHOST]: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'} px-4`}>
      {/* Main Navbar Pill */}
      <header
        className={`w-full max-w-6xl transition-all duration-300 ease-out
          ${isScrolled 
            ? 'bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/[0.05]' 
            : 'bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.02]'
          } 
          rounded-full flex flex-col relative overflow-visible z-20`}
      >
        {/* Glass reflection gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none rounded-full" />

        <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 relative z-10">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="text-white w-5 h-5 relative z-10" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-800 tracking-tight transition-colors duration-300 leading-none">
                DeepNeurax
                </span>
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest leading-none mt-0.5">Technologies</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/50 rounded-full px-2 py-1.5 border border-white/50 shadow-inner ring-1 ring-black/[0.02] transition-colors duration-300">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-accent hover:bg-white rounded-full transition-all duration-300 hover:shadow-md group"
              >
                {item.label}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
                variant={ButtonVariant.PRIMARY} 
                className="px-5 text-sm"
                onClick={() => scrollToSection('contact')}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isMobileMenuOpen 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown - Separate Floating Panel */}
      <div 
        className={`w-full max-w-6xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] absolute left-0 right-0 mx-auto px-4
          ${isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 top-full mt-2' 
            : 'opacity-0 -translate-y-4 top-0 pointer-events-none'
          }
           z-10`}
      >
        <div className="bg-white/90 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-3xl ring-1 ring-black/[0.05] p-4 flex flex-col gap-2">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center justify-between px-4 py-3 text-base font-medium text-slate-600 rounded-2xl hover:bg-white hover:text-accent transition-all duration-200 hover:pl-5 hover:shadow-sm border border-transparent hover:border-slate-100"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </button>
              ))}
            </nav>
            
            <div className="mt-2 pt-4 border-t border-slate-200/50 flex flex-col gap-3">
              <Button 
                variant={ButtonVariant.PRIMARY} 
                className="w-full justify-center py-3"
                onClick={() => scrollToSection('contact')}
              >
                Get a Quote
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;