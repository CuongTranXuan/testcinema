<template>
    <div class="movie">
        <div class="movie-col-left">
            <router-link v-bind:to="{ name: 'movie', params: { id: movie.id } }">
                <img v-bind:src="movie.poster">
            </router-link>
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <router-link v-bind:to="{ name: 'movie', params: { id: movie.id } }">
                    <h2>{{ movie.name }}</h2>
                </router-link>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: [ 'movie' ],
    }
</script>
