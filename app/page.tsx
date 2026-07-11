'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { StatCounter } from '@/components/ui/stat-counter';
import { AnimatedSection, AnimatedCard } from '@/components/ui/animated-section';
import { InteractiveCarousel } from '@/components/ui/interactive-carousel';

// Custom inline SVG icons to bypass deprecated lucide-react brand icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Configure your waitlist and social platform handles here!
  const tallyWaitlistUrl = "https://tally.so/r/7R58GR";
  const instagramUrl = "https://www.instagram.com/berehq";
  const xUrl = "https://x.com/berehq";
  const linkedinUrl = "https://www.linkedin.com/company/berehq/";

  const { scrollYProgress } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"]
  });
  
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safeguard: Force the local video to play automatically if the browser blocks it
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented initially:", err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Section 1 - Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-sm py-4' : 'bg-transparent border-b border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="font-display font-bold text-2xl tracking-tighter text-white transition-colors duration-500">bẹrẹ</div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90 transition-colors duration-500">
            <a href="#problem" className="hover:text-white transition-colors duration-300">Why bẹrẹ</a>
            <a href="#framework" className="hover:text-white transition-colors duration-300">The Framework</a>
            <a href="#modules" className="hover:text-white transition-colors duration-300">Modules</a>
          </div>
          <a 
            href={tallyWaitlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex items-center gap-1.5 ${scrolled ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-white text-stone-900 hover:bg-stone-100'}`}
          >
            Join the Waitlist
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Section 2 - Hero with Background Video Loop */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-stone-950" ref={heroImgRef}>
        <motion.div style={{ y: heroImageY }} className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
          <div className="relative w-full h-full">
            {/* Our optimized background video loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover scale-85 opacity-90 transition-opacity duration-1000"
            >
              {/* Pointing to public directory path, which you can later change to your Vercel Blob CDN link */}
              <source src="/videos/hero-loop.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Visual gradient overlays for contrast and text legibility */}
          <div className="absolute inset-0 bg-stone-950/70 sm:bg-stone-950/60 z-10 transition-colors duration-1000"></div>
          <motion.div 
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent z-10"
          ></motion.div>
        </motion.div>

        {/* Content container */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 md:px-8 text-center flex flex-col items-center mt-12 md:mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-white/20 shadow-xl"
          >
            <span>AI-Powered</span>
            <span className="opacity-50">·</span>
            <span>Built in Africa</span>
            <span className="opacity-50">·</span>
            <span>Built for the World</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8 text-white drop-shadow-lg"
          >
            9 in 10 <br />
            startups fail. <br />
            bẹrẹ changes <span className="text-orange-500">that.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-2xl text-stone-200 mb-12 max-w-2xl leading-relaxed font-light drop-shadow"
          >
            An AI-powered startup intelligence platform that gives Founders the data, the tools, and the intelligence to build businesses that survive, scale, and matter.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-16 w-full max-w-md px-4 sm:px-0"
          >
            <div className="shadow-2xl rounded-lg">
              <a 
                href={tallyWaitlistUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row gap-3 w-full p-2 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-xl hover:border-orange-500/50 transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="flex-grow px-4 py-3 text-stone-400 text-sm flex items-center bg-transparent">
                  Enter your email to join the waitlist...
                </div>
                <span className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg text-sm transition-all duration-300 group-hover:bg-orange-700 flex items-center justify-center gap-2 shrink-0">
                  Join Waitlist
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
            <p className="text-xs text-stone-300 mt-5 flex items-center justify-center space-x-2 font-medium drop-shadow-sm">
              <span>Free to join</span>
              <span className="opacity-50">·</span>
              <span>No credit card</span>
              <span className="opacity-50">·</span>
              <span>Built for African founders</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full pt-10 border-t border-white/20"
          >
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md"><StatCounter end={90} suffix="%" /></div>
              <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow-sm">of startups fail globally</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md"><StatCounter end={54} /></div>
              <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow-sm">African countries in scope</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md"><StatCounter end={7} /></div>
              <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow-sm">Meridian dimensions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - The Problem */}
      <section id="problem" className="py-24 md:py-32 bg-stone-950 text-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <div className="text-sm font-semibold tracking-widest text-orange-500 mb-6 uppercase">The Problem</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Most startups don’t fail because<br className="hidden md:block" /> the idea was bad.
            </h2>
            <p className="text-2xl md:text-3xl text-stone-400 font-light mb-20">
              They fail because no one told them what was coming.
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            <AnimatedSection delay={0.08} className="relative bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden group hover:border-stone-700 transition-colors flex flex-col h-full w-full">
              <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="No Early Warning" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/20"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400 opacity-50 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="relative z-10 p-8 flex flex-col h-full justify-end text-left">
                <div className="text-orange-500 font-display font-bold text-2xl mb-4">01</div>
                <h3 className="text-2xl font-bold mb-4 text-white">No Early Warning</h3>
                <p className="text-stone-400 leading-relaxed text-lg">
                  Founders discover critical weaknesses during investor due diligence — when it is already too late to fix them.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.16} className="relative bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden group hover:border-stone-700 transition-colors flex flex-col h-full w-full">
              <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80" fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="Wrong Tools" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/20"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400 opacity-50 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="relative z-10 p-8 flex flex-col h-full justify-end text-left">
                <div className="text-orange-500 font-display font-bold text-2xl mb-4">02</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Wrong Tools, Wrong Market</h3>
                <p className="text-stone-400 leading-relaxed text-lg">
                  Every major startup tool was designed for Silicon Valley. None account for African realities — regulation, infrastructure, currency, or distribution.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.24} className="relative bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden group hover:border-stone-700 transition-colors flex flex-col h-full w-full">
              <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80" fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="Knowledge Gap" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/20"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400 opacity-50 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="relative z-10 p-8 flex flex-col h-full justify-end text-left">
                <div className="text-orange-500 font-display font-bold text-2xl mb-4">03</div>
                <h3 className="text-2xl font-bold mb-4 text-white">The Knowledge Gap</h3>
                <p className="text-stone-400 leading-relaxed text-lg">
                  Investors use proprietary scoring frameworks. Founders walk in blind, get rejected, and never know why.
                </p>
              </div>
            </AnimatedSection>
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 4 - The Solution */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-sm font-semibold tracking-widest text-orange-600 mb-6 uppercase">The Solution</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Meet bẹrẹ.</h2>
            <p className="text-xl text-stone-600">
              The startup intelligence platform that gives every Founder the advantage that only the most well-connected founders currently have.
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            <AnimatedCard delay={0.08} className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full">
              <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Intelligence" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-4">Intelligence</div>
                <h3 className="text-2xl font-display font-bold mb-3">The bẹrẹ Risk Profile</h3>
                <p className="text-stone-600 leading-relaxed text-[15px]">
                  A guided 10-minute assessment across 7 dimensions of startup health. The Meridian Framework evaluates your financial position, market strength, team capability, regulatory standing, product readiness, operational health, and distribution potential — calibrated specifically for African market conditions.
                </p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.16} className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full">
              <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Clarity" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-4">Clarity</div>
                <h3 className="text-2xl font-display font-bold mb-3">Understand What’s Holding You Back</h3>
                <p className="text-stone-600 leading-relaxed text-[15px]">
                  Get a 0–100 score with plain-English explanations of every number. Know exactly which dimension is dragging your performance down and what you need to do about it — before any investor tells you.
                </p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.24} className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full">
              <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Action" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-4">Action</div>
                <h3 className="text-2xl font-display font-bold mb-3">A Roadmap, Not Just a Report</h3>
                <p className="text-stone-600 leading-relaxed text-[15px]">
                  Every bẹrẹ assessment produces a prioritised action plan with specific, time-bound steps ranked by the score improvement they will deliver. Download it as a PDF. Share it directly with investors.
                </p>
              </div>
            </AnimatedCard>
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 5 - The Meridian Framework */}
      <section id="framework" className="py-24 md:py-32 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-16">
            <div className="text-sm font-semibold tracking-widest text-orange-600 mb-6 uppercase">The Meridian Framework</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Seven dimensions of startup intelligence.</h2>
            <p className="text-lg text-stone-600 max-w-2xl">
              Traditional VC frameworks cover five domains. The bẹrẹ Meridian Framework goes further.
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            {[
              { id: '01', name: 'Financial Risk', desc: 'Can this startup survive long enough to win?', img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80' },
              { id: '02', name: 'Market Risk', desc: 'Is there a real, winnable market here?', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' },
              { id: '03', name: 'Team Risk', desc: 'Does this team have what it takes?', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
              { id: '04', name: 'Regulatory Risk', desc: 'Will the law let this business scale?', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80' },
              { id: '05', name: 'Product & Tech Risk', desc: 'Does the product work at African scale?', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80' },
              { id: '06', name: 'Operational Risk', desc: 'Can this team run the business day-to-day?', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
              { id: '07', name: 'Distribution Risk', desc: 'Can this business reach and grow beyond its current boundaries?', img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80' },
            ].map((dim, i) => (
              <AnimatedCard key={dim.id} delay={i * 0.08} className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full">
                <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                  <Image src={dim.img} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt={dim.name} referrerPolicy="no-referrer" />
                </div>
                <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                  <div className="text-orange-600 font-display font-bold text-2xl mb-2 transition-transform duration-300 group-hover:translate-x-1">{dim.id}</div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-stone-900">{dim.name}</h3>
                  <p className="text-stone-600 text-[15px] leading-relaxed">{dim.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 6 - Built for Africa */}
      <section className="py-24 md:py-32 bg-stone-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full md:w-1/2 text-left">
              <AnimatedSection>
                <div className="text-sm font-semibold tracking-widest text-orange-500 mb-6 uppercase">Why Africa First?</div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  The hardest market to build in produces the most robust tools.
                </h2>
                <div className="space-y-6 text-stone-400 text-lg leading-relaxed mb-12">
                  <p>
                    Africa is not a difficult market to build for. It is a complex one — 54 countries, dozens of regulatory frameworks, currency volatility, infrastructure gaps, and the fastest-growing digital population in the world.
                  </p>
                  <p>
                    bẹrẹ was calibrated here because the conventional startup playbook was never written for this environment. A tool built to work honestly in the most complex conditions in the world works everywhere.
                  </p>
                  <p className="text-white font-medium">
                    We are starting in Africa. We are building for the world.
                  </p>
                </div>
                
                <div className="flex gap-12 border-t border-stone-800 pt-8">
                  <div>
                    <div className="font-display text-4xl font-bold text-white mb-2"><StatCounter end={54} /></div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide">African countries in scope</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-bold text-white mb-2"><StatCounter end={10} /></div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide">Startup sectors covered</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <AnimatedSection>
                <div className="relative aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
                   <Image 
                     src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                     alt="African innovation and collaboration" 
                     fill 
                     className="object-cover"
                     referrerPolicy="no-referrer"
                   />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 - The Intelligence Suite */}
      <section id="modules" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-16">
            <div className="text-sm font-semibold tracking-widest text-orange-600 mb-6 uppercase">The bẹrẹ Intelligence Suite</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Everything a founder needs. One platform.</h2>
            <p className="text-lg text-stone-600 max-w-2xl">
              The Risk Profile is just the beginning. Seven purpose-built modules. One data foundation.
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            {[
              { name: 'bẹrẹ Risk Profile', desc: 'Your complete startup health assessment across 7 Meridian dimensions. The foundation of everything.', live: true, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
              { name: 'Pre-Launch Risk Scan', desc: 'For founders before they have an MVP. Assess what you can control before you build.', live: false, img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80' },
              { name: 'Investment Readiness Score', desc: 'See your startup through an investor’s eyes.', live: false, img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80' },
              { name: 'Competitor Benchmarking', desc: 'How do you rank against startups in your sector, country, and stage?', live: false, img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' },
              { name: 'Execution Playbook', desc: 'A dynamic operational roadmap tailored to your industry and location.', live: false, img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
              { name: 'bẹrẹ Pitch Lab', desc: 'AI-powered pitch simulation. Practice against a calibrated investor before the real meeting.', live: false, img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80' },
              { name: 'bẹrẹ Advisor', desc: 'Your AI thinking partner, grounded in your startup data and African ecosystem intelligence.', live: false, img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80' },
            ].map((mod, i) => (
              <AnimatedCard key={i} delay={i * 0.08} className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full">
                <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                  <Image src={mod.img} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt={mod.name} referrerPolicy="no-referrer" />
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 to-transparent group-hover:from-orange-400 transition-colors duration-500 z-20"></div>
                <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                  <div className="mb-4 flex justify-between items-start">
                    {mod.live ? (
                      <span className="inline-flex items-center space-x-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Available Now</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 bg-stone-100 text-stone-500 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        <span>Coming Soon</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">{mod.name}</h3>
                  <p className="text-stone-600 text-[15px] leading-relaxed">{mod.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 8 - Trust Strip */}
      <section className="py-8 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-center font-medium tracking-wide">
            <span>Built in Africa</span>
            <span className="hidden md:block opacity-40">|</span>
            <span>Built for the World</span>
          </div>
        </div>
      </section>

      {/* Section 9 - Final CTA */}
      <section id="waitlist" className="py-24 md:py-32 bg-stone-100 text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Be part of the movement.</h2>
            <p className="text-xl text-stone-600 mb-10">
              bẹrẹ is building the infrastructure African founders have always deserved. Join the waitlist and be among the first founders on the platform.
            </p>
            
            <div className="flex justify-center mb-6 max-w-md mx-auto">
              <a 
                href={tallyWaitlistUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row gap-3 w-full p-2 bg-white border border-stone-200 rounded-xl hover:border-orange-500/50 shadow-md transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="flex-grow px-4 py-3 text-stone-400 text-sm flex items-center bg-transparent">
                  Enter your email to join the waitlist...
                </div>
                <span className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg text-sm transition-all duration-300 group-hover:bg-orange-700 flex items-center justify-center gap-2 shrink-0">
                  Join Waitlist
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
            
            <p className="text-sm text-stone-500 flex justify-center items-center gap-2 md:gap-4 flex-wrap">
              <span>Free to join</span>
              <span className="hidden md:inline">·</span>
              <span>No credit card required</span>
              <span className="hidden md:inline">·</span>
              <span>Cancel anytime</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 10 - Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="font-display font-bold text-3xl tracking-tighter mb-6 md:mb-0">bẹrẹ</div>
            <div className="flex space-x-6">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a 
                href={xUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <span className="sr-only">X</span>
                <XIcon className="w-5 h-5 mt-0.5" />
              </a>
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              The operating system for ambition. <br className="md:hidden" />
              Built in Africa. Built for the world.
            </div>
            <div className="text-center md:text-right mb-8 md:mb-0">
              <a href="mailto:contactberehq@gmail.com" className="hover:text-stone-900 transition-colors">
                contactberehq@gmail.com
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-stone-400 mt-8 pt-8 border-t border-stone-200">
            © 2026 bẹrẹ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}