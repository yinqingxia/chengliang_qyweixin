<template>
  <div>
    <common-header headTitle="详情"times="-1"></common-header>
    <div class="container">
        <div class="left_side">
            <div class="left_side_left">
              <div class="line"><span>所属组织</span> <span></span> </div>
              <div class="line"><span>检验类型</span> <span></span> </div>
              <div class="line"><span>工单</span> <span></span> </div>
              <div class="line"><span>物料</span> <span></span> </div>
              <div class="line"><span>检验员</span> <span></span> </div>
              <div class="line"><span>报废数量</span> <span></span> </div>
              <div class="line"><span>报废原因</span> <span></span> </div>
            </div>
            <div class="left_side_right">
              <div class="line1"><span>{{woScrapDetail.organizationName}}</span> <span></span> </div>
              <div class="line1"><span>{{woScrapDetail.inspectionTypeCH}}</span> <span></span> </div>
              <div class="line1"><span>{{woScrapDetail.workOrderNumber}}</span> <span></span> </div>
              <div class="line1"><span>{{woScrapDetail.partName}}</span> <span></span> </div>
              <div class="line1"><span>{{woScrapDetail.inspectorName}}</span> <span></span> </div>
              <div class="line1"><span>{{woScrapDetail.scrapQty}}</span> <span></span> </div>
              <div class="line1"><span>{{woScrapDetail.scrapReason}}</span> <span></span> </div>
            </div>
        </div>

        <div class="right_side">
          <div class="right_side_left">
            <div class="line"><span>检验单号</span> <span></span> </div>
            <div class="line"><span>工序</span> <span></span> </div>
            <div class="line"><span>计量单位</span> <span></span> </div>
            <div class="line"><span>工人</span> <span></span> </div>
          </div>
          <div class="right_side_right">
            <div class="line1"><span>{{woScrapDetail.inspectionOrderNO}}</span> <span></span> </div>
            <div class="line1"><span>{{woScrapDetail.procedure}}</span> <span></span> </div>
            <div class="line1"><span>{{woScrapDetail.unit}}</span> <span></span> </div>
            <div class="line1"><span>{{woScrapDetail.worker}}</span> <span></span> </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
    export default {
      name: "woScrapDetail",
      data(){
        return {
          woScrapDetail:{},
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
          loadingType: 'spinner'

        });
        this.objectID=this.$route.params.objectID;
        this.resource=this.$route.params.resource;
        this.service=this.$route.params.service;

        this.GetProductionScrapVOByID();
      },
      components:{
        commonHeader
      },
      methods:{
        GetProductionScrapVOByID(){
          this.$http({
            url: this.$http.adornUrl('/ThingX/Resources/'+this.resource+'/Services/'+this.service+''),
            method: 'post',
            data: this.$http.adornData({
              'id': this.objectID
            })
          }).then(({data}) => {
            console.log(data.rows)
            if(data.rows.length>0){
              this.woScrapDetail=data.rows[0];
            }

          })
        }
      }

    }
</script>

<style scoped>
    .container{
      display:flex;
      justify-content: space-between;
      padding: 10px;
      background: #fff;
      margin-top:66px;
    }
    .line{
      font-size:14px;
      font-weight:bolder;
      margin-top:10px;
      width:66px;
      height:35px;
      text-align: right;
    }
    .line1{
      font-size:14px;
      font-weight:normal;
      margin-top:10px;
      width:116px;
      height:35px;
    }
    .left_side{
      width:55%;
      display:flex;
      justify-content: space-between;
    }
    .left_side_left{
      width:99px;

    }

    .right_side{
      width:45%;
      display:flex;
      justify-content: space-between;
      margin-left: 5px;
    }

    .left_side_right{
      margin-left: 8px;
    }

    .right_side_right{
      margin-left:8px;
    }

</style>
