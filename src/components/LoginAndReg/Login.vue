<template>
    <div class="login">
        <form class="mui-input-group">
            <div class="headimg">
                <div class="mui-icon mui-icon-person"></div>
            </div>
            <div class="mui-input-row">
                <label>用户名</label>
            <input type="text" class="mui-input-clear" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password mui-input-clear" placeholder="请输入密码" v-model="password">
            </div>
            <div class="mui-input-row">
                <label>验证码</label>
                <input type="text" class=" mui-input-clear" placeholder="请输入验证码" v-model="code">
            </div>
            <div class="" id="submit-button">
                <button type="button" class="mui-btn mui-btn-primary" @click="login">确认</button>
                <button type="button" class="mui-btn mui-btn-danger" @click="ShowRegister">去注册</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:'',
            code:''
        }
    },
    methods: {
        login(){
            //从本地localStorage中加载数据
            let localuser = JSON.parse(localStorage.getItem('userinfo'))
            if(localuser != this.username){
                this.$axios.get('http://10.35.11.18:8080/Hotel/user/login',{
                    params:{
                        username:this.username,
                        password:this.password,
                    }
                }).then(result =>{
                    if(result.data.success == true){
                        this.$toast(result.data.message)
                        //将用户登录信息存储到localStorage中
                        localStorage.setItem('userinfo',JSON.stringify(result.data.userinfo))
                        this.$parent.loadUser();
                        //登录成功关闭当前登录界面
                        this.$parent.HideBar()
                    }else{
                        this.$toast(result.data.message)
                    }
                })
            }else{
                this.$toast("您已登录请勿重复登录！")
            }
            
        },
        ShowRegister(){
            this.$emit('ShowRegister');
        }
    },
    //生命周期钩子函数
    mounted() {

    },
}
</script>
<style lang="scss" scoped>
    .login{
        position: fixed;
        z-index: 103;
        width:300px;
        height:230px;
        top:50%;
        left:50%;
        margin:-150px 0 0 -150px;
        border-radius: 5%;
        form{
            width: 100%;
            height: 100%;
            border-radius: 5%;
            background-color:white;
            #submit-button{
                margin-top:3%;
                    :first-child{
                        margin-left:20%;
                    }
                    :last-child{
                         margin-left:25%;
                    }
            }
        }
        .mui-icon-person{
            width:50px;
            height:50px;
            border-radius: 50%;
            margin-top: 10px;
            margin-left: 40%;
            margin-right:40%;
            font-size: 45px;
        }
    }
</style>