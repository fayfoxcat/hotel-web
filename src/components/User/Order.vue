<template>
    <div class="order">
        <van-nav-bar class="header" left-arrow fixed title="所有订单" @click-left="onClickLeft"/>
        <div class="orderTab">
            <van-search v-model="name" placeholder="请输入搜索关键词" 
                        show-action shape="round" @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <table class="table table-bordered table-hover table-striped "> 
                <thead>
                    <tr class="success">
                        <th>订单号</th>
                        <th>创建时间</th>
                        <th>订单状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orderlist" :key="item.orderNo">
                        <td>{{item.orderNo}}</td>
                        <td>{{item.orderCreatetime}}</td>
                        <td>{{(item.orderStatus==1)?"完成":"取消"}}</td>
                        <!-- <td class="warning"><a href="" @click.prevent="del(item.orderNo)">删除</a></td> -->
                        <td class="warning"><a href="/Home/OrderDetails" @click.prevent="jump(item.orderNo)">查看详情</a></td>
                    </tr>
                </tbody>
            </table>
        </div>   
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',
            orderlist:[
                
            ],
        }
    },
    methods: {
        onClickLeft(){

        },
        onSearch(){
            
        },
        getList(){
            this.$axios.get('http://10.35.11.18:8080/Hotel/order/orderlist').then(result =>{
                if(result.data.success == true){
                    this.orderlist = result.data.orderlist;
                }else{
                    this.$toast(result.data.message);
                }
            })
        },
        jump(orderNo){
            this.$router.push({
                name:'OrderDetails',
                params:{
                    orderNo:orderNo,
                }
            })
        },
        del(orderNo){
            this.$axios.get('http://10.35.11.18:8080/Hotel/order/deleteorder',{
                params:{
                    orderNo:orderNo
                }
            }).then(result =>{
                if(result.data.success == true){
                    this.$toast(result.data.message);
                    this.getList()
                }else{
                    this.$toast(result.data.message);
                }
            })
        }

    },
    //生命周期钩子函数
    created() {

    },
    created(){
        this.getList();
    }
}
</script>
<style lang="scss" scoped>
    .order{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0%;
        left: 0%;
        z-index: 103;
        background-color: white;
        .header{
            background-color:white;
        }
        .orderTab{
            position: relative;
            top:50px;
            .van-search{
                height: 50px;
                .van-search__content{
                    height: 45px;
                }
            }
            table{
                font-size: 12px;
                tr{
                    text-align:center;
                    vertical-align:middle;
                }
            }
            
        }
    }
</style>