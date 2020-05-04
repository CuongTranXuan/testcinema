<template>
    <div>
<!-- navigation part............................................... -->
        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        >
        <v-list class="pa-1">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Film Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list>
            <v-divider></v-divider>

            <v-list-item
            v-for="item in items"
            :key="item.title"
            v-on:click="navigate(item)"
            >
                <v-list-item-action>
                    <v-icon left >{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>

    <v-app-bar
      app
      dark
    >
    <v-app-bar-nav-icon @click="activePanel" />
      <v-toolbar-title>Application</v-toolbar-title>
      <div class="spacer"></div>
		<!-- <el-button type="danger" @click="logout">logout</el-button> -->
        <v-btn depressed small color="error" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
    </div>
</template>

<script>
import {userService} from '../../_services';
export default {
    name: "Toolbar",
    data: () => ({
        drawer: null,
        items: [
            { title: 'Dashboard', icon: 'mdi-home' , route: '/dashboard'},
            { title: 'Add film', route: '/createFilm'},
            { title: 'Make m3u8', route: '/ffmpeg'}
        ]
    }),
    methods: {
        activePanel() {
        this.$data.drawer = !this.$data.drawer;
        },
        navigate(item) {
             this.$router.push({path: item.route})
        },
		logout() {
             userService.logout()
             location.reload()
		},
    }
}
</script>