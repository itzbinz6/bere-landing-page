'use client';

import { useState, useRef, useEffect, ReactNode, Children } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'motion/react';

interface InteractiveCarouselProps {
  children: ReactNode;
  className?: string;
}

export function InteractiveCarousel({ children, className = '' }: InteractiveCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorDirection, setCursorDirection] = useState<'prev' | 'next'>('next');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = Children.toArray(children);
  const length = items.length;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (window.innerWidth < 768) return; // Touch devices don't need custom cursor

      const rect = containerRef.current.getBoundingClientRect();
      const isInside = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;

      setIsHovered(isInside);

      if (isInside) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        
        const centerX = rect.width / 2;
        if (e.clientX - rect.left > centerX) {
          setCursorDirection('next');
        } else {
          setCursorDirection('prev');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 7000); // 7 seconds autoplay
    
    return () => clearInterval(timer);
  }, [length]);

  const handleClick = (e: React.MouseEvent) => {
    // Only handle clicks for custom cursor on desktop
    if (window.innerWidth < 768) return;
    
    if (cursorDirection === 'next') {
      setCurrentIndex((prev) => (prev + 1) % length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + length) % length);
    }
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -50) {
      setCurrentIndex((prev) => (prev + 1) % length);
    } else if (swipe > 50) {
      setCurrentIndex((prev) => (prev - 1 + length) % length);
    }
  };

  const getPosition = (index: number) => {
    let diff = (index - currentIndex) % length;
    if (diff < -Math.floor(length / 2)) diff += length;
    if (diff > Math.floor(length / 2)) diff -= length;
    
    // For arrays of even length like 4, prevent two items from jumping to the same edge
    if (length % 2 === 0 && diff === Math.floor(length / 2)) {
      // If we are swiping left (next), keep it on the right to slide in
      diff = length / 2; 
    }
    
    return diff;
  };

  return (
    <div className={`relative w-full overflow-hidden py-12 ${className}`} ref={containerRef}>
      {isHovered && (
        <motion.div
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="pointer-events-none absolute z-50 hidden md:flex h-12 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900 text-white text-sm font-semibold shadow-xl transition-transform duration-150 ease-out"
        >
          {cursorDirection === 'next' ? 'Next →' : '← Prev'}
        </motion.div>
      )}

      <div 
        className="relative h-[480px] md:h-[550px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing md:cursor-none"
        onClick={handleClick}
      >
        {items.map((item, index) => {
          const position = getPosition(index);
          const isCenter = position === 0;
          
          let x = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          
          if (position === 0) {
            x = 0;
            scale = 1;
            opacity = 1;
            zIndex = 20;
          } else if (position === 1) {
            x = 105;
            scale = 0.85;
            opacity = 0.5;
            zIndex = 10;
          } else if (position === -1) {
            x = -105;
            scale = 0.85;
            opacity = 0.5;
            zIndex = 10;
          } else {
             x = position > 0 ? 200 : -200;
             scale = 0.7;
             opacity = 0;
             zIndex = 0;
          }

          // Adjust X for mobile to keep them tighter
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const xValue = isMobile ? x * 0.85 : x;

          return (
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{
                x: `${xValue}%`,
                scale,
                opacity,
                zIndex
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1]
              }}
              className="absolute w-[80vw] md:w-[420px] h-full"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {item}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
