<template>
    <section>
        <div class='mock'>
            <div class='main'>
                loading...
            </div>
        </div>
    </section>  
</template>

<script>
export default {

}
</script>

<style scoped>
section{
    width:100%;
    height:100vh;
    position: fixed;
    top: 0;
}
.mock{
    width:100%;
    height:100vh;
    position:absolute;
    z-index:100;
    background-color:rgba(0,0,0,.8);
}
.main{
    margin:20% auto;
    text-align:center;
    font-size: 30px;
}
</style>