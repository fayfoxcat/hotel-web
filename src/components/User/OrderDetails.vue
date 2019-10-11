<template>
    <div class="details">
        <van-nav-bar class="header" left-arrow fixed title="用户订单详情" @click-left="onClickLeft"/>
        <div class="orderdetails">
            <van-cell title="订单号" icon="records" size="large" class="largefont">{{order.orderNo}}</van-cell>
            <van-cell title="姓名" icon="manager-o" size="large" class="largefont">{{order.userName}}</van-cell>
            <van-cell title="省份证号" icon="idcard" size="large" class="largefont">{{order.orderIdCard}}</van-cell>
            <van-cell title="联系方式" icon="phone-o" size="large" class="largefont">{{order.phone}}</van-cell>
            <van-cell title="房间号" icon="wap-home-o" size="large" class="largefont">{{order.roomNo}}</van-cell>
            <van-cell title="订单状态" icon="passed" size="large" class="largefont">{{(order.orderStatus==1)?"进行中":"取消"}}</van-cell>
            <van-cell title="待支付金额" icon="gold-coin-o" size="large" class="largefont">{{order.orderPrice}}</van-cell>
            <van-cell title="预约日期" icon="underway-o" size="large" class="largefont">{{order.liveTime}}</van-cell>
        </div>
        <div class="buttonposition">
            <van-button round type="primary" to="/Home/Order">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                返回
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            order:{
                orderNo:'',
                userName:'',
                orderIdCard:'',
                phone:'',
                roomNo:'',
                orderStatus:'',
                orderPrice:'',
                liveTime:'',
            },

        }
    },
    methods: {
        onClickLeft(){

        },
        getOrder(){
            this.$axios.get('http://10.35.11.18:8080/Hotel/order/orderdetails',{
                params:{
                    orderNo:this.$route.params.orderNo,
                },
            }).then(result =>{
                if(result.data.success == true){
                    this.order = result.data.order;
                }else{
                    this.$toast(result.data.message);
                }
            })
        }
    },
    //生命周期钩子函数
    created() {
        this.getOrder();
    },
}
</script>
<style lang="scss" scoped>
    .details{
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
        .orderdetails{
            margin-top: 50px;
        }
        .buttonposition{
            text-align:center;
            margin-top: 10px;
        }
    }
</style>