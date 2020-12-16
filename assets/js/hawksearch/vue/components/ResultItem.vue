<template>
    <div class="hawk-results__item" @click="onClick">
        <result-image :imagePath="getField('image')"></result-image>

        <div class="hawk-results__item-name">
            <span>{{ getField('itemname') }}</span>
        </div>
    </div>
</template>

<script>
    import { ResultItem } from '@hawksearch/vue';

    export default {
        extends: ResultItem,
        templateOverride: '#vue-hawksearch-result-item'
    };
</script>
