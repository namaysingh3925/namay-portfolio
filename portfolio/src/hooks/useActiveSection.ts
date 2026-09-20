import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently crossing the middle of the viewport.
 *
 * The negative top/bottom root margins collapse the observer's root into a
 * thin horizontal band at the centre of the screen, so exactly one section
 * "owns" the indicator at a time — no flicker between neighbours.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (winner) setActive(winner.target.id)
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.2, 0.5, 0.8, 1],
      },
    )

    for (const id of key.split('|')) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [key])

  return active
}
