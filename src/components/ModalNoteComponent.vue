<template>
    <div class="modal" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

    
        <div class="modal-dialog modal-xl">
        <form @submit.prevent="register" id="myform">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Crear nota</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="mb-3 text-start">
                        <label for="email" class="form-label ">Titulo</label>
                        <input type="text" v-model="form.title" class="form-control" id="title" maxlength="100"    placeholder="nombre y apellido">
                        <small v-if="validationMessages.title != '' " v-text="validationMessages.title" class="text-danger"></small>
                    </div>
                    <div class="mb-3 text-start">
                        <label for="email" class="form-label ">Descripcion</label>
                        <textarea name="" id="textarea" class="form-control" v-model="form.description" cols="30"  rows="10"></textarea>
                        <small v-if="validationMessages.description != '' " v-text="validationMessages.description" class="text-danger"></small>
                    </div>
                    
                    <div class="mb-3 text-start">
                        <label for="password" class="form-label ">Imagenes <small>(opcional)</small></label>
                        <input type="file" class="form-control" id="uploadfiles" ref="uploadfiles" multiple  />
                        <small v-if="validationMessages.images != '' " v-text="validationMessages.images" class="text-danger"></small>
                    </div>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button  type="submit" class="btn btn-success">Crear nota</button>
                </div>
            </div>

        </form>
        </div>
    </div>    
</template>

<script>

   import mitt from 'mitt'
	window.mitt = window.mitt || new mitt()
    import { mapState } from 'vuex'

     
export default {

    name: 'ModalComponent',
 
    data() {
        return {
          
            form: {
                title: '',
                description: '',
                group_id:  this.$route.params.id,
                images:[]
            },
            validationMessages:{
                title: null,
                description: null,
                group_id: null,
                images:[]
            }
        }
    },
    computed: mapState(['username','api_token','token_type']),

    methods: {
        showModal(){
           
            var myModal = new bootstrap.Modal(document.getElementById('myModal'))
            myModal.toggle();
        },

         hideModal(){
             var myModal = new bootstrap.Modal(document.getElementById('myModal'))
            myModal.hide();
        },

       async register ()
        {     
            // this.isLoading = true
           window.mitt.emit('loader', {'eventContent': true})

            let data = this.form
            let url = this.$uri+'/api/notes/register'

            let formData = new FormData();
            
            var files = this.$refs.uploadfiles.files;
            var totalfiles = this.$refs.uploadfiles.files.length;

            for (var index = 0; index < totalfiles; index++) {
                formData.append("images[]", files[index]);
            }

            formData.append("title", this.form.title);
            formData.append("description", this.form.description);
            formData.append("group_id", this.form.group_id);

             this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.api_token}`;
             this.axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

            this.axios.post(url,formData)
           .then(response => {
                this.$notify({ type: "success", title:"Mensaje", text: "Nota registrada correctamente" })
               
                 window.mitt.emit('refreshGroup', {'eventContent': ''})
                this.resetInputs()
            })
            .catch(error => {
                console.log(error.response);
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
               var errorImg = errors[index][0].split(".");
       
                if(errorImg[0]=='El campo images'){
                     this.validationMessages['images'] = 'Todos los archivos adjuntos deben ser imágenes'
                }
                this.validationMessages[index] = errors[index][0]
            }
        },

        resetInputs()
        {
            //limpiar mensajes
            for( const index in this.validationMessages){
                this.validationMessages[index] = ''
            }
             document.getElementById('myform').reset();

             this.form.title = '';
             this.form.description = '';
              
            
        }
    },
}
</script>
    
