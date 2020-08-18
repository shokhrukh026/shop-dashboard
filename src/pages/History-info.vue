<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <q-expansion-item expand-separator icon="info" default-opened   header-class="bg-blue text-h6" dark :label="'Информация о лекарстве ' + data[0].title">

             <q-list bordered separator dense class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-blue-9">Название лекарства : <span class="text-subtitle1 text-black">&nbsp;{{data[0].title}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Код: <span class="text-subtitle1 text-black">&nbsp;{{data[0].code}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Описание: <span class="text-subtitle1 text-black">&nbsp;{{data[0].description}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Штрих-код: <span class="text-subtitle1 text-black">&nbsp;{{data[0].barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Страна: <span class="text-subtitle1 text-black">&nbsp;{{data[0].country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Производитель: <span class="text-subtitle1 text-black">&nbsp;{{data[0].manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Серийный номер: <span class="text-subtitle1 text-black">&nbsp;{{data[0].serial_code}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{data[0].vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Количество: <span class="text-subtitle1 text-black">&nbsp;{{data[0].quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Вместимость: <span class="text-subtitle1 text-black">&nbsp;{{data[0].capacity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Статус: <span class="text-subtitle1 text-black">&nbsp;{{data[0].status}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Цена покупки: <span class="text-subtitle1 text-black">&nbsp;{{data[0].purchase_price}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Цена продажи: <span class="text-subtitle1 text-black">&nbsp;{{data[0].selling_price}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Годен до: <span class="text-subtitle1 text-black">{{data[0].expire_date}}</span></q-item-label>
                 </q-item-section>
               </q-item>
                
             </q-list>
            </q-expansion-item>
        </div>
        {{data}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props: {
        id: {
            type: Number,
            required: true
        },
    },
    data(){
      return {
        data: [
            
        ],
      }
    },
    watch:{
  
    },
    async mounted(){
      await this.GET_ARRIVAL_ALL_INFO({arrival_id: Number(await this.id)});
      this.data = await this.getArrivalAllInfo;
    },
    computed:{
      ...mapGetters([
        'getArrivalAllInfo',
      ])
    },
    methods: {
      ...mapActions([
          'GET_ARRIVAL_ALL_INFO'
      ]),
     
    }
}
</script>

<style scoped>

</style>