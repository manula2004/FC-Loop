import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
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
    const particleCount = 150;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1 + 0.1;
        this.size = this.z * 2.5;
        this.speedX = (Math.random() - 0.5) * (this.z * 0.8);
        this.speedY = (Math.random() - 0.5) * (this.z * 0.8);
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.7 + 0.3;
        this.fadeSpeed = 0.005;
        this.isFadingIn = true;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        if (this.isFadingIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) this.isFadingIn = false;
        } else {
          this.opacity += Math.sin(Date.now() * 0.002 * this.z) * 0.008;
        }
      }

      draw() {
        const color = this.z > 0.8 ? "#ffffff" : this.z > 0.5 ? "#7dd3fc" : "#0369a1";
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0.1, this.opacity);
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

    // GSAP Background Flare Logic
    const createFlare = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const flare = { r: 0, opacity: 0 };
      
      gsap.to(flare, {
        r: 300,
        opacity: 0.15,
        duration: 5,
        ease: "power1.out",
        onUpdate: () => {
          ctx.save();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, flare.r);
          gradient.addColorStop(0, `rgba(14, 165, 233, ${flare.opacity})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        },
        onComplete: createFlare
      });
    };
    
    setTimeout(createFlare, 1000);

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

export default function EmailPortalSlide() {
  const [status, setStatus] = useState("idle"); // idle, animating, sent
  const [currentJargon, setCurrentJargon] = useState("");
  const portalRef = useRef(null);
  const ringsRef = useRef([]);
  const buttonRef = useRef(null);
  const jargonRef = useRef(null);

  const jargonWords = [
    "INITIALIZING DATA STREAM...",
    "CONFIGURING NEURAL UPLINK...",
    "ENCRYPTING PACKET HEADERS...",
    "SYNCHRONIZING PORTAL VECTORS...",
    "ESTABLISHING SECURE RELAY..."
  ];

  const handleSendEmails = () => {
    setStatus("animating");
    
    const tl = gsap.timeline({
      onComplete: () => setStatus("sent")
    });

    // Hide button
    tl.to(buttonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.7)"
    });

    // Show initial jargon
    tl.set(jargonRef.current, { opacity: 1 });

    // Animate rings (slower and more rotations)
    tl.to(ringsRef.current, {
      scale: (i) => 2.5 + i * 0.7,
      opacity: 1,
      duration: 3,
      stagger: 0.2,
      ease: "power2.out",
      rotation: (i) => i % 2 === 0 ? 720 : -720,
    }, "-=0.2");

    // Cycle through jargon
    jargonWords.forEach((word, i) => {
      tl.to({}, {
        duration: 0.6,
        onStart: () => setCurrentJargon(word),
      }, i === 0 ? "-=2.5" : ">");
    });

    // Portal flash (timed with last jargon)
    tl.to(portalRef.current, {
      scale: 8,
      opacity: 1,
      duration: 1.2,
      ease: "power4.in"
    }, ">-0.5");

    // Fade out portal and jargon
    tl.to([portalRef.current, jargonRef.current], {
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });
  };

  return (
    <div className="slide email-portal-slide">
      <div className="background-container">
        <div className="nebula" />
        <div className="glow-overlay" />
        <ParticleBackground />
      </div>

      <div className="portal-container" ref={portalRef}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`portal-ring ring-${i}`} 
            ref={el => ringsRef.current[i] = el}
          />
        ))}
        <div className="portal-core" />
      </div>

      <div className="content-wrapper">
        <div className="jargon-text" ref={jargonRef}>{currentJargon}</div>

        {status === "idle" && (
          <button 
            ref={buttonRef}
            className="send-emails-btn"
            onClick={handleSendEmails}
          >
            SEND EMAILS
          </button>
        )}

        {status === "sent" && (
          <h2 className="emails-sent-text">EMAILS SENT</h2>
        )}
      </div>
    </div>
  );
}
