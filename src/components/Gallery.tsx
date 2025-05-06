import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './Gallery.css';

gsap.registerPlugin(Draggable);


const Gallery = () => {
    const galleryContainerRef = useRef<HTMLDivElement>(null);
    const dragInstance = useRef<Draggable | null>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [scale, setScale] = useState(1);
    const pos = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const animationFrame = useRef<number | null>(null);
    const images = [
        { id: 1, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 2, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 3, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 4, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 5, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 6, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 7, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 8, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9 },
        { id: 9, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 10, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 11, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 12, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 13, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 14, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 15, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 16, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 17, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 18, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 19, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 20, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 21, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 22, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
        { id: 23, className: "gallery-image", url: '/img1.jpg', aspectRatio: 16/9  },
        { id: 24, className: "gallery-image", url: '/img2.jpg', aspectRatio: 16/9  },
    ];

    // Initialize ref array length
    const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
        if (el) imageRefs.current[index] = el;
    };

    useEffect(() => {
        // Fade-in animation
        gsap.to(imageRefs.current, {
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.inOut"
        });

        // Physics-based smooth dragging
        const applyInertia = () => {
            if (!galleryContainerRef.current) return;
            
            const now = performance.now();
            const delta = (now - lastTime.current) / 1000;
            lastTime.current = now;

            // Apply friction
            velocity.current.x *= Math.pow(0.5, delta);
            velocity.current.y *= Math.pow(0.5, delta);

            // Stop when velocity is very small
            if (Math.abs(velocity.current.x) < 0.1 && Math.abs(velocity.current.y) < 0.1) {
                velocity.current.x = 0;
                velocity.current.y = 0;
                return;
            }

            // Update position
            pos.current.x += velocity.current.x * delta * 1000;
            pos.current.y += velocity.current.y * delta * 1000;

            // Apply movement
            gsap.set(galleryContainerRef.current, {
                x: pos.current.x,
                y: pos.current.y
            });

            animationFrame.current = requestAnimationFrame(applyInertia);
        };

        const handleDragStart = () => {
            cancelAnimationFrame(animationFrame.current!);
            velocity.current = { x: 0, y: 0 };
        };

        const handleDragMove = (e: any) => {
            if (!e) return;
            
            const now = performance.now();
            const delta = now - lastTime.current;
            lastTime.current = now;

            if (delta > 0 && delta < 100) {
                velocity.current = {
                    x: e.deltaX / (delta / 1000),
                    y: e.deltaY / (delta / 1000)
                };
            }

            pos.current.x += e.deltaX;
            pos.current.y += e.deltaY;
        };

        const handleDragEnd = () => {
            lastTime.current = performance.now();
            animationFrame.current = requestAnimationFrame(applyInertia);
        };

        if (galleryContainerRef.current) {
            dragInstance.current = Draggable.create(galleryContainerRef.current, {
                type: "x,y",
                bounds: window,
                edgeResistance: 0.8,
                inertia: false, // We're handling inertia manually
                onDragStart: handleDragStart,
                onDrag: handleDragMove,
                onThrowComplete: handleDragEnd,
                minimumMovement: 5,
                dragResistance: 0.05 // Very light resistance
            })[0];
        }

        // Handle wheel zoom
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = -e.deltaY * 0.001;
            const newScale = Math.min(Math.max(0.5, scale * (1 + delta)), 3);
            
            setScale(newScale);
            if (galleryContainerRef.current) {
                gsap.to(galleryContainerRef.current, {
                    scale: newScale,
                    duration: 0.3,
                    ease: "power1.out",
                    onUpdate: () => {
                        if (dragInstance.current) {
                            dragInstance.current.update();
                        }
                    }
                });
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            if (dragInstance.current) dragInstance.current.kill();
            window.removeEventListener('wheel', handleWheel);
            cancelAnimationFrame(animationFrame.current!);
        };
    }, [scale]);

    return (
        <div className="gallery-container" ref={galleryContainerRef}>
            <div className="gallery">
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        ref={setImageRef(index)}
                        className="gallery-image"
                        style={{ 
                            backgroundImage: `url(${img.url})`,
                            aspectRatio: img.aspectRatio,
                            opacity: 0
                        }}
                    />
                ))}
            </div>
            <div className="zoom-indicator">Zoom: {(scale * 100).toFixed(0)}%</div>
        </div>
    );
};

export default Gallery;