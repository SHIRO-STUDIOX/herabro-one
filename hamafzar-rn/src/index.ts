import type { App } from 'vue'
import type { HamafzarRNConfig } from './types'
import { configureHamafzarRN } from './composables/useChangelog'

// Components
import ChangelogDrawer from './components/ChangelogDrawer.vue'
import ChangelogDetail from './components/ChangelogDetail.vue'
import ChangelogActions from './components/ChangelogActions.vue'
import ChangelogTriggerButton from './components/ChangelogTriggerButton.vue'
import ComplexCardHeader from './components/ComplexCardHeader.vue'
import ClusterLinkSvg from './components/ClusterLinkSvg.vue'

// Import base standalone stylesheet
import './assets/styles.css'

// Export types
export * from './types'

// Export API service
export * from './api/changelogService'

// Export composables
export * from './composables/useChangelog'
export * from './composables/useWindowSize'

// Export components
export {
  ChangelogDrawer,
  ChangelogDetail,
  ChangelogActions,
  ChangelogTriggerButton,
  ComplexCardHeader,
  ClusterLinkSvg,
}

// Vue 3 Plugin default export
export default {
  install(app: App, options?: HamafzarRNConfig) {
    if (options) {
      configureHamafzarRN(options)
    }

    app.component('ChangelogDrawer', ChangelogDrawer)
    app.component('HamafzarRNDrawer', ChangelogDrawer)
    app.component('ChangelogTriggerButton', ChangelogTriggerButton)
    app.component('HamafzarRNTrigger', ChangelogTriggerButton)
    app.component('ChangelogDetail', ChangelogDetail)
  },
}
