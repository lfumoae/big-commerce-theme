import HawksearchVue from '@hawksearch/vue';
import { ResultListing } from '@hawksearch/vue';
import ResultItem from './components/ResultItem.vue';

ResultListing.components.ResultItem = ResultItem;

//Handlebars.registerHelper('vue-js', function (options) {
//    return options.fn();
//});

export default function () {
    var components = document.querySelectorAll('[data-hawksearch-component="results"], [data-hawksearch-component="search-box"], [data-hawksearch-component="recommendations"], [data-hawksearch-component="page-content"]');
    var dataLayers = {};

    if (components) {
        components.forEach(component => {
            const config = {
                clientGuid: component.getAttribute('data-hawksearch-client-guid'),
                apiUrl: component.getAttribute('data-hawksearch-search-api'),
                indexName: component.getAttribute('data-hawksearch-index-name'),
                searchConfig: {
                    scrollUpOnRefresh: false
                }
            };
            var dataLayer = component.getAttribute('data-hawksearch-data-layer') || ('index_' + component.getAttribute('data-hawksearch-index-name'));

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