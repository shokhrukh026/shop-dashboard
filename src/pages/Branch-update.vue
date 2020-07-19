<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-md">
           <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Update Branch</div>
                 <div class="text-subtitle2 text-white">Complete your branch</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" dense v-model="branch_edit.user_name" label="Name" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="branch_edit.first_name" label="Address" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="branch_edit.email" label="Street" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="branch_edit.last_name" label="Contact Person" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="branch_edit.last_name" label="Contact Phone" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="branch_edit.city" label="City" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="branch_edit.post_code" label="Owner" />
                     </q-item-section>
                   </q-item>
                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn class="text-capitalize bg-blue text-white">Update Branch Info</q-btn>
               </q-card-actions>
             </q-card>
           </div>
        </div>
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
          branch_edit: {user_name: '', email: '', first_name: '', last_name: '', address: '', city: '', post_code: '', about: ''}
      }
    },
    
}
</script>

<style scoped>

</style>