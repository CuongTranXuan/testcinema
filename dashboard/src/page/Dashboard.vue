<template>
  <div>
    <toolbar></toolbar>
    <v-container id="backgroundImg" fluid grid-list-md>
      <v-data-iterator
                :items="listFilm"
                hide-default-footer
                wrap
            >
                <v-flex
                    slot="item"
                    slot-scope="props"
                    lg10
                    pt-2
                    pl-5
                >
                  <v-card  class="mx-auto" max-width="400">
                     <v-img
                      class="white--text align-end"
                      height="200px"
                      v-bind:src="props.item.poster"
                    >     </v-img>
                    <v-card-title class="subheading font-weight-bold" @click="goDetail(props.item._id)">{{props.item.name}}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="orange"
                        text
                        v-on:click=goDetail(props.item._id)
                      >
                        Edit
                      </v-btn>

                      <v-btn
                        color="orange"
                        text
                        @click="deleteFilm(props.item._id)"
                      >
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
  import {apiService} from '../_services';

  import { mapState, mapActions } from 'vuex'
  import Toolbar from './components/Toolbar.vue'
  export default {
    name:'Dashboard',
    props: {
      source: String,
    },
    components:{
      toolbar: Toolbar
    },
    data: () => ({
      listFilm: []
    }),
    created() {
      var that = this;
      apiService.getFilmList().then((filmList) => {
        that.$data.listFilm = filmList;
      });
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),

    },
    methods: {
      getCommand: function(){
        apiService.sendCommand(this.$data.ffmpeg_command)
      },
      activePanel() {
        this.$data.drawer = !this.$data.drawer;
      },
       navigate(item) {
             this.$router.push({path: item.route})
        },
      deleteFilm(id){
        if (confirm("Do you really want to remove that film?")) {
          apiService.removeFilm(id)
          location.reload()
        }
      },
      goDetail(id){
        this.$router.push({path: `/${id}`})
      }
    }
  }
</script>
