<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
          
        </div>
        {{getBranches}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
          
      }
    },
    async created(){
      await this.GET_BRANCHES();
      this.data = await this.getBranches;
    },
    computed:{
      ...mapGetters([
        'getBranches', 'getUser', 
      ])
    },
    methods: {
      ...mapActions([
        'GET_BRANCHES'
      ]),

    }
}
</script>

<style scoped>

</style>