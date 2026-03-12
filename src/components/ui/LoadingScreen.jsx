import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Zap } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const statusRef = useRef(null);
  const scannerRef = useRef(null);
  const bgGridRef = useRef(null);
  
  const [status, setStatus] = useState("Initializing Systems");
  const statusMessages = [
    "Calibrating Neural Pathways",
    "Optimizing Kernel Loops",
    "Synchronizing Edge Nodes",
    "Encrypting Data Streams",
    "VELOCITY Engine Warming Up"
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Initial Reveal & Background Animation
    tl.set(containerRef.current, { visibility: 'visible', opacity: 1 })
      .fromTo(bgGridRef.current, 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power4.out" }
      )
      
    // 2. Logo Entrance with holographic pulse
    tl.fromTo(logoRef.current, 
      { scale: 0, rotation: -90, opacity: 0, filter: 'brightness(0) saturate(0)' },
      { scale: 1, rotation: 0, opacity: 1, filter: 'brightness(1) saturate(1)', duration: 1.5, ease: "elastic.out(1, 0.6)" },
      "-=1.5"
    )

    // 3. Scanner Line Loop
    gsap.fromTo(scannerRef.current,
      { top: "-10%" },
      { top: "110%", duration: 2, ease: "none", repeat: -1 }
    );

    // 4. Branding Text Split Reveal
    const letters = textRef.current.querySelectorAll('.letter');
    tl.fromTo(letters,
      { y: 20, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(2)" },
      "-=0.8"
    );

    // 5. Status Message Cycling
    let currentStatusIdx = 0;
    const statusInterval = setInterval(() => {
      currentStatusIdx = (currentStatusIdx + 1) % statusMessages.length;
      gsap.to(statusRef.current, {
        opacity: 0,
        y: -5,
        duration: 0.3,
        onComplete: () => {
          setStatus(statusMessages[currentStatusIdx]);
          gsap.fromTo(statusRef.current, 
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        }
      });
    }, 1200);

    // 6. Progress Bar with custom easing for "realism"
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 4, 
        ease: "slow(0.7, 0.7, false)",
        onUpdate: function() {
          // Add a subtle jitter to the progress bar glow
          const progress = this.progress();
          if (progress > 0.8) {
             gsap.to(progressRef.current, { boxShadow: `0 0 ${20 + Math.random() * 15}px rgba(255,107,0,0.8)`, duration: 0.1 });
          }
        }
      },
      "-=1"
    );

    // 7. Exit transition
    tl.to(containerRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1.2,
      ease: "expo.inOut",
      delay: 0.5
    });

    return () => {
      tl.kill();
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  const brandingText = "VELOCITY";

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6 invisible overflow-hidden"
    >
      {/* Dynamic Animated Grid Background */}
      <div 
        ref={bgGridRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_100%,40px_40px,40px_40px] pointer-events-none" 
      />
      
      <div className="relative flex flex-col items-center">
        {/* Advanced Logo Container */}
        <div className="relative group">
           {/* Ambient Glow */}
           <div className="absolute inset-0 bg-brand blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
           
           <div 
            ref={logoRef}
            className="relative w-32 h-32 rounded-[32px] bg-gradient-to-br from-brand to-[#ff8c00] flex items-center justify-center shadow-[0_0_60px_rgba(255,107,0,0.4)] mb-12 border border-white/10 backdrop-blur-xl overflow-hidden"
          >
            {/* Holographic Scanner */}
            <div 
              ref={scannerRef}
              className="absolute left-0 right-0 h-[2px] bg-white/60 blur-[1px] shadow-[0_0_15px_white] z-10"
            />
            
            <Zap className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" fill="currentColor" />
            
            {/* Glass corner highlights */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
          </div>
        </div>

        {/* Branding text with split animation */}
        <div className="text-center perspective-[1000px]">
          <h1 ref={textRef} className="text-6xl font-display font-black text-white tracking-tighter mb-4 italic flex">
            {brandingText.split('').map((char, i) => (
              <span key={i} className="letter inline-block">{char}</span>
            ))}
            <span className="text-brand ml-1">.OS</span>
          </h1>
          
          <div className="h-4 flex items-center justify-center">
            <p ref={statusRef} className="text-[12px] font-black uppercase tracking-[0.5em] text-brand/80 drop-shadow-[0_0_8px_rgba(255,107,0,0.3)]">
              {status}
            </p>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-16 w-64 h-[6px] bg-white/5 rounded-full overflow-hidden relative border border-white/5 p-[1px]">
          <div 
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-brand to-[#ffb347] origin-left shadow-[0_0_20px_rgba(255,107,0,0.6)] rounded-full"
          />
        </div>
      </div>

      {/* Footer Meta: Enhanced style */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
         <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">v2.5.0 Quantum Evolution</p>
         </div>
         <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/20">Booting Sub-Systems & Protocols</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

