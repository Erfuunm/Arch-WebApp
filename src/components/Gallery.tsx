import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './Gallery.css';

// Register Draggable plugin
gsap.registerPlugin(Draggable);

const Gallery = () => {
    const galleryContainerRef = useRef<HTMLDivElement>(null);
    const dragInstance = useRef<Draggable | null>(null);
    const imageElements = useRef<HTMLDivElement[]>([]);

    const images = [
        { id: 1, className: "gallery-image", url: '/img1.jpg' },
        { id: 2, className: "gallery-image", url: '/img2.jpg' },
        { id: 3, className: "gallery-image", url: '/img1.jpg' },
        { id: 4, className: "gallery-image", url: '/img2.jpg' },
        { id: 5, className: "gallery-image", url: '/img1.jpg' },
        { id: 6, className: "gallery-image", url: '/img2.jpg' },
        { id: 7, className: "gallery-image", url: '/img1.jpg' },
        { id: 8, className: "gallery-image", url: '/img2.jpg' },
        { id: 9, className: "gallery-image", url: '/img1.jpg' },
        { id: 10, className: "gallery-image", url: '/img2.jpg' },
        { id: 11, className: "gallery-image", url: '/img1.jpg' },
        { id: 12, className: "gallery-image", url: '/img2.jpg' },
        { id: 13, className: "gallery-image", url: '/img1.jpg' },
        { id: 14, className: "gallery-image", url: '/img2.jpg' },
        { id: 15, className: "gallery-image", url: '/img1.jpg' },
        { id: 16, className: "gallery-image", url: '/img2.jpg' },
        { id: 17, className: "gallery-image", url: '/img1.jpg' },
        { id: 18, className: "gallery-image", url: '/img2.jpg' },
        { id: 19, className: "gallery-image", url: '/img1.jpg' },
        { id: 20, className: "gallery-image", url: '/img2.jpg' },
        { id: 21, className: "gallery-image", url: '/img1.jpg' },
        { id: 22, className: "gallery-image", url: '/img2.jpg' },
        { id: 23, className: "gallery-image", url: '/img1.jpg' },
        { id: 24, className: "gallery-image", url: '/img2.jpg' },
    ];

    // Initialize ref array length
    const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
        if (el) {
            imageElements.current[index] = el;
        }
    };


    useEffect(() => {
        // Fade-in animation (1 second duration)
        gsap.from(imageElements.current, {
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.inOut"
        });

        // Initialize Draggable
        if (galleryContainerRef.current) {
            dragInstance.current = Draggable.create(galleryContainerRef.current, {
                type: "x,y",
                bounds: window,
                edgeResistance: 0.7,
                throwResistance: 3000,
                minimumMovement: 10,
                dragResistance: 0.5, 
                onDrag: function() {
                    gsap.to(this.target, {
                        duration: 0.3,        // Smooth movement during drag
                        ease: "power1.out"    // Gentle easing
                    });
                },
                onThrowUpdate: function() {
                    gsap.to(this.target, {
                        duration: 1.5,        // Longer throw duration
                        ease: "power3.out"    // Smoother deceleration
                    });
                }
            })[0];
        }

        return () => {
            if (dragInstance.current) {
                dragInstance.current.kill();
            }
        };
    }, []);

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
                            opacity: 1
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;