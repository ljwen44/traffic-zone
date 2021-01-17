<template>
  <div id="wrapper" class="wrapper">
      <div class="mask"></div>
    <!-- <div class="bg_vid" @contextmenu.prevent="">
        <div class="mask"></div>
        <video src="../assets/video/video.mp4" autoplay loop width="100%" height="100%" muted ref="video"></video>
    </div> -->
    
    <div class="formClass">
        <div class="title">
            <h2>交通大数据管理员登录</h2>
        </div>
        <form class="form-horizontal">
            <div class="form-group form-input">
                <div class="input-group">
                    <span class="input-group-addon iconfont icon-admin-line"></span>
                    <input 
                        type="text" 
                        class="form-control"
                        placeholder="管理员账号"
                        v-model="user"
                    />
                </div>
            </div>
            <div class="form-group form-input">
                <div class="input-group">
                    <span class="input-group-addon iconfont icon-RectangleCopy" style="font-weight: 600;"></span>
                    <input 
                        type="password" 
                        class="form-control"
                        placeholder="请输入密码"
                        @keyup.enter.prevent="handleClick"
                        v-model="password"
                    />
                </div>
            </div>
            <div class="form-group form-input">
                <input 
                    type="button" 
                    class="btn btn-primary login-btn" 
                    @click.prevent="handleClick"
                    value="登录"    
                />
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { setCookie, getCookie } from '@/lib/cookie.js'
export default {
    name: 'login_page',
    data(){
        return {
            user: '',
            password: ''
        }
    },
    mounted(){
        /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
        if(getCookie('username')){
            this.$router.push('/heatMap')
        }
    },
    methods: {
        ...mapMutations([
            'SET_USERNAME'
        ]),
        handleClick(){
            if (this.user === "" || this.password === ""){
                alert("请输入用户名或密码")
            } else {
                this.axios.get('./data/data.json').then(res => {
                    if ((this.user === res.data.user.user) && (this.password === res.data.user.password)) {
                        alert('登录成功')
                        setCookie('username', this.user, 1000*60)
                        this.SET_USERNAME(this.user)
                        setTimeout(function(){
                            this.$router.push('/heatMap')
                        }.bind(this),1000)
                    } else {
                        alert('账号或密码有误，请重新输入')
                    }
                }).catch(err => {
                    if(err.message){
                        console.log(err.message)
                    } else {
                        this.$router.push('/error')
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background: url("../assets/image/bg1.jpg") no-repeat;
    background-size: cover;
}
.mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    position: absolute;
}
.bg_vid{
    width: 100%;
    height: 100%;
    z-index: -1;
}
video{
    object-fit: cover;
}
.title{
    border-bottom: 1px solid #ccc;
    text-align: center;
}
.title h2{
    font-size: 20px;
    margin-bottom: 0;
    line-height: 2;
    color: #b0bdff;
}
.formClass{
    margin: 0 auto;
    width: 25%;
    position: absolute;
    top: 35%;
    left: 40%;
    background: rgba(0,0,0,0.6);
    border: 1px solid #000;
    border-radius: 10%;
}
.form-input{
    padding: 5%;
    margin-bottom: 0;
    padding-bottom: 0;
}
.form-input:nth-child(3){
    margin-bottom: 1rem;
}
.form-input span{
    font-size: 30px;
    float: right;
    margin-right: 5%;
}

.login-btn{
    width: 100%;
}
</style>