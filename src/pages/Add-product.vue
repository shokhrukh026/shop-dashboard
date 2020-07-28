<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-sm">
           <div class="col-lg-7 col-md-7 col-xs-7 col-sm-12 q-mr-md q-mb-md">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Добавить лекарство</div>
                 <div class="text-subtitle2 text-white">Введите данные лекарства</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.title" label="Название" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.barcode" label="Штрих-код" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.country" label="Страна" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.manufacture" label="Производитель" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.serial_code" label="Серийный номер" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.capacity" label="Вместимость" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.vat" label="НДС" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" outlined autogrow dense v-model="medicine_add.description" label="Описание" />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_add.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_add.expire_date"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>

                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn>
               </q-card-actions>
             </q-card>
           </div>




          <div class="col-lg-4 col-md-4 col-xs-4 col-sm-12">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Добавить инфо для лекарства</div>
                 <div class="text-subtitle2 text-white">Введите данные лекарства</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="title" label="Название" />
                     </q-item-section>
                   </q-item>
                  
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_info_add.quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_info_add.purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_info_add.selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_info_add.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_info_add.expire_date"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>

                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn>
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
           quantity: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
          title: '',
          medicine_info_add: { quantity: '', purchase_price: '', selling_price: '', expire_date: ''},
      }
    },
    computed:{

    },
    methods:{
      ...mapActions([
        'ADD_MEDICINES', 'ADD_MEDICINE_INFO'
      ]),
      addMedicineInfo(){
        this.ADD_MEDICINE_INFO(
          {
            quantity: this.medicine_info_add.quantity,
            purchase_price: this.medicine_info_add.purchase_price,
            selling_price: this.medicine_info_add.selling_price,
            expire_date: this.medicine_info_add.expire_date,
          }
        )
      },
      addMedicine(){
        this.ADD_MEDICINES(
          {
            title: this.medicine_add.title,
            barcode: this.medicine_add.barcode,
            country: this.medicine_add.country,
            manufacture: this.medicine_add.manufacture,
            serial_code: this.medicine_add.serial_code,
            quantity: this.medicine_add.quantity,
            capacity: this.medicine_add.capacity,
            vat: this.medicine_add.vat,
            description: this.medicine_add.description,
            purchase_price: this.medicine_add.purchase_price,
            selling_price: this.medicine_add.selling_price,
            expire_date: this.medicine_add.expire_date,
          }
        )
      }
    }
    
}
</script>

<style scoped>
.m:hover{
  color: green;
}
</style>