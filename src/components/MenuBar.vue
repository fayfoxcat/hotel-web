<template>
    <div class="menu-bar">
        <van-tabbar v-model="active" class="menu">
            <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="search" icon="search">发现</van-tabbar-item>
            <van-tabbar-item name="setting" icon="setting-o" @click="ShowUserBar">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:'home',
        }
    },
    components:{
    },
    methods: {
        ShowUserBar(){
            this.$emit('ShowUserBar')
        }
    },
    //生命周期钩子函数
    mounted() {

    },
}
</script>
<style lang="scss" scoped>
    .menu-bar{
        position: absolute;
        z-index: 100;
        .menu{
            background-color:rgb(223, 223, 223);
        }
    }
</style>