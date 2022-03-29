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
              <h2>Crear cuenta </h2>
          </div>
        </div>    
        <div class="col-md-4">
          
        </div>    
      </div>
      <div class="row ">
        <div class="col-4 offset-md-4">
            <form @submit.prevent="register">
                <div class="card p-4">
                    <div class="card-body">
                    
                        <div class="mb-3 text-start">
                            <label for="email" class="form-label ">Nombre y Apellido</label>
                            <input type="text" v-model="form.name" class="form-control" id="name" maxlength="100"   required placeholder="nombre y apellido">
                             <small v-if="validationMessages.name != '' " v-text="validationMessages.name" class="text-danger"></small>
                        </div>
                        <div class="mb-3 text-start">
                            <label for="email" class="form-label ">Email</label>
                            <input type="text" v-model="form.email" class="form-control" id="email" maxlength="100" required placeholder="ejemplo@mail.com">
                             <small v-if="validationMessages.email != '' " v-text="validationMessages.email" class="text-danger"></small>
                        </div>
                        <div class="mb-3 text-start">
                            <label for="password" class="form-label ">Contraseña</label>
                            <input type="password" v-model="form.password" class="form-control" maxlength="50" id="password" required placeholder="ingrese su contraseña">
                             <small v-if="validationMessages.password != '' " v-text="validationMessages.password" class="text-danger"></small>
                        </div>
                        <div class="mb-3 text-start">
                            <label for="password" class="form-label ">Confirme contraseña</label>
                            <input type="password" v-model="form.confirm_password" class="form-control" maxlength="100" id="confirm_password" required placeholder="repita su contraseña">
                            <small v-if="validationMessages.confirm_password != '' " v-text="validationMessages.confirm_password" class="text-danger"></small>
                        </div>
                    </div>
                    <div class="d-grid gap-2 mb-4">
                        <button type="submit" class="btn  btn-dark mt-3">Crear</button>
                    </div>   

                    <small class="text-muted">Para iniciar sesión click <router-link to="/">aquí</router-link></small> 
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
                name: null,
                email: null,
                confirm_password: null,
                password: null, 
            },
            validationMessages: {
                name: null,
                email: null,
                confirm_password: null,
                password: null, 
            }
        }
    },
    components:{
       
    },
    methods: {

        async register ()
        {     
            // this.isLoading = true
           window.mitt.emit('loader', {'eventContent': true})

            let data = this.form
            let url = this.$uri+'/api/users/register'

            this.axios.post(url,data)
           .then(response => {
                this.$notify({ type: "success", title:"Mensaje", text: "Usuario registrado correctamente, ya puede iniciar sesión" })
                this.$router.push('/')
            })
            .catch(error => {
                
                if(error.response.status == 422){
                    let errors = error.response.data.errors
                 
                    this.setValidationMessages(errors);
                     this.$notify({ type: "warn", title:"Mensaje", text: "Error al llenar el formulário, verifique los datos." });
                }
                else{
                     this.$notify({ type: "error", title:"Mensaje", text: "Sucedio un error, inténtelo otra vez" });
                }
               
            })
            .finally(() => {
                 window.mitt.emit('loader', {'eventContent': false})
            })
        },

         setValidationMessages(errors)
        {
            // limpiar mensajes
            for( const index in this.validationMessages){
                this.validationMessages[index] = ''
            }
            //asignar nuevos mensajes
            for (const index in errors) {
                this.validationMessages[index] = errors[index][0]
            }
        },

        resetInputs()
        {
            //limpiar mensajes
            for( const index in this.validationMessages){
                this.validationMessages[index] = ''
            }

            this.input.title      = '',
            this.input.start_date = '',
            this.input.end_date   = ''
            
        }
    },

   
}


</script>
