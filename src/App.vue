<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
     <keep-alive >
        <router-view v-if="$route.meta.keepAlive"/>
     </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>


  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'demo1',
      code: 'abc',
      userId: ''
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#f3f3f3;margin:0')
    //document.querySelector('meta[http-equiv="Access-Control-Allow-Origin"]').setAttribute('content',"*");

    this.$cookie.set('appKey','ace6044a-ffea-4cbe-9431-7ddb882c69f0')
   // this.$cookie.set('appKey','03ff3fa4-f22a-448e-8bbc-acd13d5e8b26')
    console.log("APP.vue执行>>>")
  },
  created(){
    // let meta=document.getElementsByTagName('meta')
    // meta.http-equiv="",
    // var i = document.getElementsByTagName("meta");
    //
    // i[2]["content"] = "http://iot.bplead.com:8085";
    // i[2]["http-equiv"] = "Access-Control-Allow-Origin";

    this.getCode();
  },
  methods: {
    // 网页授权认证，获取企业微信用户ID
    getUserId () {
      //alert("getUserId code"+this.code)
      this.$http({
        url: this.$http.adornUrl('/ThingX/Things/TX.Notice.QYWeiXinServer/Services/getUserID'),
        method: 'post',
        data: this.$http.adornData({
          'code': this.code
        })
      }).then(({data}) => {
      //  alert("响应")
      //  alert(data.rows.length+"--"+data.rows[0].userID)
        if(data.rows.length>0){
       //   alert("userId"+data.rows[0].userID)
          // 缓存在cookie
          this.$cookie.set('userId', data.rows[0].userID)
        }else{
          alert("认证失败，未获得企业微信用户ID")
        }


      })
    },
    getCode () {
      const code = this.getUrlParam('code')
      const local = window.location.href
      //const local='yqxfeier.vicp.io'
      //iot
      //const APPID = 'ww638e7382aac898d5'
      //配置版
      let APPID=window.SITE_CONFIG.APPID
      if (code == null || code === '') {
    //    alert(window.location.href)
    //    alert(APPID)
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
      } else {
        this.code = code
        this.$cookie.set("code",code)
     //   alert("code"+code)
        console.log("code"+code)
        this.getUserId();
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
  // metaInfo(){
  //   return {
  //
  //     meta: [
  //       {
  //         name:"keywords",
  //         content: this.keywords
  //       },{
  //         name:"description",
  //         content: this.description
  //       }
  //     ]
  //   }
  // },
  // metaInfo:{
  //   meta: [
  //     { 'http-equiv': 'Access-Control-Allow-Origin', content: 'http://iot.bplead.com:8085' }
  //   ]
  // }
}
</script>

<style>
#app {
  background:#f3f3f3;
  padding:0;
  margin:0
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
