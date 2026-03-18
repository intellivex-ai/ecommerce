import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero text reveal animation
 */
export const heroReveal = (container) => {
  if (!container) return;
  const tl = gsap.timeline();
  tl.fromTo(
    container.querySelectorAll('.hero-animate'),
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
  );
  return tl;
};

/**
 * Scroll reveal for sections
 */
export const scrollReveal = (elements, options = {}) => {
  if (!elements) return;
  const targets = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;

  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          ...options,
        },
      }
    );
  });
};

/**
 * Product card hover animation
 */
export const productHover = (card, imageEl) => {
  if (!card || !imageEl) return;
  card.addEventListener('mouseenter', () => {
    gsap.to(imageEl, { scale: 1.07, duration: 0.6, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(imageEl, { scale: 1, duration: 0.6, ease: 'power2.out' });
  });
};

/**
 * Page enter transition
 */
export const pageEnter = (el) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );
};

/**
 * Stagger list items on mount
 */
export const staggerItems = (parent, selector = 'li, article, .stagger-item') => {
  if (!parent) return;
  const items = parent.querySelectorAll(selector);
  gsap.fromTo(
    items,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
  );
};

/**
 * Staggered reveal for multiple items
 */
export const staggerReveal = (elements, options = {}) => {
  if (!elements) return;
  const targets = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
  
  gsap.fromTo(
    targets,
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: targets[0]?.parentElement || targets[0],
        start: 'top 85%',
        ...options,
      }
    }
  );
};

/**
 * Cart item add bounce
 */
export const cartBounce = (el) => {
  if (!el) return;
  gsap.fromTo(
    el,
    { scale: 1 },
    { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }
  );
};

/**
 * Magnetic button effect
 */
export const magneticButton = (el, strength = 0.5) => {
  if (!el) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  });
};

/**
 * Parallax effect for backgrounds
 */
export const parallaxBackground = (el, amount = 100) => {
  if (!el) return;
  gsap.fromTo(el,
    { y: -amount/2 },
    {
      y: amount/2,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
};

/**
 * Route Transition In
 */
export const routeTransitionIn = (overlayEl) => {
  if (!overlayEl) return;
  return gsap.to(overlayEl, {
    scaleY: 0,
    duration: 0.8,
    ease: 'power4.inOut',
    transformOrigin: 'top',
  });
};

/**
 * Route Transition Out
 */
export const routeTransitionOut = (overlayEl) => {
  if (!overlayEl) return;
  gsap.set(overlayEl, { scaleY: 0, transformOrigin: 'bottom' });
  return gsap.to(overlayEl, {
    scaleY: 1,
    duration: 0.8,
    ease: 'power4.inOut',
  });
};

/**
 * Toast feedback for optimistic UI
 */
export const toastFeedback = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl glass-dark border-brand/20 shadow-premium pointer-events-none flex items-center gap-3`;
  
  const icon = type === 'success' ? '✓' : '!';

  // Security Fix: Use document.createElement and textContent instead of innerHTML
  // to prevent XSS vulnerabilities if dynamic user input is passed as a message.
  const iconSpan = document.createElement('span');
  iconSpan.className = 'w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-black';
  iconSpan.textContent = icon;

  const messageSpan = document.createElement('span');
  messageSpan.className = 'text-white text-xs font-bold uppercase tracking-widest';
  messageSpan.textContent = message;

  toast.appendChild(iconSpan);
  toast.appendChild(messageSpan);
  
  document.body.appendChild(toast);
  
  gsap.fromTo(toast, 
    { y: 50, opacity: 0, scale: 0.9 }, 
    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
  );
  
  gsap.to(toast, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    delay: 2,
    ease: 'power2.in',
    onComplete: () => toast.remove()
  });
};

/**
 * Modal Entrance
 */
export const modalEntrance = (modalEl, overlayEl) => {
  if (!modalEl || !overlayEl) return;
  
  const tl = gsap.timeline();
  tl.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    .fromTo(modalEl, 
      { scale: 0.9, opacity: 0, y: 20, rotateX: -10 }, 
      { scale: 1, opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power4.out', transformPerspective: 1000 },
      '-=0.2'
    );
};

/**
 * 3D Tilt effect
 */
export const tiltEffect = (el, intensity = 15) => {
  if (!el) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -intensity;
    const rotateY = (x - centerX) / centerX * intensity;
    
    gsap.to(el, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
  });
};

export { gsap, ScrollTrigger };
