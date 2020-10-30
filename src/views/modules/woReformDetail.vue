<template>
  <div>
    <common-header headTitle="详情" times="-1"></common-header>
  <div class="container">
    <div class="left_side">
      <div class="left_side_left">
        <div class="line"><span>所属组织</span> <span></span> </div>
        <div class="line"><span>检验类型</span> <span></span> </div>
        <div class="line"><span>工单</span> <span></span> </div>
        <div class="line"><span>物料编码</span> <span></span> </div>
        <div class="line"><span>改制物料编码</span> <span></span> </div>
        <div class="line"><span>BOM</span> <span></span> </div>
        <div class="line"><span>改制数量</span> <span></span> </div>
        <div class="line"><span>开始工序</span> <span></span> </div>
        <div class="line"><span>改制原因</span> <span></span> </div>
      </div>
      <div class="right_side_left">
        <div class="line1"><span>{{reformDetail.organization}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.inspectionType}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.workorderNumber}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.wtpartName}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.reformWTPartNumber}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.bomNumber}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.reformQty}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.startprocedure}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.reformReason}}</span> <span></span> </div>
      </div>
    </div>

    <div class="right_side">
      <div class="right_side_left">
        <div class="line"><span>检验单号</span> <span></span> </div>
        <div class="line"><span>检验员</span> <span></span> </div>
        <div class="line"><span>工序</span> <span></span> </div>
        <div class="line"><span>物料名称</span> <span></span> </div>
        <div class="line"><span>改制物料名称</span> <span></span> </div>
        <div class="line"><span>工艺</span> <span></span> </div>
        <div class="line"><span>计量单位</span> <span></span> </div>
      </div>
      <div class="right_side_right">
        <div class="line1"><span>{{reformDetail.inspectionNumber}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.inspector}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.startprocedure}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.wtpartName}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.reformWTPartName}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.process}}</span> <span></span> </div>
        <div class="line1"><span>{{reformDetail.unit}}</span> <span></span> </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
    export default {
      name: "woReformDetail",
      data(){
        return{
          reformDetail:'',
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
        // alert(this.objectID)
        // alert(this.resource)
        // alert(this.service)
        this.GetReformRequestsbyID();
      },
      methods:{

        GetReformRequestsbyID(){
          this.$http({
            url: this.$http.adornUrl('/ThingX/Resources/'+this.resource+'/Services/'+this.service+''),
            method: 'post',
            data: this.$http.adornData({
              'reformRequestID': this.objectID
            })
          }).then(({data}) => {
            console.log(data.rows)
            // alert("详情长度"+data.rows.length)
            if(data.rows.length>0){
                  this.reformDetail=data.rows[0]
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
    padding: 15px;
    margin-top:66px;
  }
  .line{
    font-size:14px;
    font-weight:bolder;
    margin-top:10px;
    height:28px;
  }
  .line1{
    font-size:12px;
    font-weight:normal;
    margin-top:10px;
    height:28px;
  }
  .left_side{
    width:60%;
    display:flex;
    justify-content: space-between;
  }
  .right_side{
    width:50%;
    display:flex;
    justify-content: space-between;
    margin-left: 20px;
  }
  .right_side_left{
    width:100px;

  }
</style>
