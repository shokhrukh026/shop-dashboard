<template>
        <q-card>
               <q-card-section class="bg-blue row">
                 <div class="text-h6 text-white">Добавить продукт</div>
                 <q-space></q-space>
                 <q-btn icon="close" color="white" flat round dense v-close-popup />
               </q-card-section>
                      
          <q-card-section class="row">

            <q-list class="row col-8">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                      <q-input
                        label="Название"
                        outlined
                        dense
                        v-model="medicine_add_new.title"
                        color="blue"
                      >
                      </q-input>
                     </q-item-section>
                   </q-item>
                    
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                        <q-input
                        label="Штрих-код"
                        outlined
                        dense
                        v-model="medicine_add_new.barcode"
                        color="blue"
                      >
                      </q-input>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <div class="row justify-between">
                         <q-input  color="blue" outlined dense v-model="medicine_add_new.type" label="Тип" class="col-10"/>
                         <q-btn color="blue" label="" size="xs" icon="fas fa-plus" class="q-ml-sm col"/>
                       </div>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.country" label="Страна" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.manufacture" label="Производитель" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <div class="row justify-between">
                         <q-input  color="blue" outlined dense v-model="medicine_add_new.category_id" label="Категория" class="col-10"/>
                         <q-btn color="blue" label="" size="xs" icon="fas fa-plus" class="q-ml-sm col"/>
                       </div>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.vat" label="НДС" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" outlined autogrow dense v-model="medicine_add_new.description" label="Описание" />
                      </q-item-section>
                    </q-item>              
                 </q-list>


               <q-list class="col">
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.quantity" label="Кол-во" />
                     </q-item-section>
                   </q-item>
                  <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_add_new.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_add_new.expire_date" @input="() => $refs.qDateProxy.hide()"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                        <q-btn class="text-capitalize bg-blue text-white" @click="addNewMedicine">Добавить</q-btn>
                     </q-item-section>
                   </q-item>
                 </q-list>
             </q-card-section>
            </q-card>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data(){
        return {
            medicine_add_new: {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
            vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
        }
    },
    watch:{
      
    },
    computed:{
      ...mapGetters([]),
    },
    methods:{
       ...mapActions([
        'GET_SEARCH_RESULT_ALL_MEDICINES', 'GET_SEARCH_RESULT_ADD_MEDICINE', 'ADD_PRODUCT'
      ]),


      async addNewMedicine(){
        let answer = await this.ADD_PRODUCT(
          {
            title: this.medicine_add_new.title,
            barcode: this.medicine_add_new.barcode,
            type: this.medicine_add_new.type,
            country: this.medicine_add_new.country,
            manufacture: this.medicine_add_new.manufacture,
            category_id: this.medicine_add_new.category_id,
            quantity: this.medicine_add_new.quantity,
            vat: this.medicine_add_new.vat,
            description: this.medicine_add_new.description,
            purchase_price: this.medicine_add_new.purchase_price,
            selling_price: this.medicine_add_new.selling_price,
            expire_date: this.medicine_add_new.expire_date
          }
        )
        Object.assign(this.medicine_add_new, {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
              vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''});
        if(answer.status == 'SUCCESS'){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green'
          })
        }else{
          this.$q.notify({
            message: 'Ошибка!',
            color: 'negative'
          })
        }
      },
    }

}
</script>

<style scoped>

</style>