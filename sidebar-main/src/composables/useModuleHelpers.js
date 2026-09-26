import { computed } from "vue";
import { useAppStore } from "../app/store";

export function useModuleHelpers() {
  const appStore = useAppStore();

  const activeModule = computed(() => {
    const activeKey = appStore.getActiveModuleKey;
    const found = appStore.getConfig?.modules?.find(m => m.key == activeKey);
    
    if(found) return found

    return appStore.getConfig?.modules?.find(m => !!m?.active)
  });

  return { activeModule };
}
