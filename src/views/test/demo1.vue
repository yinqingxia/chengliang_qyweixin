<template>
  <div>
    <h3>获取企业用户userId</h3>
    <p>code：{{code}}</p>
    <p>userId：{{userId}}</p>
    <p><button v-on:click="getUserId()">获取userId</button></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'demo1',
      code: 'abc',
      userId: ''
    }
  },
  created () {
    // this.getCode()
  },
  methods: {
    // 网页授权认证，获取企业微信用户ID
    getUserId () {
      this.$http({
        url: this.$http.adornUrl('/ThingX/Resources/BorrowListService/Services/GetNotConfirmBorrowList'),
        method: 'post',
        data: this.$http.adornData({
          'wechatId': 'wx002'
        })
      }).then(({data}) => {
        console.log(data)
        // 缓存在cookie
        this.$cookie.set('userId', data.userId)
      })
    },
    getCode () {
      const code = this.getUrlParam('code')
      const local = window.location.href
      //const local='yqxfeier.vicp.io'
      const APPID = 'ww638e7382aac898d5'
      if (code == null || code === '') {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
      } else {
        this.code = code
        console.log(code)
        alert('code:' + code)
      }
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')

      var r = window.location.search.substr(1).match(reg)
      console.log(r)
      if (r != null) return unescape(r[2])

      return null
    }
  }
}
</script>

<style scoped>

</style>
