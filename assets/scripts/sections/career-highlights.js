const animateCounter = (counter) => {
  const target = Number(counter.dataset.count)
  if (!Number.isFinite(target)) return

  const duration = 1200
  const startTime = performance.now()

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    counter.textContent = Math.round(target * eased).toString()

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      counter.textContent = target.toString()
    }
  }

  requestAnimationFrame(tick)
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.career-highlight-counter')
  if (counters.length === 0) return

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter)
    return
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      animateCounter(entry.target)
      currentObserver.unobserve(entry.target)
    })
  }, { threshold: 0.35 })

  counters.forEach((counter) => observer.observe(counter))
})
