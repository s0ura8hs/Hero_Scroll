"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "58%", label: "Increase in pick-up point use", tone: "lime" },
  { value: "27%", label: "Increase in pick-up point use", tone: "charcoal" },
  { value: "23%", label: "Decrease in customer phone calls", tone: "blue" },
  { value: "40%", label: "Decrease in customer phone calls", tone: "orange" }
];

export default function Home() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 16, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out"
      });

      const drive = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-track",
          start: "top top",
          end: "+=1900",
          pin: ".viewport",
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      drive.fromTo(".welcome-reveal",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "none", duration: 0.72 },
        0.04
      );

      drive.fromTo(".car",
        { x: () => -window.innerWidth * 0.12 },
        { x: () => window.innerWidth * 0.72, ease: "none", duration: 0.86 },
        0
      );

      drive.fromTo(".road-dashes",
        { x: 0 },
        { x: () => -window.innerWidth * 0.85, ease: "none", duration: 0.78 },
        0
      );

      const checkpoints = [
        { selector: ".stat-1", at: 0.08 },
        { selector: ".stat-2", at: 0.28 },
        { selector: ".stat-3", at: 0.49 },
        { selector: ".stat-4", at: 0.68 }
      ];
      checkpoints.forEach(({ selector, at }) => {
        drive.fromTo(selector,
          { autoAlpha: 0, y: 18, scale: 0.88, rotate: -2 },
          { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 0.075, ease: "back.out(1.7)" },
          at
        );
        drive.to(selector,
          { autoAlpha: 0.2, y: -8, scale: 0.96, duration: 0.07, ease: "power1.in" },
          at + 0.13
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="scroll-track">
      <section className="viewport">
        <div className="stats stats-top">
          {stats.slice(0, 2).map((stat, index) => (
            <article className={`stat-card ${stat.tone} stat-${index + 1}`} key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <div className="road" aria-label="Race track">
          <div className="curb curb-top" />
          <div className="road-dashes" />
          <div className="welcome-zone" aria-label="Welcome Itz Fizz">
            <div className="welcome-track">
              <div className="welcome-base">WELCOME ITZFIZZ</div>
              <div className="welcome-reveal">WELCOME ITZFIZZ</div>
            </div>
          </div>
          <div className="curb curb-bottom" />
        </div>

        <div className="car" aria-hidden="true">
          <img src="/car.png" alt="" />
        </div>

        <div className="stats stats-bottom">
          {stats.slice(2, 4).map((stat, index) => (
            <article className={`stat-card ${stat.tone} stat-${index + 3}`} key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

      </section>
    </main>
  );
}
