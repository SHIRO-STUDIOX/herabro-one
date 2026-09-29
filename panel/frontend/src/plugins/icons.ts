import { addCollection } from '@iconify/vue'

export const loadIcons = async () => {
  const [offlineIcons, offlineLucideIcons] = await Promise.all([
    import('@/components/icons/offlineIcons.json'),
    import('@/components/icons/offlineLucideIcons.json'),
  ])
  addCollection(offlineIcons.default || offlineIcons)
  addCollection(offlineLucideIcons.default || offlineLucideIcons)
}
