<template>
    <div class="register">
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
                <label>性别</label>
                <input type="text" class=" mui-input-clear" placeholder="请输入性别" v-model="sex">
            </div>
            <div class="mui-input-row">
                <label>年龄</label>
                <input type="text" class=" mui-input-clear" placeholder="请输入年龄" v-model="age">
            </div>
            <div class="mui-input-row">
                <label>邮箱</label>
                <input type="text" class=" mui-input-clear" placeholder="请输入邮箱" v-model="email">
            </div>
            <div class="" id="submit-button">
                <button type="button" class="mui-btn mui-btn-primary" @click="register">注册</button>
                <button type="button" class="mui-btn mui-btn-danger" @click="showlogin" >去登录</button>
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
            sex:'',
            age:'',
            email:'',
        }
    },
    methods: {
        register(){
            this.$axios.get('http://10.35.11.18:8080/Hotel/user/register',{
                params:{
                    username:this.username,
                    password:this.password,
                    sex:this.sex,
                    age:this.age,
                    email:this.email
                },
            }).then(result =>{
                if(result.data.success == 1){
                    this.$toast(result.data.message)
                    //注册成功跳转到登录界面
                    this.showlogin()
                }else if(result.data.success == 0){
                    this.$toast(result.data.message)
                }else{
                    this.$toast(result.data.message)
                }
            })
        },
        showlogin(){
            this.$emit('showlogin')
        },
    },
    //生命周期钩子函数
    mounted() {

    },
}
</script>
<style lang="scss" scoped>
    .register{
        position: fixed;
        z-index: 103;
        width:300px;
        height:310px;
        top:50%;
        left:50%;
        margin:-150px 0 0 -150px;
        border-radius: 5%;
        box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.25);
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