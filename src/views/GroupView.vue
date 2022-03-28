<template>
      <br>
      <br>
    <div class="container mt-3">
      <div class="row">
            <div class="col-12">
                <div class="p-4 p-md-5 mb-4 text-white  rounded bg-dark">
                    <div class="col-md-6 px-0">
                    <h1 class="display-4 fst-italic">{{group.name}}</h1>
                    <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                    <button class="btn btn-lg btn-outline-success">Crear una nota</button>
                    </div>
                </div>
            </div>
         
        <!-- <div class="  offset-md-4 col-md-4  offset-md-4 ">
          <div class="text-center">
              <h2>Grupo </h2>
          </div>
        </div>     -->
        <!-- <div class="col-md-4">
          
        </div>     -->
      </div>
      <div class="row ">

        <div  v-for=" note in listNotes"  class="col-sm-12 col-md-12 mb-4"  v-bind:key="note.id">
            <div class="card">
                <div class="  bg-dark card-header">
                      <h5 class="card-title text-white"> {{ note.title }}</h5>
                </div>
                <div class="card-body">
                  
                    <p class="card-text">{{note.description}}</p>
                    
                    <h6> Imágenes adjuntas </h6>
                    <hr>  
                    <div class="row">
                        <div v-for=" img in note.images" class="col-xs-12  col-sm-4 col-md-3" v-bind:key="'img_'+img.id">
                            <img :src="img.url_img" class="img-fluid" alt="...">
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
</template>

<script>
    import mitt from 'mitt'
	window.mitt = window.mitt || new mitt()
    import { mapState } from 'vuex'
export default {

    name: 'GroupView',
 
    data() {
        return {
            listNotes:[],
            group: {},
            form : {
                name: null,
              
            },
           
        }
    },
    computed: mapState(['username','api_token','token_type']),
    components:{
       
    },
    created() {
      
    },
    mounted() {
          this.getGroup();
    },
    methods: {
        
        async getGroup ()
        {     
           window.mitt.emit('loader', {'eventContent': true})

            // console.log( this.$route)
            let group_id = this.$route.params.id;

            let url = this.$uri+'/api/groups/'+group_id+'/notes'
          
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.api_token}`;

            await this.axios.get( url )
           .then(response => {
              
                this.listNotes = response.data.notes.data
                this.group = response.data.group
                console.log(response.data)
                // this.$route.push('/')
            })
            .catch(error => {
                
                this.$notify({ type: "error", title:"Mensaje", text: "Sucedio un error, inténtelo otra vez" });
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
