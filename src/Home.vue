<template>
    <div class="home">
        <!-- 导航栏 -->
        <div class="title">
            <van-nav-bar class="header" fixed title="枫林晚酒店" />
        </div>
        <div class="main">
            <!-- 轮播图展示区 -->
            <div class="ShiftImg">
                <van-swipe :autoplay="3000" class="swipe" :height="250">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <img v-lazy="require(`${image}`)">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 房间类型展示区 -->
            <div class="container" v-for="item in roomlist" :key="item.roomCategoryid">
                <div class="card">
                    <div class="card-header bg-info text-white">
                        <button type="button" class="category btn">{{item.roomCategory}}</button>
                        <button type="button" class="book btn btn-success" @click="ShowBook(item.roomCategoryid)">预定</button>
                    </div>
                    <div class="card-body">
                        <img :src="require(`${item.roomImg}`)">
                    </div> 
                    <div class="card-footer">
                        <span class="price">价格:￥{{item.roomPrice/100}}</span>
                        <span class="count">剩余间数:{{item.roomCount}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 提交订单 -->
        <div class="bookinfo">
            <van-popup class="popup" v-model="ifShowbook" round closeable position="bottom">
                <div class="roomshow">
                    <span class="imgshow">
                        <img src="https://img.yzcdn.cn/vant/t-thirt.jpg" alt="">
                        <!-- <img :src="require(`${room.roomImg}`)" alt=""> -->
                       
                    </span>
                    <span class="roominfo">
                        <div>{{room.roomCategory}}</div>
                        <div class="details">{{room.roomDesc}}</div>
                        <div class="count">剩余房间数{{room.roomCount}}</div>
                        <div class="price1">￥{{room.roomPrice/100.0}}</div>
                    </span>
                </div>
                <div class="userinfo">
                    <div class="liveCount">入住人数</div>
                    <div class="button">
                        <button class="one" ref="one" @click="one">1</button>
                        <button class="two" ref="two" @click="two">2</button>
                        <button class="three" ref="three" @click="three">3</button>
                    </div>
                    <van-divider />
                    <div class="liveCount">信息录入</div>
                    <div class="basicinfo">
                        <label for="">姓名</label><input type="text" v-model="form.name"><br>
                        <label for="">省份证号</label><input type="text" v-model="form.phone"><br>
                        <label for="">联系电话</label><input type="text" v-model="form.idcard"><br>
                        <label for="">备注</label><input type="text" v-model="form.other"><br>
                        <label for="">入住时间</label><input type="datetime-local" v-model="form.beginTime"><br>
                        <label for="">离店时间</label><input type="datetime-local" v-model="form.endTime"><br>
                    </div>
                </div>
                <van-submit-bar :price="form.payprice" button-text="提交订单" @submit="onSubmit" >
                    <span slot="tip">请确认您填写的信息准确无误，否则可能造成无法正常入住</span>
                </van-submit-bar>
            </van-popup>
        </div>
        <!-- 右侧栏 ( 我的 )-->
        <van-popup class="UserBar" v-model="ShowUser" position="right">
            <van-cell-group class="user">
                <van-cell size="large" class="info-header" >
                    <van-icon name="flag-o" size="50px" class="img" />
                    <label>枫林晚</label>
                    <label>枫林晚让旅行有了更多可能</label>
                </van-cell >
                <van-cell size="large" class="user-operation">
                    <van-icon name="user-circle-o" class="img"/>
                    <div class="username">
                        <label @click="showlogin" v-text="userinfo.username"></label>&nbsp;
                        <label v-text="labelone"></label>&nbsp;
                        <label v-text="labeltwo" @click="ShowRegister"></label>
                    </div>
                </van-cell >
                <van-cell size="large" class="person-info">
                    <van-icon name="star-o" class="img"/>
                    <label><a href="/Home/PersonInfo">个人中心</a></label>
                </van-cell >
                <van-cell size="large" class="person-order">
                    <van-icon name="cart-o" class="img"/>
                    <label><a href="/Home/Order">我的订单</a></label>
                </van-cell>
                <van-cell size="large" class="exit">
                    <van-icon name="info-o" class="img"/>
                    <label>关于我们</label>
                </van-cell>
                <van-cell size="large" @click="Logout" class="exit">
                    <van-icon name="arrow-left" class="img"/>
                    <label>注销</label>
                </van-cell>
            </van-cell-group>
        </van-popup>
        <!-- 菜单 -->
        <menu-bar @ShowUserBar="ShowUserBar"></menu-bar>
        <!-- 注册登/录 -->
        <login @ShowRegister="ShowRegister" v-if="ifShowlogin"> </login>
        <register @showlogin="showlogin" v-if="ifShowregister"> </register>
        <!-- 蒙版 -->
        <div class="mask" @click="HideBar" v-if="ifmask"></div>
        <!-- Order组件路由占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
import MenuBar from "@/components/MenuBar"
import login from "@/components/LoginAndReg/Login"
import register from "@/components/LoginAndReg/Register"
export default {
    
    data() {
        return {
            ifShow:false,
            ifShowlogin:false,
            ifShowregister:false,
            ifmask:false,
            ifShowbook:false,
            images:[

            ],
            roomlist:[
            
            ],
            room:{
                roomImg:'',

                roomCategory:'',
                roomDesc:'',
                roomCount:'',
                roomPrice:0,

                // user_name:'',
                // user_idcard:'',
                // phone:'',
                // oder_other:'',
                // userCome:'',
                // userLeave:'',

                // order_price:'',
            },
            //订单信息
            form:{
                roomCategoryid:'',
                name:'',
                phone:'',
                idcard:'',
                other:'',
                beginTime:'',
                endTime:'',
                
                person:1,
                payprice:0,
            },
            userinfo:{   
                userId:'',
                username:'登录',
                password:'',
                sex:'',
                age:'',
                usertype:'',
                phone:'',
                email:'',
            },
            ShowUser:false,
            labelone:'|',
            labeltwo:'注册'

        }
    },
    components:{
        MenuBar,
        login,
        register,
    },
    methods: {
        ShowUserBar(){
            this.ShowUser = true;
            this.loadUser()
        },
        ShowBook(id){
            this.form.roomCategoryid = id;
            this.ifShowbook = true;
            setTimeout(() =>{
                this.$axios.get("http://10.35.11.18:8080/Hotel/room/roomdetailsshow",{
                    params:{
                        roomCategoryId:id
                    }
                })
                .then(result =>{
                    if(result.data.success){
                        this.room = result.data.room
                    }else{
                        this.$toast(result.data.message)
                    }
                })
            },0) 
        },
        showlogin(){
            this.ifShowlogin = true;
            this.ifShowregister = false;
            this.ifmask = true;
            this.ShowUser = false;
        },
        ShowRegister(){
            this.ifShowregister = true;
            this.ifmask = true;
            this.ifShowlogin = false;
            this.ShowUser = false;
        },
        HideBar(){
            this.ifShowlogin = false;
            this.ifShowregister = false;
            this.ifmask = false;
            this.ifShowbook = false;
        },
        //入住人数one、two、three
        one(){
            this.form.person = 1;
            this.$refs.one.style.backgroundColor = "#fc7575";
            this.$refs.two.style.backgroundColor = "#ffffff";
            this.$refs.three.style.backgroundColor = "#ffffff";
        },
        two(){
            this.form.person = 2;
            this.$refs.one.style.backgroundColor = "#ffffff";
            this.$refs.two.style.backgroundColor = "#fc7575";
            this.$refs.three.style.backgroundColor = "#ffffff";
        },
        three(){
            this.form.person = 3;
            this.$refs.one.style.backgroundColor = "#ffffff";
            this.$refs.two.style.backgroundColor = "#ffffff";
            this.$refs.three.style.backgroundColor = "#fc7575";
        },
        //登录信息绑定
        loadUser(){
            //从本地localStorage中加载数据
            if(localStorage.getItem("userinfo") != null){
                this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
                this.labelone=''
                this.labeltwo=''
            }
        },
        //注销
        Logout(){
            //删除localStorage数据
            localStorage.removeItem("userinfo")
            this.$axios('http://10.35.11.18:8080/Hotel/user/exit').then(result =>{
                if(result.data.success = true){
                    this.$toast(result.data.message)
                    this.userinfo.username='登录'
                    this.labelone='|'
                    this.labeltwo='注册'
                }else{
                    this.$toast(result.data.message)
                }
            })
        },
        //计算支付总金额
        pay(){
            if(Object.keys(this.form.beginTime).length!=0){
                if(Object.keys(this.form.endTime).length!=0){
                    let day = this.difference()
                    this.form.payprice = this.room.roomPrice * this.form.person * day;
                }
                else{
                    this.$toast("请输入离开日期")
                    this.form.payprice = 0; 
                }
            }else{
                this.$toast("请输入入住日期")
                this.form.payprice = 0;
            }
        },
        //时间差
        difference() {
            var dateBegin = new Date(this.form.beginTime);
            var dateEnd = new Date(this.form.endTime);
            var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
            var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            var leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));//计算出小时数
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000);   //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
            //计算相差秒数
            var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            if(hours>1){
                dayDiff++;
            }
            return dayDiff;
        },
        //订单提交
        onSubmit(){
            this.pay()
            this.$axios.get("http://10.35.11.18:8080/Hotel/order/generateorder",{
                params:{
                    UserName:this.form.name,
                    phone:this.form.phone,
                    orderIdCard:this.form.idcard,
                    orderOther:this.form.other,
                    liveTime:this.form.beginTime,
                    leaveTime:this.form.endTime,
                    personCount:this.form.person,
                    orderPrice:this.form.payprice,
                    roomCategoryId:this.form.roomCategoryid,
                }
            }).then(result =>{
                if(result.data.success){
                    this.$toast(result.data.message)
                    this.HideBar()
                }else{
                    this.$toast(result.data.message)
                }
            })
        },
        //房间列表获取
        getList(){
            this.$axios({
                method:'GET',
                url:'http://10.35.11.18:8080/Hotel/room/roomshow'
            }).then(result =>{
                if(result.data.success){
                    this.roomlist =  result.data.roomlist;
                }else{
                    this.$toast(result.data.message)
                }
            })
            /* .then(result =>{
                this.roomlist.forEach((item) => {
                    return{
                        roomImg:require(`${item.roomImg}`)
                    }
                });
            }) */
        },
        shiftimg(){
            this.$axios({
                method:'GET',
                url:'http://10.35.11.18:8080/Hotel/room/shiftimg'
            }).then(result =>{
                if(result.data.success){
                    this.images = result.data.imglist;
                }else{
                    this.$toast(result.data.message)
                }
            })
        }

    },
    //生命周期钩子函数
    mounted() {
        this.getList();
        this.shiftimg();
    },
}
</script>
<style lang="scss" scoped>
    .home{
        overflow: hidden;
        position: absolute;
        z-index: 100;
        left:0%;
        right:0%;
        .mask{
            position: absolute;
            z-index: 102;
            top: 0;
            right: 0;
            display:flex;
            width:100%;
            height: 500%;
            background-color:rgb(0, 0, 0);
            opacity: 0.70;
        }
        .title{
            margin-bottom: 52px;
            .header{
                background-color:rgb(223, 223, 223);
                height: 52px;
            }
        }
        .main{
            margin-bottom: 30px;
            .ShiftImg{
                img{ 
                    width: 100%;
                    height: 100%;
                }
            }
            .container{
                padding: 0%;
                margin-top:10px;
                .card{
                    width: 100%;
                    margin-bottom: 5px;
                    .card-header{
                        padding-top: 2%;
                        padding-bottom: 2%;
                        .category{
                            float: left;
                        }
                        .book{
                            float:right;
                            a{
                                color:white;
                                text-decoration: none;
                            }
                        }
                        button{
                            display:inline;
                        }
                    }
                    .card-body img{
                        width: 100%;
                        margin: 0%;
                    }
                    .card-footer{
                        .price{
                            float: left;
                            color: #9c5a04;
                        }
                        .count{
                            float:right;
                        }
                    }
                }
            }
        }
        .UserBar{
            width:60%;
            height: 100%;
            background:white;
            .user{
                .info-header{
                    .img{
                        color: rgb(48, 141, 95);
                    }
                    label{
                        margin-left: 5px;
                        font-size: 15px;
                        font-weight: 600;
                        font-style: italic;
                        color:rgb(48, 141, 95);
                    }
                }
                .user-operation{
                    label{
                        margin-top: 8px;
                        margin-left: 30px;
                        font-size: 17px;
                        font-weight: 600;
                        color: #428eff;
                    }
                }
                .person-info{
                    label{
                        padding-top: 8px;
                        padding-left: 15px;
                        font-size: 17px;
                        font-weight: 600;
                        color: #428eff;
                    }
                }
                .person-order{
                    label{
                        padding-top: 8px;
                        padding-left: 15px;
                        font-size: 17px;
                        font-weight: 600;
                        color: #428eff;
                    }
                }
                .exit{
                    label{
                        margin-top: 8px;
                        margin-left: 15px;
                        font-size: 17px;
                        font-weight: 600;
                        color: #428eff;
                    }
                }
                .img{
                    margin-top: 4px;
                    color: #0043a7;
                    font-size: 30px;
                    float: left;
                }
            }
            
        }
        .bookinfo{
            .popup{ 
                height:70%; 
                .roomshow{
                    background-color:#fafafa ;
                    position: fixed;
                    z-index: 105;
                    border-top-right-radius: 10%;
                    border-top-left-radius: 10%;
                    width: 100%;
                    padding: 15px;
                    .imgshow{
                        float: left;
                        img{
                            padding: 5%;
                            width: 100px;
                            height: 100px;
                        }
                    }
                    .roominfo{
                        .details{
                            font-size: 10px;
                        }
                        .count{
                            font-size: 10px;
                        }
                        .price1{
                            color: red;
                            font-size: 10px;
                        }
                    }
                }
                .userinfo{
                    margin-top: 135px;
                    margin-bottom: 85px;
                    .liveCount{
                        font-size: 15px;
                        margin: 10px;
                    }
                    .button{
                        padding-left: 20px;
                        button{
                            margin-right: 25px;
                            width: 35px;
                            height: 35px;
                            border-radius: 5px;
                        }
                    }
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
                }
            }
        }

    }
</style>