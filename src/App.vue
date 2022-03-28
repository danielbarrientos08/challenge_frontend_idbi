<template>
  <navbar-component/>
  <router-view/>
</template>

<script>
  import NavbarComponent    from '@/components/NavbarComponent' 


  export default {
    name: 'AppView',
    components:{
      NavbarComponent
    },
    
  }
</script>
<style>

</style>
