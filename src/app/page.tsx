"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Cursor from "@/components/portfolio/Cursor";
import GridBackground from "@/components/portfolio/GridBackground";
import SvgOrbits from "@/components/portfolio/SvgOrbits";
import Loading from "@/components/portfolio/Loading";
import Navbar from "@/components/portfolio/Navbar";
import SocialIcons from "@/components/portfolio/SocialIcons";
import Landing from "@/components/portfolio/Landing";
import About from "@/components/portfolio/About";
import WhatIDo from "@/components/portfolio/WhatIDo";
import Career from "@/components/portfolio/Career";
import Work from "@/components/portfolio/Work";
import TechStack from "@/components/portfolio/TechStack";
import Contact from "@/components/portfolio/Contact";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Scene3D = dynamic(() => import("@/components/portfolio/Scene3D"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useScrollReveal();

  const onLoadingDone = useCallback(() => {
    setLoaded(true);
    document.body.style.overflowY = "auto";
    const main = document.getElementsByTagName("main")[0];
    main?.classList.add("main-active");
    gsap.to(
      [
        "#site-header",
        "#icons-section",
        "#nav-fade",
        "#circle-1",
        "#circle-2",
      ],
      { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
    );
  }, []);

  // Re-run scroll-reveal observer after Loading finishes, since main becomes visible then
  useEffect(() => {
    if (!loaded) return;
    const event = new Event("scroll-reveal-refresh");
    window.dispatchEvent(event);
    // Force ScrollTrigger to recalc positions now that main is visible
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    });
  }, [loaded]);

  return (
    <>
      <GridBackground />
      <Scene3D />
      <SvgOrbits />
      <Cursor />

      {!loaded && <Loading onDone={onLoadingDone} />}

      <Navbar />
      <SocialIcons />

      <main id="top">
        <div className="container-main">
          <Landing play={loaded} />
          <About />
          <WhatIDo />
          <Career />
          <Work />
          <TechStack />
          <Contact />
        </div>
      </main>
    </>
  );
}
