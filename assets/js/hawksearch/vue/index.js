import HawksearchVue from '@hawksearch/vue';
import hawkConfig from './hawkConfig.json';

export default function () {
    var components = document.querySelectorAll('[data-hawksearch-component="results"]');

    if (components) {
        components.forEach(component => {
            var config = hawkConfig;
            config.clientGuid = component.getAttribute('data-hawksearch-client-guid');
            config.indexName = component.getAttribute('data-hawksearch-index-name');
            config.apiUrl = component.getAttribute('data-hawksearch-search-api') || hawkConfig.apiUrl;
            config.dashboardUrl = component.getAttribute('data-hawksearch-dashboard-url') || hawkConfig.dashboardUrl;
            config.websiteUrl = component.getAttribute('data-hawksearch-website-url') || hawkConfig.websiteUrl;

            var widget = HawksearchVue.createWidget(component, { config });
            HawksearchVue.initialSearch(widget);
        });

    }
}