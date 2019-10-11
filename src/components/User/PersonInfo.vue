<template>
    <div class="person-info">
        <van-nav-bar class="header" left-arrow fixed title="用户中心" href="/Home"/>
        <div class="operator">
            <van-collapse v-model="activeNames">
                <van-collapse-item class="updateinfo" title="完善信息" name="1">
                    <div class="basicinfo">
                        <label for="">姓名</label><input type="text" v-model="userinfo.username"><br>
                        <label for="">年龄</label><input type="text" v-model="userinfo.age"><br>
                        <label for="">联系电话</label><input type="text" v-model="userinfo.phone"><br>
                        <label for="">邮箱</label><input type="text" v-model="userinfo.email"><br>
                    </div>
                    <div class="onsubmit">
                        <van-button class="bt" type="info" size="normal" @click="saveinfo">保存</van-button>
                    </div>
                </van-collapse-item>
                <van-collapse-item class="updatepassword" title="修改密码" name="2">
                    <div class="basicinfo">
                        <label for="">原密码</label><input type="text" v-model="oldPassword"><br>
                        <label for="">新密码</label><input type="text" v-model="newPassword"><br>
                        <label for="">验证码</label><input type="text" v-model="code"><br>
                    </div>
                    <div class="onsubmit">
                        <van-button class="bt" type="warning" size="normal" @click="alertPassword">修改密码</van-button>
                    </div>
                </van-collapse-item>
                <van-collapse-item title="销户" name="3">
                    
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: [],
            userinfo:{
                username:'',
                age:'',
                phone:'',
                email:'', 
            },
            oldPassword:'',
            newPassword:'',
            code:'',
        }
    },
    methods: {
        onClickLeft(){

        },
        getUserInfo(){
            this.$axios.get('http://10.35.11.18:8080/Hotel/user/queryuserinfo').then(result =>{
                if(result.data.success == true){
                    this.userinfo = result.data.userinfo
                }else{
                    this.$toast(result.data.message)
                }
            })
        },
        saveinfo(){
            this.$axios.get('http://10.35.11.18:8080/Hotel/user/alertuserinfo',{
                params:{
                    username:this.userinfo.username,
                    age:this.userinfo.age,
                    phone:this.userinfo.phone,
                    email:this.userinfo.email,
                }
            }).then(result =>{
                if(result.data.success == true){
                }else{
                    this.$toast(result.data.message)
                }
            })
        },
        alertPassword(){
            this.$axios.get('http://10.35.11.18:8080/Hotel/user/updatepassword',{
                params:{
                    oldPassword:this.oldPassword,
                    newPassword:this.newPassword,
                }
            }).then(result =>{
                if(result.data.success == true){
                    this.$toast(result.data.message)
                }else{
                    this.$toast(result.data.message)
                }
            })
        }
    },
    //生命周期钩子函数
    mounted() {
        this.getUserInfo();
    },
}
</script>
<style lang="scss" scoped>
    .person-info{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0%;
        left: 0%;
        z-index: 103;
        background-color: white;
        .header{
            background-color:white;
        }
        .operator{
            margin-top: 46px;
            .basicinfo{
                clear: both;
                margin: 0px 10px 0px 10px;
                label{
                    width: 20%;
                    font-size: 15px;
                }
                input{
                    margin-left:20px;
                    width: 70%;
                }
            }
            .onsubmit{
                .bt{
                    width: 200px;
                }
                text-align: center;
            }
        }
    }
</style>