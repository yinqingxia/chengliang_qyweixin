<template>
  <div id="container">
    <common-header headTitle="待确认借用"></common-header>
    <div class="content" v-if="taskList.length>0">
      <div class="list" v-for="item in taskList" @click="todetail(item)">
        <div class="title">{{item.warehouseName}}借用确认</div>
        <div class="line">
          <div class="time">{{item.borrowTime}}</div>
        </div>

      </div>
    </div>

    <div class="nodata" v-if="taskList.length==0">
      <img src="@/assets/no_data.png">
    </div>

  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
  export default {
    name: 'borrow',
    data(){
      return {
        taskList:[
        ]
      }
    },components:{
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

      if(this.$cookie.get('userId')){
        this.GetNotConfirmBorrowList()
      }


    },
    methods:{
      todetail(item){

        this.$router.push({name:'borrowDetail',params:{
            id:item.id,
            name:item.name,
            borrower:item.borrower,
            borrowTime:item.borrowTime,
            warehouseName:item.warehouseName
        }})
        console.log("携带参数跳转>>>"+item.id)
      },
      GetNotConfirmBorrowList (){
      //  alert(this.$cookie.get("userId"))
        this.$http({
          url: this.$http.adornUrl('/ThingX/Resources/BorrowListService/Services/GetNotConfirmBorrowList'),
          method: 'post',
          data: this.$http.adornData({
            'wechatId': this.$cookie.get("userId")
          })
        }).then(({data}) => {
          console.log(data.rows)
          if(data.rows.length>0){

          console.log(data.rows[0].Result)
          console.log(JSON.parse(data.rows[0].Result))
        //  console.log(JSON.parse(data.rows[0].Result)[0].borrowTime)

          this.taskList=JSON.parse(data.rows[0].Result)
          }

        })
      }


    }
  }
</script>

<style scoped>
  .content{
    margin-top:66px;
  }

  .list{
    margin: 10px 5px 0px 5px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
  }
  .title{
    font-size: 18px;
    font-weight: bolder;
  }
  .line{
    display: flex;
    margin-top:20px;
    justify-content: flex-end;
  }
  .nodata{
    text-align:center;
    margin-top:120px;
  }

  .nodata img{
     width:128px;
    height:128px;

  }
</style>
