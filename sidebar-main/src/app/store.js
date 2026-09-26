import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    config: {},
    activeModuleKey: null,
    activeSidebarItemId: null,
    faqModalVisible: false,
    searchbarVisible: false,
    businessMenuVisible: false,
    pageActions: [],
    anyRowSelected: false,
  }),

  getters: {
    getConfig: (state) => {
      return state.config;
    },

    getActiveModuleKey: (state) => {
      return state.activeModuleKey;
    },

    getActiveSidebarItemId: (state) => {
      return state.activeSidebarItemId;
    },

    isFaqModalVisible: (state) => {
      return state.faqModalVisible;
    },

    isSearchbarVisible: (state) => {
      return state.searchbarVisible;
    },

    isBusinessMenuVisible: (state) => {
      return state.businessMenuVisible;
    },
  },

  actions: {
    setAllConfig(sidebarConfig) {
      this.config = sidebarConfig;
    },
    setConfig(key, value) {
      if (!this.config || typeof this.config !== "object") {
        this.config = {};
      }
      this.config[key] = value;
    },
    setActiveModuleKey(value) {
      this.activeModuleKey = value;
    },

    setActiveSidebarItemId(value) {
      this.activeSidebarItemId = value;
    },

    openFaqModal() {
      this.faqModalVisible = true;
    },
    closeFaqModal() {
      this.faqModalVisible = false;
    },
    openSearchbar() {
      this.searchbarVisible = true;
    },
    closeSearchbar() {
      this.searchbarVisible = false;
    },
    toggleSearchbar() {
      this.searchbarVisible = !this.searchbarVisible;
    },
    openBusinessMenu() {
      this.businessMenuVisible = true;
    },
    closeBusinessMenu() {
      this.businessMenuVisible = false;
    },
    setPageActions(actions) {
      this.pageActions = actions;
    },
    clearPageActions() {
      this.pageActions = [];
    },
    setAnyRowSelected(value) {
      this.anyRowSelected = value;
    },
  },
});
