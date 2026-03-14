import { useEffect, useRef } from "react";
import "./FirstCommitSlide.css";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const particles = [];
    const particleCount = 150; // Increased for density

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Depth simulation
        this.z = Math.random() * 1 + 0.1;
        this.size = this.z * 2.5;
        this.speedX = (Math.random() - 0.5) * (this.z * 0.8);
        this.speedY = (Math.random() - 0.5) * (this.z * 0.8);
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.7 + 0.3; // Much brighter
        this.fadeSpeed = 0.005;
        this.isFadingIn = true;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        if (this.isFadingIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) this.isFadingIn = false;
        } else {
          // Slow pulse
          this.opacity += Math.sin(Date.now() * 0.002 * this.z) * 0.008;
        }
      }

      draw() {
        // More vibrant colors
        const color = this.z > 0.8 ? "#ffffff" : this.z > 0.5 ? "#7dd3fc" : "#0369a1";
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0.1, this.opacity); // Minimum visibility
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.z > 0.6) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#38bdf8";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }


    const createFlare = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const flare = { r: 0, opacity: 0 };

      gsap.to(flare, {
        r: 300,
        opacity: 0.1,
        duration: 4,
        ease: "power1.out",
        onUpdate: () => {
          ctx.save();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, flare.r);
          gradient.addColorStop(0, `rgba(56, 189, 248, ${flare.opacity})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        },
        onComplete: createFlare
      });
    };

    // Start flares
    setTimeout(createFlare, 2000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
};

export default function FirstCommitSlide({ onNavigateEmail }) {
  return (
    <div className="slide">
      <div className="background-container">
        <div className="nebula" />
        <div className="glow-overlay" />
        <ParticleBackground />
      </div>

      <div className="content-wrapper">
        <img src="/commit.png" alt="Commit Logo" className="commit-logo" />

        <div className="text-container">
          <h1 className="starting-soon">CLOSING <br /> CEREMONY</h1>
        </div>

        <div className="logos">
          <img src="/logo2.png" alt="Sasnaka Sansada" className="logo small" />
          <img
            src="/logo1.png"
            alt="First Commit"
            className="logo small2 clickable"
            onClick={onNavigateEmail}
            title="Go to Email Portal"
          />
        </div>
      </div>
    </div>
  );
}
