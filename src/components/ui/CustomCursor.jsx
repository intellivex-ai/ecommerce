import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const mainCursor = useRef(null);
    const [cursorType, setCursorType] = useState('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            if (mainCursor.current) {
                mainCursor.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
            if (!isVisible) setIsVisible(true);
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        const onMouseDown = () => setCursorType('click');
        const onMouseUp = () => setCursorType('default');

        const handleHover = (type) => (e) => {
            if (e.target.closest('a, button, .interactive')) {
                setCursorType(type || 'hover');
            } else {
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        
        // Use event delegation for hover states
        const mouseOver = (e) => {
            const target = e.target.closest('a, button, .interactive');
            if (target) {
                if (target.classList.contains('product-card')) {
                    setCursorType('view');
                } else {
                    setCursorType('hover');
                }
            } else {
                setCursorType('default');
            }
        };
        window.addEventListener('mouseover', mouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', mouseOver);
        };
    }, [isVisible]);

    if (typeof window === 'undefined') return null;

    return (
        <div 
            ref={mainCursor}
            className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center
                ${isVisible ? 'opacity-100' : 'opacity-0'}
                ${cursorType === 'hover' ? 'scale-[2.5] bg-white' : ''}
                ${cursorType === 'click' ? 'scale-75 bg-brand' : ''}
                ${cursorType === 'view' ? 'scale-[3] bg-brand text-white' : 'bg-white'}
                -translate-x-1/2 -translate-y-1/2`}
        >
            {cursorType === 'view' && (
                <span className="text-[4px] font-black uppercase tracking-tighter">View</span>
            )}
            <div className={`w-1 h-1 bg-brand rounded-full transition-opacity duration-300 ${cursorType !== 'default' ? 'opacity-0' : 'opacity-100'}`} />
        </div>
    );
};

export default CustomCursor;
