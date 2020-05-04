<template>
    <v-app>
        <toolbar></toolbar>
        <v-container wrap id="body">
            <v-layout row>
                <v-row align="center">
                    <v-col cols="9">
                        <v-select
                            :items="availableVideo"
                            label="ID"
                            v-model="film.id"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-text-field
                    id="inputBox"
                    v-model="film.name"
                    label="Name"
                    outline
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-text-field
                    id="inputBox"
                    v-model="film.year"
                    label="Year"
                    outline
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-text-field
                    id="inputBox"
                    v-model="film.poster"
                    label="Poster Link"
                    outline
                    ></v-text-field>
                </v-flex>
            </v-layout>
             <v-layout row>
                <v-flex xs9>
                    <v-text-field
                    id="inputBox"
                    v-model="film.link + film.id"
                    label="Video Link"
                    outline
                    readonly
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-text-field
                    id="inputBox"
                    v-model="film.plot"
                    label="Description"
                    outline
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-spacer> </v-spacer>
                 <v-spacer> </v-spacer>
                <v-flex>                     
                    <v-btn v-on:click="handleSubmit" color="green"> Gửi </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import {apiService} from '../_services'
export default {
    name: 'CreateFilm',
    components: {
        toolbar: Toolbar
    },
    data: () => {
        return {
            film:{
                id: '',
                name: null,
                year: null,
                posterLink: null,
                plot: null,
                link: 'http://125.212.203.148:8080/hls/'
            },
            availableVideo: []
        }
    },
    created(){
        var that = this
        apiService.getVideoList().then((videoList) => {
            videoList.filesList.forEach(element => {
                that.$data.availableVideo.push(element)
            })
        })
    },
    methods: {
        handleSubmit(){
            if(confirm("Do you want to save?")){
                this.$data.film.link = this.$data.film.link + this.$data.film.id
                console.log(this.$data.film.link)
                apiService.addFilm(this.$data.film)
                this.$router.push({path: '/dashboard'})
            }
        }
    }
}
</script>
<style scoped>
#inputBox {
    align-self: auto
}
#body {
    padding-top: 5%
}
</style>
