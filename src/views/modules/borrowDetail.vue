<template>
  <div class="container">
    <common-header headTitle="借用确认" times="-1"></common-header>
    <div class="blank"></div>
    <div class="top">
       <div class="top_left">
          <div>单据编号</div>
          <div>仓库</div>
          <div>借用人</div>
          <div>借用日期</div>
       </div>

       <div class="top_right">
         <div>{{carryParms.name}}</div>
         <div>{{carryParms.warehouseName}}</div>
         <div>{{carryParms.borrower}}</div>
         <div>{{carryParms.borrowTime}}</div>
       </div>
    </div>

    <div class="bottom">
    <div class="line" v-for="item in borrowList" :key="item.id">
      <div class="bottom_left">
        <div>物料</div>
        <div>批次/序列号</div>
        <div>借用数量</div>

      </div>

      <div class="bottom_right">
        <div>{{item.wtpNumber}},{{item.wtpName}}</div>
        <div>{{item.lot}}</div>
        <div>{{item.borrowQty}}件</div>
      </div>

    </div>

    </div>

    <div class="btn">
      <div class="submit" @click="submit">确认</div>
    </div>

  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
  export default {
    name: 'borrowDetail',
    data(){
      return{
        borrowList:[
        ],
        carryParms:{},
        result:''
      }
    }, components:{
      commonHeader
    },
    mounted() {
      // 自定义加载图标
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration:1000
      });
    },
    created(){
      this.carryParms = this.$route.params;

      this.GetBorrowLinesByBorrowListId();

    },methods:{
      GetBorrowLinesByBorrowListId(){
        this.$http({
          url: this.$http.adornUrl('/ThingX/Resources/BorrowListService/Services/GetBorrowLinesByBorrowListId'),
          method: 'post',
          data: this.$http.adornData({
            'id': this.carryParms.id
          })
        }).then(({data}) => {

          console.log(JSON.parse(data.rows[0].Result)[0])

          this.borrowList=JSON.parse(data.rows[0].Result)

        })
      },submit(){

        this.$http({
          url: this.$http.adornUrl('/ThingX/Resources/BorrowListService/Services/ConfirmBorrowListById'),
          method: 'post',
          data: this.$http.adornData({
            'id': this.carryParms.id
          })
        }).then(({data}) => {

          console.log(JSON.parse(data.rows[0].Result)[0])

          this.result=JSON.parse(data.rows[0].Result)

          if(this.result){
            this.$router.push({name:'submitResult'})
          }else{
            console.log("提交失败")
          }



        })

      }
    }
  }
</script>

<style scoped>
  .container{
    background:#fff;
    height:600px;
    margin-top:58px;
  }

  .blank{
    height:10px;
    background-color:#f3f3f3;
  }

  .top{
    display:flex;

    height:100px;
    background: #fff;
    margin-top:10px;
    padding-left:42px;
    padding-top:20px;
  }

  .top_left{
    text-align: right;
    margin-right: 20px;
    font-size: 14px;
    font-weight:bolder;
    width:65px;
  }

  .line{
    display:flex;
    text-align:right;
    padding:10px 10px 10px 10px;
    background: #f3f3f3;
    margin-top:10px;
    border-radius: 10px;
  }

  .bottom{
    padding-left:10px;
    padding-right:10px;
  }

  .bottom_left{
    text-align: right;
    margin-right: 20px;
    font-size: 14px;
    font-weight: bolder;
    padding-left:10px;
    width:80px;
  }
  .bottom_right{
    text-align: left;
  }

  .btn{
    position: fixed;
    bottom: 22px;
    left:40px;
    line-height:24px;
  }

  .submit{
    width:300px;
    height:30px;
    border-radius:30px;
    background:#00A8FF;
    text-align:center;
    line-height: 30px;
    color:#fff;
    font-size:14px;
  }



</style>
