<template>
        <br>
        <br>
      
    <div class="container mt-5">
      <div class="row">
        <div class="  offset-md-4 col-md-4  offset-md-4 ">
          <div class="text-center">
              <h2>Grupos </h2>
          </div>
        </div>    
        <!-- <div class="col-md-4">
          
        </div>     -->
      </div>
      <div class="row ">

        <div  v-for=" group in listGroups"  class="col-md-3"  v-bind:key="group.id">
            <div  class="card my-4 " style="width: 18rem;" >
                <img src="https://desarrolloweb.com/storage/tag_images/actual/XLzFK4Nkfc15A4Qn6emJcyP6DvpvdbD46S2mLfbI.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{group.name}}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-muted">Miembros: {{group.group_users_count}}</li>
                    <li class="list-group-item text-muted">Notas: {{group.notes_count}}</li>
                </ul>
                <div class="card-body">
                    <div class="d-grid gap-1">
                        <template v-if="group.group_users.length >0 ">
                            <button type="submit" class="btn  btn-success mt-1">Ir al grupo</button>
                        </template>
                        <template v-else>
                           <button type="submit"  class="btn  btn-dark mt-1">Unirte al grupo</button>
                        </template>
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

    name: 'ListGroupView',
 
    data() {
        return {
            listGroups:[],
            form : {
                name: null,
              
            },
           
        }
    },
    computed: mapState(['username','api_token','token_type']),
    components:{
       
    },
    created() {
        this.getListGroups();
    },
    methods: {
        
        async getListGroups ()
        {     
           window.mitt.emit('loader', {'eventContent': true})

         
            let url = this.$uri+'/api/groups'
          
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.api_token}`;

            await this.axios.get( url )
           .then(response => {
                this.$notify({ type: "success", title:"Mensaje", text: "datos obtenidos" })
                console.log(response.data);
                this.listGroups = response.data.groups.data
                // this.$router.push('/')
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
