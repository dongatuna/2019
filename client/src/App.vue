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
 mounted(){
    this.$store.dispatch("checkUserStatus")
  },

  components: {
    "pp-header": Header,
    "pp-footer": Footer
  }

 
}
</script>


