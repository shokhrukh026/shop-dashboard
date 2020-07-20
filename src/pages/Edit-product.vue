<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-md">
           <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Edit Medicine</div>
                 <div class="text-subtitle2 text-white">Enter medicine details</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" dense v-model="medicine_add.title" label="Title" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="medicine_add.barcode" label="Barcode" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="medicine_add.country" label="country" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="medicine_add.manufacture" label="Manufacture" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="medicine_add.serial_code" label="Serial Code" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="medicine_add.capacity" label="Capacity" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" dense v-model="medicine_add.quantity" label="Quantity" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" dense v-model="medicine_add.vat" label="Vat" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" autogrow dense v-model="medicine_add.description" label="Description" />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" dense v-model="medicine_add.purchase_price" label="Purchase price" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" dense v-model="medicine_add.selling_price" label="Selling price" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" v-model="medicine_add.date" label="Expire date">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" mask="DD/MM/YYYY" today-btn v-model="medicine_add.date"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>


                     </q-item-section>
                   </q-item>
            


                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn class="text-capitalize bg-blue text-white">Edit medicine</q-btn>
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
          medicine_add: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '',
           quantity: '', vat: '', description: '', purchase_price: '', selling_price: '', date: ''}
      }
    },
    
}
</script>

<style scoped>

</style>