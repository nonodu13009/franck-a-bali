'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const cursorPosRef = useRef({ x: 0, y: 0 });

  // Fonction pour vérifier si un élément est interactif
  const isInteractiveElement = useCallback((element: Element | null): boolean => {
    if (!element) return false;

    const tagName = element.tagName.toLowerCase();
    const interactiveTags = ['a', 'button', 'input', 'textarea', 'select', 'label'];
    
    if (interactiveTags.includes(tagName)) return true;
    
    if (element.hasAttribute('onclick') || 
        element.hasAttribute('data-clickable') ||
        element.getAttribute('role') === 'button') {
      return true;
    }

    const style = window.getComputedStyle(element);
    if (style.cursor === 'pointer') return true;

    if (element.closest('a, button, [onclick], [role="button"]')) {
      return true;
    }

    return false;
  }, []);

  // Animation fluide du cercle qui suit le point
  const animate = useCallback(() => {
    const dx = mousePosition.x - cursorPosRef.current.x;
    const dy = mousePosition.y - cursorPosRef.current.y;
    
    // Lerp (linear interpolation) pour un mouvement fluide
    cursorPosRef.current.x += dx * 0.15;
    cursorPosRef.current.y += dy * 0.15;
    
    setCursorPosition({
      x: cursorPosRef.current.x,
      y: cursorPosRef.current.y,
    });
    
    requestRef.current = requestAnimationFrame(animate);
  }, [mousePosition]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Vérifier si la souris survole un élément interactif
      const target = e.target as Element;
      setIsHovering(isInteractiveElement(target));
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isInteractiveElement]);

  // Ne pas afficher sur mobile/tablette
  useEffect(() => {
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (isTouchDevice()) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Point noir qui suit directement la souris */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: isHovering ? 'translate(-50%, -50%) scale(0)' : 'translate(-50%, -50%) scale(1)',
        }}
      />
      
      {/* Cercle qui suit le point avec un délai */}
      <div
        className={`custom-cursor-circle ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
    </>
  );
}

