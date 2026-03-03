"use client"

import { useEffect, useRef } from "react"

/**
 * Attaches an IntersectionObserver to the returned ref.
 * Once the element enters the viewport the `is-visible` class is added,
 * triggering the CSS transitions defined in globals.css.
 */
export function useScrollReveal<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
