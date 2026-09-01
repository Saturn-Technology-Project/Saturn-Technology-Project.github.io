import { onMounted, onUnmounted, type Ref } from 'vue'

export function useReveal(target: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    const els = target.value.querySelectorAll('.reveal')
    els.forEach((el) => observer!.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
