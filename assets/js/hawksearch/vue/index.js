import HawksearchVue from '@hawksearch/vue';

export default function () {
    var components = document.querySelectorAll('[data-hawksearch-component="results"]');

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

            var widget = HawksearchVue.createWidget(component, { config });
            HawksearchVue.initialSearch(widget);
        });

    }
}