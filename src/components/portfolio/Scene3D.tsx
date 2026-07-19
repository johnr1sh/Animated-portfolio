"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, TorusKnot } from "@react-three/drei";
import * as THREE from "three";
import { useGsapPlugins } from "@/lib/gsap";

/**
 * Continuously animating Three.js scene sitting fixed behind the whole page.
 * Shape count and geometry detail scale down under 768px. Skipped entirely
 * for prefers-reduced-motion. Reacts to scroll AND keeps spinning on its own.
 */
function Shapes({ mobile }: { mobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { gsap, ScrollTrigger } = useGsapPlugins();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (!groupRef.current) return;
        gsap.to(groupRef.current.rotation, {
          y: self.progress * Math.PI * 1.4,
          x: self.progress * 0.5,
          duration: 0.6,
          overwrite: "auto",
        });
        gsap.to(groupRef.current.position, {
          y: 2 - self.progress * 4,
          duration: 0.6,
          overwrite: "auto",
        });
      },
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      st.kill();
    };
  }, [gsap, ScrollTrigger]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * (0.08 + i * 0.02);
      child.rotation.y += delta * (0.1 + i * 0.015);
    });
    groupRef.current.rotation.z +=
      (mouse.current.x * 0.15 - groupRef.current.rotation.z) * 0.02;
  });

  const color = "#c2a4ff";

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[1.1, 0]} position={[-4.2, 1.4, -2]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
        </Icosahedron>
      </Float>

      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1.6}>
        <TorusKnot args={[0.75, 0.22, mobile ? 48 : 96, 12]} position={[4.4, -1.2, -3]}>
          <meshBasicMaterial color="#ff8a4c" wireframe transparent opacity={0.4} />
        </TorusKnot>
      </Float>

      {!mobile && (
        <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.1}>
          <Octahedron args={[0.9, 0]} position={[0.6, 3.4, -4]}>
            <meshBasicMaterial color="#4de8c2" wireframe transparent opacity={0.35} />
          </Octahedron>
        </Float>
      )}

      {!mobile && (
        <Float speed={0.9} rotationIntensity={0.4} floatIntensity={1.4}>
          <Icosahedron args={[0.5, 0]} position={[-3, -3.2, -2.5]}>
            <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
          </Icosahedron>
        </Float>
      )}

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.3}>
        <Octahedron args={[0.55, 0]} position={[3, 3.6, -1.8]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
        </Octahedron>
      </Float>
    </group>
  );
}

const Scene3D = () => {
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      setMobile(window.matchMedia("(max-width: 768px)").matches);
      setReady(true);
    });

    const onResize = () => setMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={mobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Shapes mobile={mobile} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
