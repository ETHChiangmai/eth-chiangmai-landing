document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector('video')
  video!.addEventListener('canplaythrough', () => {
    video!.classList.remove('hidden')
    setTimeout(() => {
      video!.classList.remove('opacity-0')
      setTimeout(() => {
        video!.play()
        const imgIds = ['#p0', '#p1', '#p2']
        for (const id of imgIds) {
          const node = document.querySelector(id)
          node?.classList.add('hidden')
        }
      }, 500)
    }, 1)
  }, { once: true })
}, { once: true })