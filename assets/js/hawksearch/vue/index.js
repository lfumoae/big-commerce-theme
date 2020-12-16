import HawksearchVue from '@hawksearch/vue';
import { ResultListing } from '@hawksearch/vue';
import ResultItem from './components/ResultItem.vue';
import defaultConfig from '../hawksearch.config.json';

ResultListing.components.ResultItem = ResultItem;

export default function () {
    var components = document.querySelectorAll('[data-hawksearch-component="results"], [data-hawksearch-component="search-box"]');
    var dataLayers = {};

    if (components) {
        components.forEach(component => {
            var dataLayer = component.getAttribute('data-hawksearch-data-layer') || ('index_' + component.getAttribute('data-hawksearch-index-name'));
            var config = defaultConfig;
            config.clientGuid = component.getAttribute('data-hawksearch-client-guid') || defaultConfig.clientGuid;
            config.indexName = component.getAttribute('data-hawksearch-index-name') || defaultConfig.indexName;
            config.apiUrl = component.getAttribute('data-hawksearch-search-api') || defaultConfig.apiUrl;
            config.dashboardUrl = component.getAttribute('data-hawksearch-dashboard-url') || defaultConfig.dashboardUrl;
            config.websiteUrl = component.getAttribute('data-hawksearch-website-url') || defaultConfig.websiteUrl;

            if (dataLayer) {
                if (dataLayers.hasOwnProperty(dataLayer)) {
                    var widgetStore = HawksearchVue.storeInstances[dataLayers[dataLayer]];

                    if (widgetStore) {
                        var widget = HawksearchVue.createWidget(component, { config, store: widgetStore });
                    }
                }
                else {
                    var widget = HawksearchVue.createWidget(component, { config });
                    var widgetStore = HawksearchVue.getWidgetStore(widget);
                    dataLayers[dataLayer] = widgetStore.state.storeId;
                }
            }
            else {
                var widget = HawksearchVue.createWidget(component, { config });
            }

            if (widget && component.getAttribute('data-hawksearch-component') == 'results') {
                HawksearchVue.initialSearch(widget);
            }
        });

    }
}