<template>
  <mavon-editor ref="md" @change="change" />
</template>

<script>
  // import { upload } from '@/utils/upload'
  // import { mapGetters } from 'vuex'
  import {mavonEditor} from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';

  export default {
    name: 'Markdown',
    components: {
      mavonEditor
    },
    data() {
      return {
        height: document.documentElement.clientHeight - 200 + 'px'
      }
    },
    computed: {

    },
    mounted() {
      const that = this
      window.onresize = function temp() {
        that.height = document.documentElement.clientHeight - 200 + 'px'
      }
    },
    methods: {
      change(value, render) {
        this.$emit('change', value, render);
      }
      /*imgAdd(pos, $file) {
        upload(this.imagesUploadApi, $file).then(res => {
          const data = res.data
          const url = this.baseApi + '/file/' + data.type + '/' + data.realName
          this.$refs.md.$img2Url(pos, url)
        })
      }*/
    }
  }
</script>

<style scoped>
  .v-note-wrapper {
    z-index: 1;
     min-width: initial;
  }
</style>
