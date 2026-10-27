import { App } from 'vue';
import { HamafzarRNConfig } from './types';
import { default as ChangelogDrawer } from './components/ChangelogDrawer.vue';
import { default as ChangelogDetail } from './components/ChangelogDetail.vue';
import { default as ChangelogActions } from './components/ChangelogActions.vue';
import { default as ChangelogTriggerButton } from './components/ChangelogTriggerButton.vue';
import { default as ComplexCardHeader } from './components/ComplexCardHeader.vue';
import { default as ClusterLinkSvg } from './components/ClusterLinkSvg.vue';
export * from './types';
export * from './api/changelogService';
export * from './composables/useChangelog';
export * from './composables/useWindowSize';
export { ChangelogDrawer, ChangelogDetail, ChangelogActions, ChangelogTriggerButton, ComplexCardHeader, ClusterLinkSvg, };
declare const _default: {
    install(app: App, options?: HamafzarRNConfig): void;
};
export default _default;
