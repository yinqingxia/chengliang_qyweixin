<template>
    <div id="container">
          <common-header headTitle="我的审批"></common-header>
          <div class="content" v-if="taskList.length>0">
              <div class="list" v-for="item in taskList" :key="taskList.id" @click="todetail(item)">
                 <div class="title">{{item.summary}}</div>
                 <div class="line">
                   <div class="name">发起人：{{item.sponsor}}</div>
                   <div class="time">{{item.startDate}}</div>
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
    import eventBus from '@/utils/eventBus.js'
    export default {
        name: "task",
        data(){
          return {
            code:'',
              taskList:[ ]
          }
        },
        mounted() {
          // 自定义加载图标
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration:500
          });

        },
      created(){
          if(this.$cookie.get('userId')){
            this.getCurrentUserTask();
          }else{

          }

      },
        components:{
          commonHeader
        },
        methods:{
          /*getUserId () {
            alert("task 页面 getUserId code"+this.$cookie.get('code'))
            this.$http({
              url: this.$http.adornUrl('/ThingX/Things/TX.Notice.QYWeiXinServer/Services/getUserID'),
              method: 'post',
              data: this.$http.adornData({
                'code': this.$cookie.get('code')
              })
            }).then(({data}) => {
              alert("响应")
              alert(data.rows.length+"--"+data.rows[0].userID)
              if(data.rows.length>0){
                alert("userId"+data.rows[0].userID)
                this.code=data.rows[0].userID;
                // 缓存在cookie
                this.$cookie.set('userId', data.rows[0].userID)

                this.getCurrentUserTask();
              }else{
                alert("认证失败，未获得企业微信用户ID")
              }


            })
          },*/
          todetail(item){

            // this.$router.push({name:'approval',params:{
            //     instanceID:item.instanceID,
            //     sponsor:item.sponsor,
            //     startDate:item.startDate,
            //     summary:item.summary,
            //     workflowTemplate:item.workflowTemplate,
            //     stepID:item.stepID,
            //     stepTitle:item.stepTitle
            //   }})


              this.$router.push({
                path:'/task/approval',
                query:{
                  instanceID:item.instanceID,
                  objectID:item.objectID,
                  sponsor:item.sponsor,
                  startDate:item.startDate,
                  summary:item.summary,
                  workflowTemplate:item.workflowTemplate,
                  stepID:item.stepID,
                  stepTitle:item.stepTitle,
                  resource:item.resource,
                  service:item.service
                }
              })

            eventBus.$emit('getback',0);
          },
          getCurrentUserTask(){
          //  alert("拿到userId"+this.$cookie.get("userId"))
            this.$http({
              url: this.$http.adornUrl('/ThingX/Resources/WorkTaskService/Services/getCurrentWorkTask'),
              method: 'post',
              data: this.$http.adornData({
                'wechatId': this.$cookie.get("userId")
              })
            }).then(({data}) => {
              console.log(data.rows)

              this.taskList=data.rows;
             // alert(this.taskList)

            }).catch(() =>{


            })

          }
        }
    }
</script>

<style scoped>
  .content{
    margin-top: 66px;
  }
  .list{
    margin: 10px 5px 0px 5px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
  }
  .title{
    font-size: 15px;
    font-weight: bolder;
  }
  .line{
    font-size:13px;
    display: flex;
    margin-top:20px;
    justify-content: space-between;
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
