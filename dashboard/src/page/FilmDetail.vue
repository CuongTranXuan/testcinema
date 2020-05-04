<template>
    <v-app padding-top="5%">
        <toolbar></toolbar>
        <v-divider></v-divider>
          <v-divider></v-divider>
        <v-container id="backgroundImg" fluid grid-list-md>
            <v-layout row wrap>
                    <v-row align="center">
                        <v-col cols="9">
                            <v-select
                                v-model="filmInfo.id"
                                :items="availableVideo"
                                label="ID"
                                :disabled= disabled
                            ></v-select>
                        </v-col>
                    </v-row>
            </v-layout>
            <v-layout row wrap>
                    <v-text-field
                    v-model="filmInfo.name"
                    label="Name"
                    :disabled= disabled
                    ></v-text-field>
            </v-layout>
            <v-layout row wrap>
                    <v-text-field
                    v-model="filmInfo.year"
                    label="Year"
                    :disabled= disabled
                    ></v-text-field>
            </v-layout>
            <v-layout row wrap>
                     <v-text-field
                    v-model="filmInfo.poster"
                    label="Poster Link"
                    :disabled= disabled
                    ></v-text-field>
            </v-layout>
            <v-layout row wrap>
                     <v-text-field
                    v-model="'http://125.212.203.148:8080/hls/' + filmInfo.id"
                    label="Video Link"
                    :disabled= disabled
                    ></v-text-field>
            </v-layout>
            <v-layout row wrap>
                     <v-text-field
                    v-model="filmInfo.plot"
                    label="Description"
                    :disabled= disabled
                    ></v-text-field>
            </v-layout>
                </v-flex>
                <v-row align="center">
                    <v-col class="text-center" >
                         <br>
                        <v-btn v-on:click="changeState" :color="buttonColor"> {{buttonText}} </v-btn>
                    </v-col>
                    <v-col class="text-center" >
                         <br>
                        <v-btn v-on:click="update" :disabled="disabled" color="success"> Save </v-btn>
                    </v-col>
                </v-row>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
 import {apiService} from '../_services';
import Toolbar from './components/Toolbar'
export default {
    name: "FilmDetail",
    components: {
        toolbar: Toolbar
    },
    data(){
        return {
            disabled: true,     //Disable text fields
            buttonText: 'Edit',
            buttonColor: 'info',
            filmInfo: {
                id: null,
                name: null, 
                year: null,
                plot: null,
                link: 'http://125.212.203.148:8080/hls/',
                poster:null,
            },
            availableVideo: []
        }
    },
    created(){
        let that = this;
        apiService.getFilm(this.$route.params.id).then((film) => {
            that.$data.filmInfo = film;
        });
        apiService.getVideoList().then((videoList) => {
            videoList.filesList.forEach(element => {
                that.$data.availableVideo.push(element)
            })
        })
    },
    methods: {
        changeState(){
            this.$data.disabled = !this.$data.disabled;
            if (this.$data.disabled === true){
                this.$data.buttonText = "Edit";
                this.$data.buttonColor = "info";
                let that = this;
                apiService.getFilm(this.$route.params.id).then((film) => {
                    that.$data.filmInfo = film;
                });
            }
            else {
                this.$data.buttonText = "Cancel";
                this.$data.buttonColor = "error";
            }            
        },
        update(){
            if (confirm("Are you sure?")) {
                 this.$data.filmInfo.link = 'http://125.212.203.148:8080/hls/' + this.$data.filmInfo.id
                console.log(this.$data.filmInfo)
                apiService.updateFilm(this.$data.filmInfo).then((res) => {
                    alert(res.result)
                    location.reload()
                })
            }
        }
    }
}
</script>