import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import BentoGrid from './components/BentoGrid';
import RetroGrid from './components/RetroGrid';
import { SplineScene } from './components/SplineScene';
import { MorphingCardStack, CardData } from './components/MorphingCardStack';
import RadialOrbitalTimeline from './components/RadialOrbitalTimeline';
import { TestimonialSlider } from './components/TestimonialSlider';
import BlogSection from './components/BlogSection';
import TermsAndConditions from './components/TermsAndConditions';
import { getIcon } from './constants';
import { ArrowRight, Github } from 'lucide-react';
import { useContent } from './hooks/useContent';

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-20 relative z-10">
    <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 relative inline-block tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
      <span className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 rounded-full ${light ? 'bg-white' : 'bg-accent'}`}></span>
    </h2>
    {subtitle && <p className={`max-w-3xl mx-auto text-xl font-medium ${light ? 'text-blue-100' : 'text-slate-500'}`}>{subtitle}</p>}
  </div>
);

type ViewState = 'home' | 'terms';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const { content, isLoading } = useContent();

  // Transform dynamic product data for MorphingStack
  const productCards: CardData[] = content.products.map((product: any, idx: number) => ({
    id: `product-${idx}`,
    title: product.name,
    description: product.description,
    icon: getIcon(product.iconName, "w-6 h-6"),
  }));

  // Sort and slice blogs to show only latest 3
  const latestBlogs = [...content.blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleNavigate = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateToTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('terms');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white min-h-screen text-slate-600 selection:bg-accent selection:text-white font-sans">
      <Navbar onNavigate={handleNavigate} />
      
      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center pt-32 lg:pt-36 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                alt="Background" 
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                
                {/* Left Content: Text */}
                <div className="flex-1 max-w-3xl text-center lg:text-left order-2 lg:order-1">
                  {/* Badge Removed here */}
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                    {content.home.heroTitle.split("Intelligence")[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Intelligence</span>.
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-500 mb-10 leading-relaxed font-light">
                    {content.home.heroDesc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                    <button 
                      onClick={() => handleNavigate('contact')}
                      className="px-10 py-4 bg-accent hover:bg-accentHover text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                    >
                      {content.home.ctaPrimary} <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleNavigate('services')}
                      className="px-10 py-4 bg-white border border-slate-200 hover:border-accent hover:text-accent text-slate-600 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg"
                    >
                      {content.home.ctaSecondary}
                    </button>
                  </div>
                </div>

                {/* Right Content: 3D Robot */}
                <div className="flex-1 w-full h-[450px] lg:h-[650px] relative order-1 lg:order-2 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <SplineScene 
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Core Services (Bento Grid) */}
          <section id="services" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Retro Grid Background */}
            <RetroGrid />

            <div className="container mx-auto px-6 relative z-10">
              <SectionTitle 
                title="Core Services" 
                subtitle="Your Vision, Engineered with Intelligence" 
              />
              <div className="relative z-20">
                <BentoGrid items={content.services} />
              </div>
            </div>
          </section>

          {/* Solutions Anchor (Hidden) */}
          <div id="solutions" className="absolute" />

          {/* Featured Products (Morphing Stack) */}
          <section id="products" className="py-24 md:py-32 relative overflow-hidden bg-accent">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle 
                  title="Featured Products" 
                  subtitle="Ready-to-Deploy SaaS Solutions for Modern Enterprises" 
                  light={true}
                />
                
                <div className="max-w-6xl mx-auto min-h-[500px]">
                  <MorphingCardStack cards={productCards} />
                </div>
            </div>
          </section>

          {/* Results That Speak (Radial Timeline) -> Portfolio */}
          <section id="portfolio" className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle title="Results That Speak" subtitle="Proven Success Across Industries" />
                <RadialOrbitalTimeline timelineData={content.timeline} />
            </div>
          </section>

          {/* Testimonials (Vertical Slider) -> About */}
          <section id="about" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle title="Client Success Stories" subtitle="What our partners say about us" />
                <TestimonialSlider testimonials={content.testimonials} />
            </div>
          </section>

          {/* Blogs Section */}
          <section id="blog" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-slate-100">
            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle title="Latest Insights" subtitle="Trends, guides, and tech updates from our experts" />
                <BlogSection posts={latestBlogs} />
            </div>
          </section>

          {/* Bottom CTA Section */}
          <section className="py-24 md:py-32 bg-accent relative overflow-hidden text-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
             
             <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                  {content.cta.title}
                </h2>
                <p className="text-blue-50 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                  {content.cta.subtitle}
                </p>
                <button 
                  onClick={() => handleNavigate('contact')}
                  className="group inline-flex items-center gap-3 bg-white text-accent hover:bg-blue-50 px-10 py-5 rounded-full font-bold text-xl transition-all shadow-2xl shadow-black/20 hover:shadow-black/30 transform hover:-translate-y-1"
                >
                  {content.cta.buttonText} 
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </button>
             </div>
          </section>
        </>
      ) : (
        <TermsAndConditions />
      )}

      {/* Footer -> Contact */}
      <footer id="contact" className="bg-white pt-20 pb-10 border-t border-slate-200 text-sm">
        <div className="container mx-auto px-6 text-center md:text-left">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">DeepNeurax</h3>
                    <p className="text-slate-500 max-w-md text-lg leading-relaxed">
                        {content.footer.companyDescription}
                    </p>
                </div>
                <div>
                    <h4 className="text-slate-900 font-bold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-slate-500 text-base">
                        <li><button onClick={() => handleNavigate('about')} className="hover:text-accent transition-colors">About Us</button></li>
                        <li><button onClick={() => handleNavigate('services')} className="hover:text-accent transition-colors">Services</button></li>
                        <li><button onClick={() => handleNavigate('portfolio')} className="hover:text-accent transition-colors">Portfolio</button></li>
                        <li><button onClick={() => handleNavigate('blog')} className="hover:text-accent transition-colors">Blog</button></li>
                        <li><button onClick={() => handleNavigate('contact')} className="hover:text-accent transition-colors">Contact</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-slate-900 font-bold text-lg mb-6">Legal</h4>
                    <ul className="space-y-4 text-slate-500 text-base">
                        <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                        <li><a href="#" onClick={navigateToTerms} className="hover:text-accent transition-colors">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Support Center</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-400 text-base">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <p>{content.footer.copyrightText}</p>
                  <span className="hidden md:inline text-slate-300">|</span>
                  <div className="flex items-center gap-2">
                    <span>Developed by</span>
                    <a 
                      href="https://github.com/abdulmanan69" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-accent font-semibold transition-colors flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      Abdul Manan
                    </a>
                  </div>
                </div>
            </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}

export default App;