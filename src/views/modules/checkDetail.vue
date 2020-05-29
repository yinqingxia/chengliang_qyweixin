<template>
  <div>
    <common-header headTitle="详情" times="-1"></common-header>
  <div class="container">

    <div class="title">
      <div class="title_cell">物料编号</div>
      <div class="title_cell">物料名称</div>
      <div class="title_cell">批次序列号</div>
      <div class="title_cell">理论数量</div>
      <div class="title_cell">实盘数量</div>
      <div class="title_cell">盘亏盘盈</div>
    </div>
    <div class="content">
      <div class="line" v-for="item in dataList" :key="item.id">
        <div class="title_cell">{{item.wtpartID}}</div>
        <div class="title_cell">{{item.wtpName}}</div>
        <div class="title_cell">{{item.lotName}}</div>
        <div class="title_cell">{{item.theoretialQty}}</div>
        <div class="title_cell">{{item.actualQty}}</div>
        <div class="title_cell">{{item.batch}}</div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
    export default {
        name: "checkDetail",
        data(){
          return{
            dataList:[
            ],
            objectID:'',
            resource:'',
            service:''
          }
        },
      mounted() {
        // 自定义加载图标
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration:1000
        });

        this.objectID=this.$route.params.objectID;
        this.resource=this.$route.params.resource;
        this.service=this.$route.params.service;

        this.GetStockInventoryLineById();
      },
      components:{
        commonHeader
      },
      methods:{
        GetStockInventoryLineById(){
          this.$http({
            url: this.$http.adornUrl('/ThingX/Resources/'+this.resource+'/Services/'+this.service+''),
            method: 'post',
            data: this.$http.adornData({
              'id': '66'
            })
          }).then(({data}) => {
            console.log(data.rows)
            if(data.rows.length>0){
              this.dataList=data.rows;
            }

          })
        }
      }
    }
</script>

<style scoped>
  .container{
    padding: 20px;
    width: 317px;
    overflow:auto;
    overflowx-x:scroll;
    background:#fff;
    margin-top:66px;
  }
  .title{
    display: flex;
    width:710px;
  }

  .content{
    width:710px;
  }

  .title_cell{
    width:116px;
    border:solid 1px;
    text-align:center;
    height:30px;
    line-height:30px;
  }

  .line{
    display:flex;
  }
</style>
