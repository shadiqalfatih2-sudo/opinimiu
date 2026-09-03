"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished?: Promise<void> };
};

export default function MotionController() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("motion-ready");

    const revealSelector = [
      "main section:not(.home-hero)",
      ".article-row",
      ".topic-list a",
      ".data-card",
      ".side-grid article",
      ".issue-grid a",
      ".program-stack article",
      ".search-result"
    ].join(",");

    const items = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    items.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });

    items.forEach((item) => observer.observe(item));

    const header = document.querySelector<HTMLElement>(".site-header");
    const heroImage = document.querySelector<HTMLElement>(".hero-media img");
    let raf = 0;

    const updateScrollEffects = () => {
      raf = 0;
      const y = window.scrollY;
      header?.classList.toggle("is-scrolled", y > 28);
      if (heroImage) {
        const shift = Math.min(54, y * 0.075);
        const scale = Math.max(1.025, 1.06 - y * 0.000035);
        heroImage.style.setProperty("--hero-shift", `${shift}px`);
        heroImage.style.setProperty("--hero-scale", scale.toFixed(4));
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      event.preventDefault();
      const href = `${url.pathname}${url.search}${url.hash}`;
      const documentWithTransition = document as ViewTransitionDocument;
      if (documentWithTransition.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        documentWithTransition.startViewTransition(() => router.push(href));
      } else {
        router.push(href);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pathname, router]);

  return null;
}
