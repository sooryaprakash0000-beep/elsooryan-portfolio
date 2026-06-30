"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IntroSequenceProps {
  onFinish: () => void;
}

type IntroStage = "intro" | "energy" | "video" | "flash" | "assemble" | "reveal";

interface IntroParticle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  speed: number;
  delay: number;
}

export default function IntroSequence({ onFinish }: IntroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<IntroStage>("intro");
  const hasStartedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<IntroParticle[]>([]);
  const playRequestedRef = useRef(false);
  const shouldRetryPlayRef = useRef(false);

  const [stage, setStage] = useState<IntroStage>("intro");
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [shakeContainer, setShakeContainer] = useState(false);
  const [equalizerBars, setEqualizerBars] = useState<number[]>(Array.from({ length: 15 }, () => 2));

  const setStageValue = (nextStage: IntroStage) => {
    stageRef.current = nextStage;
    setStage(nextStage);
  };

  const clearTimers = () => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  };

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timerId = window.setTimeout(() => {
      callback();
      timersRef.current = timersRef.current.filter((id) => id !== timerId);
    }, delay);
    timersRef.current.push(timerId);
    return timerId;
  };

  const buildTextParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offscreenContext = offscreen.getContext("2d");
    if (!offscreenContext) return;

    let fontSize = Math.min(width * 0.14, 170);
    offscreenContext.font = `900 ${fontSize}px var(--font-syne), sans-serif`;

    while (offscreenContext.measureText("ELSOORYAN").width > width * 0.9) {
      fontSize -= 2;
      offscreenContext.font = `900 ${fontSize}px var(--font-syne), sans-serif`;
    }

    offscreenContext.fillStyle = "#ffffff";
    offscreenContext.textAlign = "center";
    offscreenContext.textBaseline = "middle";
    offscreenContext.fillText("ELSOORYAN", width / 2, height * 0.42);

    const imageData = offscreenContext.getImageData(0, 0, width, height);
    const data = imageData.data;
    const nextParticles: IntroParticle[] = [];

    const sampleRate = width > 1600 ? 5 : width > 1000 ? 6 : width > 768 ? 7 : 8;
    for (let y = 0; y < height; y += sampleRate) {
      for (let x = 0; x < width; x += sampleRate) {
        const index = (y * width + x) * 4;
        if (data[index + 3] > 128) {
          const side = Math.floor(Math.random() * 4);
          let px = 0;
          let py = 0;
          if (side === 0) {
            px = Math.random() * width;
            py = -20;
          } else if (side === 1) {
            px = width + 20;
            py = Math.random() * height;
          } else if (side === 2) {
            px = Math.random() * width;
            py = height + 20;
          } else {
            px = -20;
            py = Math.random() * height;
          }

          nextParticles.push({
            x: px,
            y: py,
            tx: x,
            ty: y,
            vx: 0,
            vy: 0,
            size: 1.05 + Math.random() * 2.1,
            alpha: 0,
            color: Math.random() > 0.6 ? "#7B2EFF" : Math.random() > 0.4 ? "#d946ef" : "#ffffff",
            speed: 0.018 + Math.random() * 0.028,
            delay: Math.random() * 30,
          });
        }
      }
    }

    particlesRef.current = nextParticles;
  };

  const triggerClimaxExplosion = () => {
    if (stageRef.current !== "video") return;

    clearTimers();
    setStageValue("flash");
    setShakeContainer(true);

    const canvas = canvasRef.current;
    if (canvas) {
      particlesRef.current = [];
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const burstCount = canvas.width > 1400 ? 78 : 64;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.9 + Math.random() * 4.4;
        particlesRef.current.push({
          x: cx,
          y: cy,
          tx: cx + Math.cos(angle) * (canvas.width * 1.4),
          ty: cy + Math.sin(angle) * (canvas.height * 1.4),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.8 + Math.random() * 4.6,
          alpha: 1,
          color: Math.random() > 0.4 ? "#7B2EFF" : Math.random() > 0.5 ? "#d946ef" : "#60a5fa",
          speed,
          delay: 0,
        });
      }
    }

    scheduleTimeout(() => {
      setShakeContainer(false);
      setStageValue("assemble");
      buildTextParticles();
    }, 420);

    scheduleTimeout(() => {
      setStageValue("reveal");
      setShowSubtitles(true);
      scheduleTimeout(() => {
        onFinish();
      }, 2000);
    }, 3200);
  };

  const attemptVideoPlayback = async () => {
    const video = videoRef.current;
    if (!video || stageRef.current !== "video" || playRequestedRef.current) return;

    if (video.readyState < 2) {
      shouldRetryPlayRef.current = true;
      return;
    }

    playRequestedRef.current = true;
    shouldRetryPlayRef.current = false;

    try {
      video.currentTime = 0;
      video.volume = 1;
      await video.play();
    } catch {
      playRequestedRef.current = false;
      if (stageRef.current === "video") {
        shouldRetryPlayRef.current = true;
      }
    }
  };

  const handleVideoReady = () => {
    if (stageRef.current !== "video") return;
    void attemptVideoPlayback();
  };

  const handleVideoCanPlay = () => {
    if (stageRef.current !== "video") return;
    if (shouldRetryPlayRef.current) {
      shouldRetryPlayRef.current = false;
      void attemptVideoPlayback();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    if (videoRef.current.currentTime >= 4.8 && stageRef.current === "video") {
      triggerClimaxExplosion();
    }
  };

  const handleVideoEnded = () => {
    if (stageRef.current === "video") {
      triggerClimaxExplosion();
    }
  };

  const startIntroSequence = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    clearTimers();
    setShowSubtitles(false);
    setShakeContainer(false);
    playRequestedRef.current = false;
    shouldRetryPlayRef.current = false;
    setStageValue("energy");

    scheduleTimeout(() => {
      setStageValue("video");
      void attemptVideoPlayback();
    }, 1000);
  };

  useEffect(() => {
    buildTextParticles();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (stageRef.current === "intro" || stageRef.current === "assemble" || stageRef.current === "reveal") {
        buildTextParticles();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const dustCount = window.innerWidth < 768 ? 48 : 64;
    const dustParticles: Array<{ x: number; y: number; s: number; alpha: number; speed: number; angle: number }> = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: 0.9 + Math.random() * 2.1,
        alpha: 0.08 + Math.random() * 0.35,
        speed: 0.08 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let lastTimestamp = 0;
    const render = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.032);
      lastTimestamp = timestamp;
      time += delta;
      const currentStage = stageRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (currentStage === "intro" || currentStage === "energy" || currentStage === "video") {
        for (let i = 0; i < dustParticles.length; i++) {
          const dust = dustParticles[i];
          dust.y -= dust.speed * 60 * delta;
          dust.x += Math.sin(time * 0.008 + dust.angle) * 0.08 * (delta * 60);
          if (dust.y < -10) dust.y = canvas.height + 10;

          context.beginPath();
          context.arc(dust.x, dust.y, dust.s, 0, Math.PI * 2);
          context.fillStyle = `rgba(123, 70, 255, ${dust.alpha})`;
          context.shadowBlur = 4;
          context.shadowColor = "#7B2EFF";
          context.fill();
        }
      }

      if (currentStage === "energy") {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = 180 - Math.min(150, time * 0.6);

        context.save();
        context.translate(cx, cy);
        context.rotate(time * 0.03);

        for (let i = 0; i < 32; i++) {
          const angle = (i / 32) * Math.PI * 2;
          const px = Math.cos(angle) * (radius + Math.sin(time * 0.1 + i) * 12);
          const py = Math.sin(angle) * (radius + Math.sin(time * 0.1 + i) * 12);

          context.beginPath();
          context.arc(px, py, 1.8 + Math.sin(time * 0.02 + i) * 1.2, 0, Math.PI * 2);
          context.fillStyle = i % 2 === 0 ? "#7B2EFF" : "#60a5fa";
          context.shadowBlur = 6;
          context.shadowColor = "#7B2EFF";
          context.fill();
        }
        context.restore();
      }

      if (currentStage === "flash") {
        for (let i = 0; i < particlesRef.current.length; i++) {
          const particle = particlesRef.current[i];
          particle.x += particle.vx * (delta * 60);
          particle.y += particle.vy * (delta * 60);
          particle.size *= 1.008 + delta * 0.02;

          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fillStyle = particle.color;
          context.shadowBlur = 8;
          context.shadowColor = particle.color;
          context.fill();
        }
      }

      if (currentStage === "intro" || currentStage === "assemble" || currentStage === "reveal") {
        for (let i = 0; i < particlesRef.current.length; i++) {
          const particle = particlesRef.current[i];
          if (particle.delay > 0) {
            particle.delay -= 1;
            continue;
          }

          if (particle.alpha < 1) particle.alpha += 0.02;

          const dx = particle.tx - particle.x;
          const dy = particle.ty - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0.5) {
            const easing = currentStage === "reveal" ? 0.12 : 0.1;
            particle.vx = particle.vx * 0.88 + dx * particle.speed * easing * (delta * 60);
            particle.vy = particle.vy * 0.88 + dy * particle.speed * easing * (delta * 60);

            if (distance > 40) {
              particle.vx += Math.sin(time * 0.025 + i) * 0.65;
              particle.vy += Math.cos(time * 0.025 + i) * 0.65;
            }

            particle.x += particle.vx * (delta * 60);
            particle.y += particle.vy * (delta * 60);
          } else {
            particle.x = particle.tx;
            particle.y = particle.ty;
          }

          context.save();
          context.globalAlpha = particle.alpha;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fillStyle = particle.color;
          if (currentStage === "reveal") {
            context.shadowBlur = 3;
            context.shadowColor = particle.color;
          }
          context.fill();
          context.restore();
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    animationFrameRef.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (stage === "assemble" || stage === "reveal") {
        setEqualizerBars(Array.from({ length: 15 }, () => 1));
      } else {
        setEqualizerBars(Array.from({ length: 15 }, () => Math.floor(Math.random() * 16) + 4));
      }
    }, 150);

    return () => window.clearInterval(interval);
  }, [stage]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black text-center select-none transition-all duration-1000 will-change-transform ${
        shakeContainer ? "animate-shake" : ""
      }`}
      onClick={stage === "intro" ? startIntroSequence : undefined}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className={`pointer-events-none absolute inset-0 z-50 transition-all duration-500 ${stage === "flash" ? "bg-white/80 opacity-100" : "bg-transparent opacity-0"}`} />
      <div className={`pointer-events-none absolute inset-0 transition-all duration-700 ${stage === "flash" ? "chromatic-aberration scale-115 blur-[2px]" : ""}`} />

      <AnimatePresence>
        {(stage === "intro" || stage === "energy" || stage === "video") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.35, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute bottom-16 flex h-16 items-end gap-1.5"
          >
            {equalizerBars.map((height, index) => (
              <div
                key={index}
                className="w-1 rounded-full bg-brand-purple/70 shadow-[0_0_8px_#7B2EFF]"
                style={{
                  height: `${height * 3}px`,
                  transition: "height 0.1s ease-in-out",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "video" && (
        <motion.div
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10 overflow-hidden bg-black"
        >
          <video
            ref={videoRef}
            src="/hollow-purple.mp4"
            playsInline
            preload="auto"
            autoPlay={false}
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoCanPlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      )}

      <AnimatePresence>
        {stage === "intro" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7 }}
            className="relative z-30 flex flex-col items-center justify-center px-6 sm:px-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-syne text-[clamp(3rem,10vw,6.5rem)] font-black uppercase tracking-[0.3em] text-white drop-shadow-[0_0_24px_rgba(123,46,255,0.7)]"
            >
              ELSOORYAN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }}
              transition={{ duration: 1.2, delay: 0.25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mt-4 font-orbitron text-[10px] uppercase tracking-[0.35em] text-brand-purple sm:text-xs"
            >
              CLICK ANYWHERE TO ENTER
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-30 mt-20 flex flex-col items-center justify-center px-6 text-center sm:px-10">
        <AnimatePresence>
          {showSubtitles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 flex flex-col items-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-orbitron text-xs uppercase tracking-[0.4em] text-brand-purple"
              >
                DEVELOPER
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-2 font-syne text-2xl font-black uppercase tracking-[0.25em] text-white text-energy-gradient animate-pulse sm:text-3xl"
              >
                DEVELOPER
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-1.5 font-orbitron text-[11px] uppercase tracking-[0.3em] text-zinc-400"
              >
                WEB DEVELOPER
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-1 font-orbitron text-[10px] uppercase tracking-[0.5em] text-brand-cyan"
              >
                CREATIVE CODER
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
