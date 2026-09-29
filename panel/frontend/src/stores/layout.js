import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useLayoutStore = defineStore('layout', () => {
    // Right sidebar state: false = expanded (open), true = collapsed (closed)
    const isSidebarCollapsed = ref(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
    // Left secondary sidebar state: false = collapsed (closed), true = expanded (open)
    const isLeftSidebarOpen = ref(false);
    function toggleSidebar() {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
        // When opening right sidebar (isSidebarCollapsed becomes false), automatically close left sidebar
        if (!isSidebarCollapsed.value) {
            isLeftSidebarOpen.value = false;
        }
    }
    function setSidebarCollapsed(collapsed) {
        isSidebarCollapsed.value = collapsed;
        if (!collapsed) {
            isLeftSidebarOpen.value = false;
        }
    }
    function toggleLeftSidebar() {
        isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
        // When opening left sidebar (isLeftSidebarOpen becomes true), automatically collapse right sidebar
        if (isLeftSidebarOpen.value) {
            isSidebarCollapsed.value = true;
        }
    }
    function setLeftSidebarOpen(open) {
        isLeftSidebarOpen.value = open;
        if (open) {
            isSidebarCollapsed.value = true;
        }
    }
    return {
        isSidebarCollapsed,
        isLeftSidebarOpen,
        toggleSidebar,
        setSidebarCollapsed,
        toggleLeftSidebar,
        setLeftSidebarOpen,
    };
});
