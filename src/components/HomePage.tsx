import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDrag } from 'react-dnd';

export default function HomePage() {
  const introRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const projectsSectionRef = useRef<HTMLElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );
    gsap.fromTo(
      heroTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.6 }
    );

    projectRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    gsap.fromTo(
      projectsSectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const projects = [
    { title: 'Project One', description: 'Urban living spaces that adapt to modern lifestyles.', image: '/img1.jpg' },
    { title: 'Project Two', description: 'Sustainable design in contemporary architecture.', image: '/img2.jpg' },
    { title: 'Project Three', description: 'Cultural hubs for vibrant communities.', image: '/img3.jpg' },
  ];

  // Draggable image component
  const DraggableImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'image',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    // GSAP floating effect when the image is dragged
    useEffect(() => {
      if (isDragging) {
        gsap.to(`#image-${index}`, { y: 10, repeat: -1, yoyo: true, duration: 1 });
      } else {
        gsap.to(`#image-${index}`, { y: 0, repeat: 0 });
      }
    }, [isDragging, index]);

    return (
      <img
        ref={drag as any} // Use the 'drag' as the ref here, cast to 'any' to bypass type conflict
        id={`image-${index}`}
        src={src}
        alt={alt}
        className="w-64 h-64 object-cover rounded-lg cursor-move"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      />
    );
  };

  return (
    <div className="relative w-full h-auto bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-black bg-opacity-50 backdrop-blur-lg px-6 py-4 flex justify-between items-center text-white shadow-md">
        <div className="text-xl font-bold">Powerhouse</div>
        <ul className="flex gap-6">
          <li><a href="#hero" className="hover:underline">Home</a></li>
          <li><a href="#projects" className="hover:underline">Projects</a></li>
        </ul>
      </nav>

      {/* 3D Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* Hero Section */}
      <div id="hero" className="relative z-10 flex flex-col items-center justify-center h-screen text-center p-6">
        <h1 ref={introRef} className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Powerhouse Company
        </h1>
        <p ref={heroTextRef} className="text-lg md:text-2xl max-w-2xl">
          Architecture, urbanism & innovation — designed for future-forward living.
        </p>
      </div>

      {/* Projects Section */}
      <section id="projects" ref={projectsSectionRef} className="relative z-10 py-20 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">Our Projects</h2>
        <div className="flex justify-center gap-8">
          {projects.map((project, idx) => (
            <DraggableImage key={idx} src={project.image} alt={project.title} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
