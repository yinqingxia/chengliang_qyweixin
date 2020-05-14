<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#f3f3f3;margin:0')
    //document.querySelector('meta[http-equiv="Access-Control-Allow-Origin"]').setAttribute('content',"*");
    this.$cookie.set('userId','wx002')
    this.$cookie.set('appKey','03ff3fa4-f22a-448e-8bbc-acd13d5e8b26')

  },
  created(){
    // let meta=document.getElementsByTagName('meta')
    // meta.http-equiv="",
    var i = document.getElementsByTagName("meta");

    i[2]["content"] = "http://iot.bplead.com:8085";
    i[2]["http-equiv"] = "Access-Control-Allow-Origin";

  },
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
  metaInfo:{
    meta: [
      { 'http-equiv': 'Access-Control-Allow-Origin', content: 'http://iot.bplead.com:8085' }
    ]
  }
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
