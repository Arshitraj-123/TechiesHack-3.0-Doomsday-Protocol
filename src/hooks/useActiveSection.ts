import { useEffect, useState } from "react";

/**
 * Watches a set of section elements via IntersectionObserver and returns
 * the `id` of whichever section currently occupies the narrow centre band
 * of the viewport (rootMargin "-45% 0px -45% 0px").
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    const elements: Element[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) observer.unobserve(el);
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
