import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 800)

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize)
    }
  })

  return {
    width,
    height,
  }
}
