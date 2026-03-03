"use client"

import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

type RevealVariant = "up" | "left" | "right" | "scale"

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
}

interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  className?: string
  style?: CSSProperties
  threshold?: number
  as?: ElementType
}

export function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className,
  style,
  threshold = 0.12,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<Element>(null)

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

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(variantClass[variant], className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  )
}
