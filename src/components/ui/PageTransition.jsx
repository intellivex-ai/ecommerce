import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routeTransitionIn, routeTransitionOut } from '../../animations/gsapAnimations';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const overlayRef = useRef(null);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      
      // Phase 1: Wipe Out (Cover screen)
      const outAnim = routeTransitionOut(overlayRef.current);
      
      outAnim.eventCallback('onComplete', () => {
        // Change the actual content
        setDisplayLocation(location);
        window.scrollTo(0, 0);
        
        // Phase 2: Wipe In (Reveal screen)
        const inAnim = routeTransitionIn(overlayRef.current);
        inAnim.eventCallback('onComplete', () => {
          setIsTransitioning(false);
        });
      });
    }
  }, [location, displayLocation]);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[999] bg-brandCharcoal scale-y-0 pointer-events-none"
        style={{ transformOrigin: 'bottom' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white font-display font-black text-4xl tracking-tighter animate-pulse">
                VELOCITY<span className="text-brand">.</span>
            </h2>
        </div>
      </div>
      <div className={isTransitioning ? 'pointer-events-none' : ''}>
        {typeof children === 'function' ? children(displayLocation) : children}
      </div>
    </>
  );
};

export default PageTransition;
