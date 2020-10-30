<template>
  <div id="container">
    <common-header :headTitle=carryParams.stepTitle times="-1" ></common-header>
    <div class="content">
        <div class="summary">
           <div class="title">流程概述</div>
           <div class="describe">{{carryParams.summary}}</div>
           <div class="detailbtn" @click="todetail()"> 详情</div>
        </div>
        <div class="promoter">
           <div class="title">发起人</div>
           <div class="name">{{carryParams.sponsor}}</div>
        </div>
        <div class="promoter">
          <div class="title">发起时间</div>
          <div class="name">{{carryParams.startDate}} </div>
        </div>
        <div class="approval" >
          <div class="title">审批意见
              <img src="@/assets/edit.png" @click="toggleModal">
              <Modal v-show="showModal" v-on:closeme="closeme" @confirmme="confirmme"></Modal>

          </div>
          <div class="txt" v-if="msg">
            <textarea readonly>{{msg}}</textarea>
          </div>
          <div class="radio">
            <label><input type="radio" name="approval" v-model="approval" value="通过" />通过</label>
            <label><input type="radio" name="approval" v-model="approval" value="驳回" style="margin-left:40px;"/>驳回</label>
            <!--<p>{{approval}}</p>-->
          </div>
        </div>
        <div class="btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
  import scrapDetail from "./scrapDetail";
  import Modal from '@/components/Modal';
  import result from './result'
  import eventBus from '@/utils/eventBus.js'
    export default {
        data(){
          return {
            approval:'通过',
            showModal:false,
            msg:'',
            carryParams:{},
            url:'',
            isback:0
          }
        },
        name: "approval",
        components:{
          commonHeader,
          Modal
      },
      created(){
        // this.carryParams = this.$route.params;
        // console.log("created方法>>>")
        // this.url='/ThingX/Things/'+this.carryParams.workflowTemplate+'/Services/UserTaskCallback'
      },
      activated(){

        console.log("activated方法>>>")
        eventBus.$on('getback', function(data){
          console.log("getback接收到参数>>>"+data)
          this.isback=data;

        }.bind(this))

        console.log(this.isback)
        if(this.isback===1){

        }else{
          console.log("if  isback执行>>>>")
         //this.carryParams = this.$route.params;
          this.carryParams=this.$route.query;
         // alert(this.carryParams)
          this.url='/ThingX/Things/'+this.carryParams.workflowTemplate+'/Services/UserTaskCallback'
        }



      },
      mounted() {http://iot.bplead.com:8085/
          console.log("mounted方法>>>")
        // 自定义加载图标
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration:1000
        });
      },
      methods:{
        todetail(){
          let name='';
          switch (this.carryParams.workflowTemplate) {
            case 'reformRequest':   //生产改制
              name = "woReformDetail";
              break;
            case 'productionScrap':    //生产报废
              name = "woScrapDetail";
              break;
            case 'StockScrap':          //仓储报废
              name = "scrapDetail";
              break;
            case 'StockInventory':       //盘点
              name = "checkDetail";
              break;
          }

          this.$router.push({
            name:name,
            params:{
              objectID:this.carryParams.objectID,
              service:this.carryParams.service,
              resource:this.carryParams.resource
            }})
        },

        toggleModal:function(){
          this.showModal = !this.showModal;
        },
        closeme:function(){
          this.showModal = !this.showModal;
        },
        confirmme:function (msg) {
          console.log("confirmme方法>>>>msg >>"+msg)
          this.showModal=!this.showModal;
          console.log(msg)
          this.msg=msg;
        },
        // getback:function(isback){
        //   console.log("getback方法>>isback+"+isback)
        //   this.isback=isback;
        // },
        submit:function () {
         // alert(this.carryParams.instanceID+"   "+this.approval+"   "+this.msg+"   "+this.carryParams.stepID)
          this.$http({
            url: this.$http.adornUrl(this.url),
            method: 'post',
            data: this.$http.adornData({
              instanceId:this.carryParams.instanceID,
              route:this.approval,
              comment:this.msg,
              stepID:this.carryParams.stepID,
              userID:this.$cookie.get("userId")
            })
          }).then(({data}) => {
           // alert(data.result)
            if(data.rows[0].result=="ok"){
              //this.taskList=data.rows;
              this.$router.push({name:'result',params: {approval : this.approval }})
            }else{
              alert('此条审批任务已完成');
              this.$router.push({name:'task'})
            }

          }).catch(() =>{
            alert('此条审批任务已完成');
            this.$router.push({name:'task'})
          })
        }
      }
    }
</script>

<style scoped>
  .content{
    margin-top:66px;
  }

  .summary{
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius:5px;
  }
  .title{
    font-size: 15px;
    font-weight:bolder;
  }
  .name{
    font-size: 13px;
  }
  .describe{
    font-size:13px;
    margin: 5px 0px 5px 20px;
  }
  .detailbtn{
    color:#00A8FF;
    text-align: right;
    margin-right: 18px;
    font-size: 12px;
  }
  .promoter{
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius:5px;
    display: flex;
    justify-content: space-between;
  }
  .approval{
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius:5px;
  }
  .name{
    margin-right:18px;
  }

  .title img{
    margin-left:20px;
    position:relative;
    top:10px;
  }

  .radio{
    margin-top:50px;
    text-align: center;
  }

  .btn{

    background: #00A8FF;
    width:80%;
    text-align: center;
    margin:17px auto;
    border-radius:50px;
    height: 40px;
    line-height: 40px;
    color:#fff;
  }

  .txt{
    margin-top:10px;
    margin-left:10px;
  }

  textarea{
    width: 325px;
    height: 118px;
    margin-top: 20px;
  }


</style>
