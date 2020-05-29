<template>
    <div class="header">
        <div class="back" @click="goback()">
            <img src="@/assets/back.png">
        </div>
        <div class="header-title">
            <span>{{headTitle}}</span>
        </div>
    </div>
</template>

<script>
  import eventBus from '@/utils/eventBus.js';
    export default {
        name: "commonHeader",
        data (){
            return {

            }
        },
        props:{
          headTitle:'',
          times:'',
          isback:'1'

        },methods:{
          goback(){
            console.log("goback>>>方法")
            eventBus.$emit('getback',1);
            this.$router.go(this.times)
            //this.$router.push({name:'approval'})
          }

      }
    }
</script>

<style scoped>
  .header{
    display:flex;
    justify-content: center;
    height:60px;
    align-items: center;
    background: #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .back{
    position: absolute;
    left:6px;
  }

  img{
    width:15px;
    height:15px;
  }


</style>
