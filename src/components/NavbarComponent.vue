<template lang="">
    
    <notifications width="100%" />
    <loading v-model:active="isLoading"  :is-full-page="true" />
        <nav class="navbar navbar-expand-md navbar-light bg-white  fixed-top shadow-sm py-1  mb-5">
            <div  class="container">
                <a class="navbar-brand" href="#">
                    MI SITIO
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#"> <i class="la la-lg la-home"></i> Inicio</a>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                       
                            <li v-if="!username" class="nav-item">
                                <router-link class="nav-link" to="/register"> <i class="la la-lg la-sign-out"></i> Crear cuenta</router-link>
                            </li>
                    
                            <li v-else class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    <i class="la la-user"></i> {{ username }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#" @click="logout">
                                  
                                      Salir
                                    </a>
                                </div>
                            </li>
                    </ul>
                </div>
            </div>
        </nav>
      
    
</template>
<script>

    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css'
    import mitt from 'mitt'
	window.mitt = window.mitt || new mitt()
    
    import { mapState } from 'vuex'

    export default {
        name: 'HeaderComponent',
        created() {
           
        },
         mounted() {
               	window.mitt.on('loader', (evt) => {
                this.isLoading = evt.eventContent;
            })
        },    
        components:{
            Loading
        },
        computed: mapState(['username']),
        data() {
            return {
                  isLoading: false,
            }
        },
        methods: {
        logout(){
         
            this.$store.dispatch('logout',null)
            this.$route.push('/login')
        },
    },
    }
</script>
<style lang="">
    
</style>