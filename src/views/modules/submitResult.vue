<template>
  <div class="container" style="text-align: center;">
    <common-header headTitle="借用确认" times="-2"></common-header>
    <div class="img">
      <img src="@/assets/pass.png">

    </div>

    <div>
      已提交
    </div>
  </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
  export default {
    name: "result",
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
    }
  }
</script>

<style scoped>
  .img{
    margin-top:120px;
  }
</style>
