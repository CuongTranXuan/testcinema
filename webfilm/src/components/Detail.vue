<template>
    <div v-if="movie" id="detail">
        <movie-item v-bind:movie="movie">
            <div class="movie-details">
                <table>
                    <tr><td>Released date: </td><td>{{ movie.year }}</td></tr>
                    <tr><td>Description: </td><td>{{ movie.plot }}</td></tr>
                </table>
            </div>
        </movie-item>
        <div v-if="!isLoading">
		    <video-player :options="videoOptions" :name="film"/>
	    </div>
        <div class="home">
            <router-link v-bind:to="{ name: 'home' }">Back to results</router-link>
        </div>
    </div>
</template>
<script>
    import MovieItem from './MovieItem.vue';
    import VideoPlayer from './stuff/Player.vue';
    import videoService from '../util/videoService.js';
    export default {
        props: [ 'movies' ],
        mounted() {
            this.updateSource()
        },
        watch: {
            '$route.params.id'(){
                if (this.$route.params.id)
                this.updateSource()
            }
        },
        computed: {
            movie() {
                let movie = this.movies.find(movie => movie.id === this.$route.params.id);
                return movie ? movie : null;
            }
        },
        components: {
            MovieItem,
            VideoPlayer
        },
        data(){
            return{
                videoOptions: {
                    autoplay: false,
                    controls: true,
                },
                isLoading: true,
                film: 'alo'      
            }
        },
        methods: {
            updateSource(){
                this.$data.videoOptions = {
                    autoplay: false,
                    controls: true,
                    sources: [
                        {
                            src: this.movie.link,
                            withCredentials: false,
                            type: 'application/x-mpegURL',
                        }
                    ]
                }
                this.isLoading = false;
                this.$data.film = this.movie.name;
            // videoService.getStream(this.$route.params.id)
            //     .then(res => {
            //         console.log(res);
            //         this.$data.videoOptions = {
            //                 autoplay: false,
            //                 controls: true,
            //                 sources: [
            //                     {
            //                         src: res,
            //                         withCredentials: false,
            //                         type: 'application/x-mpegURL',
            //                     }
            //                 ]
            //             }
            //         this.isLoading = false;
            //         this.$data.film = this.$route.params.id;
            //     })
            }
        }

    }
</script>
