"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollController() {
  const { camera } = useThree();
  
  // Track camera path points using refs to animate with GSAP
  const camPath = useRef({
    x: 0,
    y: 0,
    z: 9.5,
    lookX: 0,
    lookY: 0.5,
    lookZ: 0,
  });

  useEffect(() => {
    // Select all page section boundaries
    const sections = gsap.utils.toArray("section");
    if (!sections || sections.length === 0) return;

    // Create a master GSAP ScrollTrigger timeline to interpolate camera variables
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Smooth follow scrub
        invalidateOnRefresh: true,
      },
    });

    // We animate from Hero -> About -> Skills -> Projects -> Contact
    // Section 1: About (cam goes to right, looks left)
    tl.to(camPath.current, {
      x: 5.5,
      y: 2.0,
      z: 5.0,
      lookX: -1.0,
      lookY: 0.0,
      lookZ: -1.0,
      duration: 1,
      ease: "power2.inOut",
    })
    // Section 2: Skills (cam goes to top-left, looks down-right)
    .to(camPath.current, {
      x: -4.5,
      y: 4.5,
      z: 6.0,
      lookX: 1.0,
      lookY: 0.0,
      lookZ: -1.0,
      duration: 1,
      ease: "power2.inOut",
    })
    // Section 3: Projects (cam goes deep below, pulls out, looks up)
    .to(camPath.current, {
      x: 0.0,
      y: -4.5,
      z: 11.0,
      lookX: 0.0,
      lookY: 0.5,
      lookZ: 0.0,
      duration: 1,
      ease: "power2.inOut",
    })
    // Section 4: Contact (dives directly into the Singularity Event Horizon)
    .to(camPath.current, {
      x: 0.0,
      y: 0.5,
      z: 2.4, // Near event horizon (1.1 radius)
      lookX: 0.0,
      lookY: 0.5,
      lookZ: 0.0,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Smooth lerping and mouse parallax on every frame
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 10));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((state) => {
    const mouse = state.pointer; // ranges from -1 to 1

    // 1. Calculate mouse parallax delta
    // More intense parallax when far, subtle when close (near event horizon)
    const parallaxIntensity = THREE.MathUtils.lerp(0.8, 0.15, 1.0 - (camPath.current.z - 2.4) / 7.1);
    const targetX = camPath.current.x + mouse.x * parallaxIntensity;
    const targetY = camPath.current.y + mouse.y * parallaxIntensity;
    const targetZ = camPath.current.z;

    // 2. Smoothly interpolate (lerp) camera position
    currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, targetX, 0.05);
    currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, targetY, 0.05);
    currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, targetZ, 0.05);
    camera.position.copy(currentCamPos.current);

    // 3. Smoothly interpolate lookAt coordinates
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, camPath.current.lookX, 0.05);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, camPath.current.lookY, 0.05);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, camPath.current.lookZ, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
