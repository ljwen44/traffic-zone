<template>
  <div id="wrapper_index">
    <router-view></router-view>
    <Header></Header>
    <br>
  </div>
</template>

<script>
import Header from '_c/header.vue'
export default {
  name: 'index',
  data(){
    return {
      flag: true
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
#wrapper_index{
  height: 100%;
  width: 100%;
}
</style>
