<template>
  <div>
    <common-header headTitle="详情" times="-1"></common-header>
    <div class="container">

      <div class="title">
        <div class="title_cell">货位</div>
        <div class="title_cell">物料编码</div>
        <div class="title_cell">物料名称</div>
        <div class="title_cell">规格</div>
        <div class="title_cell">型号</div>
        <div class="title_cell">批次号</div>
        <div class="title_cell">序列号</div>
        <div class="title_cell">报废数量</div>
        <div class="title_cell">单位</div>
      </div>
      <div class="content">
        <div class="line" v-for="item in dataList" :key="item.id">
          <div class="title_cell">{{item.locationName}}</div>
          <div class="title_cell">{{item.wlNumber}}</div>
          <div class="title_cell">{{item.wlName}}</div>
          <div class="title_cell">{{item.specification}}</div>
          <div class="title_cell">{{item.model}}</div>
          <div class="title_cell">{{item.batch}}</div>
          <div class="title_cell">{{item.serial}}</div>
          <div class="title_cell">{{item.quantity}}</div>
          <div class="title_cell">{{item.unit}}</div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import commonHeader from '@/components/header.vue'
    export default {
        name: "scrapDetail",
        data(){
          return{
            dataList:[

            ],
            objectID:'',
            resource:'',
            service:''
          }
        },
        components:{
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
        this.objectID=this.$route.params.objectID;
        this.resource=this.$route.params.resource;
        this.service=this.$route.params.service;



        this.GetStockScrapListById();
      },
      activated(){

      },
      methods:{
        GetStockScrapListById(){
          this.$http({
            url: this.$http.adornUrl('/ThingX/Resources/'+this.resource+ '/Services/'+ this.service+''),
            method: 'post',
            data: this.$http.adornData({
              'id':this.objectID
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
    width:317px;
    overflow:auto;
    overflowx-x:scroll;
    background:#fff;
    margin-top:66px;
  }
  .title{
    display: flex;
    width:1210px;
  }

  .content{
    width:1210px;
  }

  .title_cell{
    width:140px;
    border:solid 1px;
    text-align:center;
    height:30px;
    line-height:30px;
  }

  .line{
    display:flex;
  }

</style>
