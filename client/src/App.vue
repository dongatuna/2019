<template>
  <div id="app">
    <pp-header></pp-header>   
    <router-view/>
    <pp-footer></pp-footer>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import {store} from './store/store'

export default { 

  components: {
    "pp-header": Header,
    "pp-footer": Footer
  }, 

  mounted(){
    this.$store.dispatch("checkUserStatus")
  }
}
</script>


