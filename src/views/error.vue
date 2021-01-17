<template>
  <div class="errorPage">
    <h3>
      <img src="../assets/image/404.png" style="width: 100px;height: 100px;" />
      &nbsp;404!Not Found!
      <br>
      <router-link to="/heatMap" tag="span">返回首页</router-link>
    </h3>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.errorPage{
  width: 100%;
  height: 100vh;
  color: black;
}
.errorPage h3{
  text-align: center;
  margin-top: 1%;
}
.errorPage span{
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
}
</style>