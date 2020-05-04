<template>
    <div :key="playerStream">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
import videojs from 'video.js';

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        name: String
    },
    watch: {
        name: function() {
            location.reload()
        }
    },
    data() {
        return {
            player: null,
            playerStream: 0
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady');
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>
<style>
    @import '../../../node_modules/video.js/dist/video-js.css';
    @import '../../../node_modules/@videojs/themes/dist/fantasy/index.css';
</style>