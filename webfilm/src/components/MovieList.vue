<template>
    <div id="movie-list">
        <movie-item v-for="movie in movies" v-bind:movie="movie">
        </movie-item>
    </div>
</template>
<script>

    import MovieItem from './MovieItem.vue';

    export default {
        props: ['movies'],
        components: {
            MovieItem
        }
    }
</script>
