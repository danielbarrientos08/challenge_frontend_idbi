<template>
        <br>
        <br>
        <br>
        <br>
        <br>
    <div class="container mt-5">
      <div class="row">
        <div class="  offset-md-4 col-md-4  ">
          <div class="text-center">
              <h2>Iniciar sesión </h2>
          </div>
        </div>    
        <div class="col-md-4">
          
        </div>    
      </div>
      <div class="row ">
        <div class="col-4 offset-md-4">
            <form @submit.prevent="login">
                <div class="card p-4">
                    <div class="card-body">
                    
                        <div class="mb-3 text-start">
                            <label for="email" class="form-label ">Email</label>
                            <input type="email" v-model="form.email" class="form-control" id="email"  required placeholder="ejemplo@mail.com">
                        </div>
                        <div class="mb-3 text-start">
                            <label for="password" class="form-label ">Contraseña</label>
                            <input type="password" v-model="form.password" class="form-control" id="password" required placeholder="Ingrese su contraseña">
                        </div>
                    </div>
                    <div class="d-grid gap-2 mb-4">
                        <button type="submit" class="btn  btn-dark mt-3">Ingresar</button>
                    </div>   

                    <small class="text-muted">Si no tienes una cuenta registrate   <router-link to="/register">aquí</router-link>  </small> 
                </div>
            </form>
        </div>
      </div>
    </div>
</template>

<script>
    import mitt from 'mitt'
	window.mitt = window.mitt || new mitt()

export default {

    name: 'ModalView',
 
    data() {
        return {
           
            form : {
                email: null,
                password: null, 
            }
        }
    },
    components:{
       
    },
    methods: {

        async login ()
        {     
            // this.isLoading = true
           window.mitt.emit('loader', {'eventContent': true})

            let data = this.form
            let url = this.$uri+'/api/login'

            this.axios.post(url,data)
           .then(response => {
                this.$notify({ type: "success", title:"Mensaje", text: "¡¡ Bienvenido !!" })
                this.$store.dispatch('login', response.data)
                this.$router.push('/groups')
            })
            .catch(error => {
                
                this.$notify({ type: "error", title:"Mensaje", text: "Datos incorrectos, inténtelo otra vez" });
            })
            .finally(() => {
                 window.mitt.emit('loader', {'eventContent': false})
            })
        },
    },
}


</script>
