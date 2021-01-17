<template>
  <div id="App">
    <router-view></router-view>
    <Loading v-if='loading'/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '_c/loading.vue'
export default {
  name: 'app',
  data(){
    return {
    }
  },
  components:{
    Loading
  },
  computed: {
    ...mapState([
      'loading'
    ])
  }
}
</script>

<style>
*{
  margin: 0;
}
#App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  color: #Fff;
  overflow: hidden;
}

</style>
