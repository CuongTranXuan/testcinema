<template>
    <div id="overview">
        <div class="main">
            <movie-list v-bind:movies="movies"></movie-list>
        </div>
    </div>
</template>
<script>
    import MovieList from './MovieList.vue';

    export default {
        props: [ 'movies' ],
        components: {
            MovieList
        },
    }
</script>
