<template>
    <div class="container" style="text-align: center;">
      <common-header headTitle="审批确认" times="-2"></common-header>
        <div style="margin-top:120px">
           <img src="@/assets/pass.png" v-if="this.$route.params.approval==='通过'">
           <img src="@/assets/reject.png" v-else>
        </div>

        <div>
            {{this.$route.params.approval==='通过'?'审批通过':'审批驳回'}}
        </div>
    </div>
</template>

<script>
  import commonHeader from '@/components/header.vue'
    export default {
      name: "result",
      components:{
        commonHeader
      }
    }
</script>

<style scoped>

</style>
